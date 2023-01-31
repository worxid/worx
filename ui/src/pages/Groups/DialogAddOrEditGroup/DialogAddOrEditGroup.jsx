import { useState, useContext, useEffect } from 'react'

// COMPONENTS
import Flyout from 'components/Flyout/Flyout'
import FlyoutContent from 'components/Flyout/FlyoutContent'
import FlyoutDeletableItem from 'components/FlyoutActionableItem/FlyoutActionableItem'
import FlyoutEditableTitle from 'components/FlyoutEditableTitle/FlyoutEditableTitle'
import FlyoutHeader from 'components/Flyout/FlyoutHeader'
import FlyoutInformationItem from 'components/FlyoutInformationItem/FlyoutInformationItem'
import MenuAssignItemsToGroup from '../MenuAssignItemsToGroup/MenuAssignItemsToGroup'

// CONSTANTS
import { values } from 'constants/values'

// CONTEXTS
import { AllPagesContext } from 'contexts/AllPagesContext'
import { PrivateLayoutContext } from 'contexts/PrivateLayoutContext'

// HOOKS
import useAxiosPrivate from 'hooks/useAxiosPrivate'

// MUIS
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import Stack from '@mui/material/Stack'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import Typography from '@mui/material/Typography'

// MUI ICONS
import IconCalendarToday from '@mui/icons-material/CalendarToday'
import IconDelete from '@mui/icons-material/Delete'
import IconPhoneAndroid from '@mui/icons-material/PhoneAndroid'
import IconTextSnippet from '@mui/icons-material/TextSnippet'

// SERVICES
import { postGetDeviceList } from 'services/worx/devices'
import { postGetListFormTemplate } from 'services/worx/formTemplate'
import { 
  getGroupById,
  postCreateGroup, 
  putEditGroup,
} from 'services/worx/group'

// STYLES
import useLayoutStyles from 'styles/layoutPrivate'
import useStyles from './dialogAddOrEditGroupUseStyles'

// UTILITIES
import { getDefaultErrorMessage } from 'utilities/object'
import { 
  didSuccessfullyCallTheApi, 
  wasAccessTokenExpired,
  wasRequestCanceled,
} from 'utilities/validation'
import { convertDate } from 'utilities/date'

