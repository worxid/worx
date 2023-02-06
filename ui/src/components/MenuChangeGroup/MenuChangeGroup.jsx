import { useState, useContext, useEffect } from 'react'
import PropTypes from 'prop-types'

// CONTEXTS
import { AllPagesContext } from 'contexts/AllPagesContext'

// CUSTOM COMPONENTS
import CustomDialogActionButton from 'components/Customs/CustomDialogActionButton'

// HOOKS
import useAxiosPrivate from 'hooks/useAxiosPrivate'

// MUIS
import Checkbox from '@mui/material/Checkbox'
import Input from '@mui/material/Input'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Menu from '@mui/material/Menu'
import Stack from '@mui/material/Stack'

// MUI ICONS
import IconClear from '@mui/icons-material/Clear'
import IconSearch from '@mui/icons-material/Search'

// SERVICES
import { getGroupList } from 'services/worx/group'
import { putAssignGroupDevices } from 'services/worx/devices'
import { putAssignGroupFormTemplate } from 'services/worx/formTemplate'

// STYLES
import useLayoutStyles from 'styles/layoutPrivate'

// UTILITIES
import { getDefaultErrorMessage } from 'utilities/object'
import { 
  didSuccessfullyCallTheApi, 
  wasAccessTokenExpired,
  wasRequestCanceled,
} from 'utilities/validation'

