import { useState, useContext, useEffect } from 'react'

// COMPONENTS
import Flyout from 'components/Flyout/Flyout'

// CONSTANTS
import { values } from 'constants/values'

// CONTEXTS
import { AllPagesContext } from 'contexts/AllPagesContext'
import { PrivateLayoutContext } from 'contexts/PrivateLayoutContext'

// CUSTOM COMPONENTS
import FlyoutActions from 'components/Flyout/FlyoutActions'
import CustomDialogActionButton from 'components/Customs/CustomDialogActionButton'
import FlyoutContent from 'components/Flyout/FlyoutContent'
import FlyoutTitle from 'components/Flyout/FlyoutTitle'

// HOOKS
import useAxiosPrivate from 'hooks/useAxiosPrivate'

// MUIS
import Autocomplete from '@mui/material/Autocomplete'
import Box from '@mui/material/Box'
import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import IconButton from '@mui/material/IconButton'
import Input from '@mui/material/Input'
import InputAdornment from '@mui/material/InputAdornment'
import InputLabel from '@mui/material/InputLabel'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Popover from '@mui/material/Popover'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

// MUI ICONS
import IconDelete from '@mui/icons-material/Delete'
import IconFormatColorText from '@mui/icons-material/FormatColorText'

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

const DialogAddOrEditGroup = (props) => {
  const { 
    dialogType, 
    dataDialogEdit, setDataDialogEdit, 
    setMustReloadDataGrid,
    setDialogDeleteObject,
  } = props

  const layoutClasses = useLayoutStyles()
  const classes = useStyles()

  const { setIsFlyoutOpen } = useContext(PrivateLayoutContext)

  const { setSnackbarObject } = useContext(AllPagesContext)

  const axiosPrivate = useAxiosPrivate()

  const initialFormObject = {
    groupName: '',
    groupColor: '#000000',
  }

  const [ groupName, setGroupName ] = useState(initialFormObject.groupName)
  const [ groupColor, setGroupColor ] = useState(initialFormObject.groupColor)
  const [ deviceList, setDeviceList ] = useState([])
  const [ formList, setFormList ] = useState([])
  const [ selectedDeviceList, setSelectedDeviceList ] = useState([])
  const [ selectedFormList, setSelectedFormList ] = useState([])
  const [ anchorEl, setAnchorEl ] = useState(null)

  const getFlyoutTitle = (inputDialogType, inputLabel) => {
    if (inputDialogType === 'add') return 'Add a Group'
    else if (inputDialogType === 'edit') return inputLabel
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  
  const handleClosePopOver = () => {
    setAnchorEl(null)
  }

  const openPicker = Boolean(anchorEl)
  const id = openPicker ? 'simple-popover' : undefined

  const onSelectColor = (color) => {
    setGroupColor(color)
    setAnchorEl(null)
    handleClosePopOver()
  }

  const handleActionButtonClick = async (inputType) => {
    // SAVE BUTTON
    if (inputType === 'save') {
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
        handleClose()
        setMustReloadDataGrid(true)

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
    }
    // CANCEL BUTTON IS CLICKED
    else if (inputType === 'cancel') handleClose()
  }
  
  // CLOSE DIALOG ADD OR EDIT GROUP
  const handleClose = () => {
    setAnchorEl(null)
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

  return (
    <Flyout 
      position='right'
      onCloseButtonClick={handleClose}
    >
      {/* HEADER */}
      <FlyoutTitle>
        {/* TITLE */}
        <Typography 
          variant='h6' 
          className='fontWeight500'
          noWrap
        >
          {getFlyoutTitle(dialogType, dataDialogEdit ? dataDialogEdit.name : '-')}
        </Typography>

        <Stack 
          direction='row'
          alignItems='center'
        >
          {/* DELETE ICON  */}
          {dialogType === 'edit' &&
          <IconButton 
            size='small'
            onClick={() => setDialogDeleteObject({ id: dataDialogEdit.id })}
          >
            <IconDelete color='primary'/>
          </IconButton>}
        </Stack>
      </FlyoutTitle>

      {/* CONTENT */}
      <FlyoutContent>
        <Typography variant='subtitle1'>
          Main Information
        </Typography>

        {/* LABEL INPUT */}
        <Stack direction='row' className={layoutClasses.dialogAddOrEditFormControlContainer}>
          <IconFormatColorText className={layoutClasses.dialogAddOrEditFormControlIcon}/>
          <FormControl 
            variant='standard' 
            className='width100'
          >
            <InputLabel>
              Group Name
            </InputLabel>
            <Input
              placeholder='Group Name'
              type='text'
              value={groupName}
              onChange={(event) => setGroupName(event.target.value)}
              endAdornment={
                <InputAdornment position='end'>
                  <Stack
                    className={classes.pickerStyle}
                    style={{ backgroundColor: groupColor }}
                    onClick={handleClick}
                  />
                </InputAdornment>
              }
            />
          </FormControl>
        </Stack>

        {/* DEVICES AUTOCOMPLETE */}
        {dialogType === 'edit' &&
        <Autocomplete
          multiple
          limitTags={2}
          options={deviceList}
          getOptionLabel={(option) => option.label}
          className={classes.autocomplete}
          renderOption={(props, option, { selected }) => (
            <ListItemButton 
              {...props}
              className={classes.autocompleteListItem}
            >
              {/* CHECKBOX */}
              <ListItemIcon>
                <Checkbox checked={selected}/>
              </ListItemIcon>

              {/* TEXT */}
              <ListItemText primary={option.label}/>
            </ListItemButton>
          )}
          renderInput={(params) => (
            <TextField 
              {...params} 
              label='Device Names' 
              placeholder='Device Names' 
              variant='standard'
            />
          )}
          value={selectedDeviceList}
          onChange={(event, newValue) => setSelectedDeviceList(newValue)}
        />}

        {/* FORMS AUTOCOMPLETE */}
        {dialogType === 'edit' &&
        <Autocomplete
          multiple
          limitTags={2}
          options={formList}
          getOptionLabel={(option) => option.label}
          className={classes.autocomplete}
          renderOption={(props, option, { selected }) => (
            <ListItemButton 
              {...props}
              className={classes.autocompleteListItem}
            >
              {/* CHECKBOX */}
              <ListItemIcon>
                <Checkbox checked={selected}/>
              </ListItemIcon>

              {/* TEXT */}
              <ListItemText primary={option.label}/>
            </ListItemButton>
          )}
          renderInput={(params) => (
            <TextField 
              {...params} 
              label='Form Names' 
              placeholder='Form Names' 
              variant='standard'
            />
          )}
          value={selectedFormList}
          onChange={(event, newValue) => setSelectedFormList(newValue)}
        />}
      </FlyoutContent>

      {/* DIALOG ACTIONS */}
      <FlyoutActions>
        {/* CANCEL BUTTON */}
        <CustomDialogActionButton 
          className={`${layoutClasses.dialogButton} ${layoutClasses.greyButton}`}
          onClick={() => handleActionButtonClick('cancel')}
        >
          Cancel
        </CustomDialogActionButton>

        {/* SAVE BUTTON */}
        <CustomDialogActionButton
          className={`${layoutClasses.dialogButton} ${layoutClasses.redButton}`} 
          onClick={() => handleActionButtonClick('save')}
        >
          Save
        </CustomDialogActionButton>
      </FlyoutActions>

      <Popover
        id={id}
        open={openPicker}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        className={classes.popOverDialog}
      >
        <Box className={classes.colorWrap}>
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
        </Box>
      </Popover>
    </Flyout>
  )
}

export default DialogAddOrEditGroup