const DialogAddOrEditGroup = (props) => {
  const { 
    dialogType, 
    dataDialogEdit, setDataDialogEdit, 
    setMustReloadDataGrid,
    setDialogDeleteObject,
  } = props

  const classes = useStyles()
  const layoutClasses = useLayoutStyles()

  const { setIsFlyoutOpen } = useContext(PrivateLayoutContext)

  const { setSnackbarObject } = useContext(AllPagesContext)

  const axiosPrivate = useAxiosPrivate()

  const initialFormObject = {
    groupName: '',
    groupColor: '#000000',
  }

  const initialTabList = [ 'devices', 'forms' ]

  const [ groupName, setGroupName ] = useState(initialFormObject.groupName)
  const [ groupColor, setGroupColor ] = useState(initialFormObject.groupColor)
  const [ deviceList, setDeviceList ] = useState([])
  const [ formList, setFormList ] = useState([])
  const [ selectedDeviceList, setSelectedDeviceList ] = useState([])
  const [ selectedFormList, setSelectedFormList ] = useState([])
  const [ colorPickerAnchorElement, setColorPickerAnchorElement ] = useState(null)
  const [ isEditMode, setIsEditMode ] = useState(false)
  const [ shouldSaveGroup, setShouldSaveGroup ] = useState(false)
  const [ tabList, setTabList ] = useState(initialTabList)
  const [ selectedTab, setSelectedTab ] = useState(initialTabList[0])
  const [ menuAssignItemsAnchorElement, setMenuAssignItemsAnchorElement ] = useState(null)
  const [ createdDate, setCreatedDate ] = useState('')

  const onSelectColor = (color) => {
    setColorPickerAnchorElement(null)
    setGroupColor(color)
    setShouldSaveGroup(true)
  }

  const handleSaveGroup = async () => {
    const abortController = new AbortController()

    let resultAddOrEditGroup = {}
    
    // CREATE A NEW GROUP ITEM
    if (dialogType === 'add') {
      resultAddOrEditGroup = await postCreateGroup(
        abortController.signal,
        {
          name: groupName,
          color: groupColor,
        },
        axiosPrivate,
      )
    }
    // EDIT AN EXISTING GROUP ITEM
    else if (dialogType === 'edit') {
      resultAddOrEditGroup = await putEditGroup(
        abortController.signal,
        dataDialogEdit.id,
        {
          name: groupName,
          color: groupColor,
          form_ids: selectedFormList.map(item => item.id),
          device_ids: selectedDeviceList.map(item => item.id),
        },
        axiosPrivate,
      )
    }

    abortController.abort()

    // ACTIONS AFTER SUCCESSFULLY CALLING THE API 
    if (didSuccessfullyCallTheApi(resultAddOrEditGroup.status)) {
      setMustReloadDataGrid(true)
      setIsEditMode(false)

      let message = ''
      if (dialogType === 'add') message = 'Successfully creating a new group'
      if (dialogType === 'edit') message = 'Successfully editing the group properties'

      setSnackbarObject({
        open: true,
        severity: 'success',
        title: '',
        message: message,
      })
    }
    else if (!wasRequestCanceled(resultAddOrEditGroup?.status) && !wasAccessTokenExpired(resultAddOrEditGroup.status)) {
      setSnackbarObject(getDefaultErrorMessage(resultAddOrEditGroup))
    }

    setShouldSaveGroup(false)
  }
  
  // CLOSE DIALOG ADD OR EDIT GROUP
  const handleClose = () => {
    setColorPickerAnchorElement(null)
    setGroupName(initialFormObject.groupName)
    setGroupColor(initialFormObject.groupColor)
    setDataDialogEdit(null)
    setIsFlyoutOpen(false)
  }

  const updateSelectedDevicesAndForms = async (abortController, isMounted) => {
    const response = await getGroupById(
      abortController.signal,
      axiosPrivate,
      dataDialogEdit.id,
    )

    if (didSuccessfullyCallTheApi(response?.status) && isMounted) {
      const selectedDeviceIdList = response.data.value.devices.map(item => item.id)
      const selectedFormIdList = response.data.value.forms.map(item => item.id)

      const newSelectedDeviceList = deviceList.filter(item => selectedDeviceIdList.includes(item.id))
      setSelectedDeviceList(newSelectedDeviceList)

      const newSelectedFormList = formList.filter(item => selectedFormIdList.includes(item.id))
      setSelectedFormList(newSelectedFormList)

      setCreatedDate(response.data.value.created_date)
    }
  }

  const fetchDeviceList = async (abortController, isMounted) => {
    const response = await postGetDeviceList(
      abortController.signal,
      {
        size: 10000,
        page: 0,
      },
      {},
      axiosPrivate,
    )

    if (didSuccessfullyCallTheApi(response?.status) && isMounted) {
      setDeviceList(response.data.content)
    }
    else if (!wasRequestCanceled(response?.status) && !wasAccessTokenExpired(response.status)) {
      setSnackbarObject(getDefaultErrorMessage(response))
    }
  }

  const fetchFormList = async (abortController, inputIsMounted) => {
    const response = await postGetListFormTemplate(
      abortController.signal,
      {
        size: 10000,
        page: 0,
      },
      {},
      axiosPrivate,
    )

    if(didSuccessfullyCallTheApi(response?.status) && inputIsMounted) {
      setFormList(response.data.content)
    }
    else if (!wasRequestCanceled(response?.status) && !wasAccessTokenExpired(response.status)) {
      setSnackbarObject(getDefaultErrorMessage(response))
    }
  }

  const getSelectedTabObject = (inputSelectedTab) => {
    if (inputSelectedTab === initialTabList[0]) {
      return {
        count: selectedDeviceList.length,
        list: selectedDeviceList,
        icon: IconPhoneAndroid,
        deleteType: 'device',
      }
    }
    else if (inputSelectedTab === initialTabList[1]) {
      return {
        count: selectedFormList.length,
        list: selectedFormList,
        icon: IconTextSnippet,
        deleteType: 'form',
      }
    }
  }

  const handleDeleteItem = (inputType, inputId) => {
    if (inputType === 'device') {
      const newSelectedDeviceList = selectedDeviceList.filter(item => item.id !== inputId)
      setSelectedDeviceList(newSelectedDeviceList)
    }
    else if (inputType === 'form') {
      const newSelectedFormList = selectedFormList.filter(item => item.id !== inputId)
      setSelectedFormList(newSelectedFormList)
    }

    setShouldSaveGroup(true)
  }

  useEffect(() => {
    let isMounted = true
    const abortController = new AbortController()

    fetchDeviceList(abortController, isMounted)
    fetchFormList(abortController, isMounted)

    return () => {
      isMounted = false
      abortController.abort()
    }
  }, [])

  useEffect(() => {
    let isMounted = true
    const abortController = new AbortController()

    // UPDATE THE DIALOG FORM IF THE DIALOG IS ON EDIT MODE
    if (dialogType === 'edit' && dataDialogEdit) {
      updateSelectedDevicesAndForms(abortController, isMounted)
      setGroupName(dataDialogEdit?.name ?? initialFormObject.groupName)
      setGroupColor(dataDialogEdit?.color ?? initialFormObject.groupColor)
    }

    return () => {
      isMounted = false
      abortController.abort()
    }
  }, [dataDialogEdit])

  useEffect(() => {
    shouldSaveGroup && handleSaveGroup()
  }, [shouldSaveGroup])

  return (
    <Flyout 
      position='right'
      onCloseButtonClick={handleClose}
    >
      {/* HEADER */}
      <FlyoutHeader>
        {/* EDITABLE TITLE */}
        <FlyoutEditableTitle
          dialogType={dialogType ? dialogType : 'add'}
          titlePlaceholder='Group Name'
          titleValue={groupName}
          setTitleValue={(event) => setGroupName(event.target.value)}
          onInputBlur={() => setShouldSaveGroup(true)}
          isEditMode={isEditMode}
          setIsEditMode={setIsEditMode}
        />

        <Stack 
          direction='row'
          alignItems='center'
          marginLeft='16px'
        >
          {/* COLOR PICKER */}
          <Stack
            className={classes.colorPicker}
            style={{ backgroundColor: groupColor }}
            onClick={(event) => setColorPickerAnchorElement(event.currentTarget)}
          />

          {/* DELETE ICON  */}
          {dialogType === 'edit' &&
          <IconButton 
            size='small'
            onClick={() => setDialogDeleteObject({ id: dataDialogEdit.id })}
          >
            <IconDelete color='primary'/>
          </IconButton>}
        </Stack>
      </FlyoutHeader>

      {/* CONTENT */}
      {dialogType === 'edit' &&
      <FlyoutContent>
        {/* CREATED DATE INFO */}
        <FlyoutInformationItem
          icon={IconCalendarToday} 
          title='Created Date'
          value={convertDate(createdDate)}
        />

        {/* TABS */}
        <Tabs 
          value={selectedTab} 
          onChange={(event, newValue) => setSelectedTab(newValue)} 
          className={classes.tabs}
        >
          {tabList.map((item, index) => (
            <Tab 
              key={index}
              label={item}
              value={item}
            />
          ))}
        </Tabs>

        {/* TAB CONTENT HEADER */}
        <Stack
          direction='row'
          alignItems='center'
          justifyContent='space-between'
          marginBottom='24px'
        >
          {/* ITEM COUNT */}
          <Stack>
            {/* TITLE */}
            <Typography 
              fontWeight={500}
              textTransform='capitalize'
            >
              {selectedTab}
            </Typography>

            {/* COUNT */}
            <Typography 
              variant='body2'
              color='text.secondary'
              textTransform='capitalize'
            >
              {getSelectedTabObject(selectedTab).count} {selectedTab}
            </Typography>
          </Stack>

          {/* ADD TO GROUP BUTTON */}
          <Button 
            variant='contained'
            className={layoutClasses.flyoutListItemActionButton}
            onClick={(event) => setMenuAssignItemsAnchorElement(event.currentTarget)}
          >
            Add to Group
          </Button>
        </Stack>

        {/* ITEM LIST */}
        <Stack spacing='8px'>
          {/* SELECTED LIST */}
          {getSelectedTabObject(selectedTab).list.map((item, index) => (
            <FlyoutDeletableItem
              key={index}
              icon={getSelectedTabObject(selectedTab).icon}
              primaryText={item.label}
              actionIcon={IconDelete}
              onActionButtonClick={() => handleDeleteItem(getSelectedTabObject(selectedTab).deleteType, item.id)}
            />
          ))}
        </Stack>
      </FlyoutContent>}

      {/* COLOR PICKER MENU */}
      <Menu
        open={Boolean(colorPickerAnchorElement)}
        anchorEl={colorPickerAnchorElement}
        onClose={() => setColorPickerAnchorElement(null)}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        className={classes.colorPickerMenu}
      >
        <Stack
          direction='row' 
          className={classes.colorWrap}>
          {values?.colorsCst?.map((item, index) => {
            return (
              <Stack
                key={index}
                className={classes.itemColor}
                onClick={() => onSelectColor(item)}
                sx={{ backgroundColor: item }}
              />
            )
          })}
        </Stack>
      </Menu>

      {/* ASSIGN ITEMS TO GROUP MENU */}
      <MenuAssignItemsToGroup
        anchorEl={menuAssignItemsAnchorElement}
        setAnchorEl={setMenuAssignItemsAnchorElement}
        selectedTab={selectedTab}
        deviceList={deviceList}
        selectedDeviceList={selectedDeviceList}
        setSelectedDeviceList={setSelectedDeviceList}
        formList={formList}
        selectedFormList={selectedFormList}
        setSelectedFormList={setSelectedFormList}
        setShouldSaveGroup={setShouldSaveGroup}
      />
    </Flyout>
  )
}

export default DialogAddOrEditGroup