const MenuChangeGroup = (props) => {
  const { 
    className,
    selectedGroupList, 
    page, 
    selectedItemId, 
    reloadData, 
    anchorEl, setAnchorEl,
  } = props

  const layoutClasses = useLayoutStyles()

  // CONTEXTS
  const { setSnackbarObject } = useContext(AllPagesContext)

  const axiosPrivate = useAxiosPrivate()

  // STATES
  const [ search, setSearch ] = useState('')
  const [ groupList, setGroupList ] = useState([])
  const [ tempSelectedGroupList, setTempSelectedGroupList ] = useState([])

  const handleSaveButtonClick = async () => {
    const abortController = new AbortController()

    const listSelectedGroupId = tempSelectedGroupList.map(item => item.id)

    let response
    let message = {}
    
    if (page === 'forms') {
      response = await putAssignGroupFormTemplate(
        selectedItemId,
        abortController.signal,
        { assignedGroups: listSelectedGroupId },
        axiosPrivate,
      )
    } 
    else if (page === 'devices') {
      response = await putAssignGroupDevices(
        selectedItemId,
        abortController.signal,
        { group_ids: listSelectedGroupId },
        axiosPrivate,
      )
    }

    if (didSuccessfullyCallTheApi(response?.status)) {
      message = {
        severity: 'success',
        title: '',
        message: 'Change group success'
      }

      reloadData(abortController, true)
    } 
    else if (!wasRequestCanceled(response?.status) && !wasAccessTokenExpired(response.status)) {
      message = getDefaultErrorMessage(response)
    }

    setSnackbarObject({
      open: true,
      ...message,
    })

    handleCloseMenu()
    setTempSelectedGroupList([...tempSelectedGroupList])
  }

  const handleCloseMenu = () => {
    setSearch('')
    setAnchorEl(null)
    setTempSelectedGroupList([...selectedGroupList])
  }

  const handleSearch = (e) => {
    e.preventDefault()
    const valueSearch = e.target.value
    setSearch(valueSearch)
  }

  const handleCheckboxClick = (event, itemGroup) => {
    const hasChecked = tempSelectedGroupList.find(item => item.name === itemGroup.name)
    if(!Boolean(hasChecked)) {
      // CHECKED
      setTempSelectedGroupList([ ...tempSelectedGroupList, itemGroup ])
    } else {
      // UNCHECKED
      const temptempSelectedGroupList = tempSelectedGroupList.filter(item => item.name !== itemGroup.name)
      setTempSelectedGroupList(temptempSelectedGroupList)
    }
  }

  const loadGroupListData = async (inputIsMounted, inputAbortController) => {
    const resultGroupList = await getGroupList(
      inputAbortController.signal, 
      axiosPrivate,
    )

    if (didSuccessfullyCallTheApi(resultGroupList.status) && inputIsMounted) {
      setGroupList(resultGroupList.data.list)
    }
    else if (!wasRequestCanceled(resultGroupList?.status) && !wasAccessTokenExpired(resultGroupList.status)) {
      setSnackbarObject(getDefaultErrorMessage(resultGroupList))
    } 
  }

  // SIDE EFFECT FETCHING
  useEffect(() => {
    let isMounted = true
    const abortController = new AbortController()
    loadGroupListData(isMounted, abortController)

    return () => {
      isMounted = false
      abortController.abort()
    }
  }, [])

  // SIDE EFFECT SET GROUP CHECKED
  useEffect(() => {
    if(selectedGroupList?.length) {
      page === 'forms' && setTempSelectedGroupList(selectedGroupList)
      page === 'devices' && setTempSelectedGroupList(selectedGroupList.map(item => {
        const findItemGroup = groupList.find(itemGroup => itemGroup.name === item.name)
        return findItemGroup
      }))
    } else setTempSelectedGroupList([])
  }, [selectedGroupList, groupList])

  return (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleCloseMenu}
      className={`${layoutClasses.menuChangeRoot} ${className}`}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
    >
      {/* CONTENT */}
      <Stack 
        direction='row' 
        className={layoutClasses.menuChangeSearchBox}
      >
        {/* INPUT */}
        <Input
          value={search}
          onChange={handleSearch}
          className='width100'
          placeholder='Search'
          disableUnderline
        />

        {/* ICON */}
        {search === '' ? (
          <IconSearch className='cursorPointer' />
        ) : (
          <IconClear
            className='cursorPointer'
            onClick={() => setSearch('')}
          />
        )}
      </Stack>

      {/* LIST */}
      <List 
        disablePadding 
        className='width100 padding0'
      >
        <ListItemButton 
          className='borderBottomDivider' 
          dense
          sx={!'Default'.toLowerCase().includes(search.toLowerCase()) ? { display: 'none' } : {}}
        >
          {/* RADIO */}
          <ListItemIcon>
            <Checkbox checked={tempSelectedGroupList?.length <= 0}/>
          </ListItemIcon>

          {/* TEXT */}
          <ListItemText primary={'Default'}/>
        </ListItemButton>

        {groupList?.
          filter((item) => item.name.toLowerCase().includes(search.toLowerCase()))
          .map((item, index) => (
            <ListItemButton
              onClick={(event) => handleCheckboxClick(event, item)}
              key={index}
              className='borderBottomDivider'
              dense
            >
              {/* RADIO */}
              <ListItemIcon>
                <Checkbox
                  checked={Boolean(tempSelectedGroupList?.find(itemData => itemData.name === item.name))}
                />
              </ListItemIcon>
              {/* TEXT */}
              <ListItemText primary={item.name}/>
            </ListItemButton>
          ))}
      </List>

      {/* ACTIONS */}
      <Stack
        direction='row' 
        justifyContent='flex-end'
        className={layoutClasses.menuChangeActions}
      >
        <CustomDialogActionButton 
          className={`${layoutClasses.dialogButton} ${layoutClasses.greyButton} fontWeight600`}
          onClick={handleCloseMenu}
        >
          Cancel
        </CustomDialogActionButton>

        <CustomDialogActionButton
          className={`${layoutClasses.dialogButton} ${layoutClasses.redButton} fontWeight600`} 
          onClick={handleSaveButtonClick}
        >
          Save
        </CustomDialogActionButton>
      </Stack>
    </Menu>
  )
}

MenuChangeGroup.defaultProps = {
  className: '',
  selectedGroupList: [],
  page: 'forms',
}

MenuChangeGroup.propTypes = {
  selectedGroupList: PropTypes.array.isRequired,
  className: PropTypes.string.isRequired,
  page: PropTypes.oneOf(['forms', 'devices']).isRequired,
  selectedItemId: PropTypes.number,
  reloadData: PropTypes.func.isRequired,
}

export default MenuChangeGroup