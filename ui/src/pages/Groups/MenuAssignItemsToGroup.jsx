import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

// CUSTOM COMPONENTS
import CustomDialogActionButton from 'components/Customs/CustomDialogActionButton'

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

// STYLES
import useLayoutStyles from 'styles/layoutPrivate'

const tabList = [ 'devices', 'forms' ]

const MenuAssignItemsToGroup = (props) => {
  const {
    anchorEl, setAnchorEl,
    selectedTab,
    deviceList,
    selectedDeviceList, setSelectedDeviceList,
    formList,
    selectedFormList,
    setSelectedFormList,
    setShouldSaveGroup,
  } = props

  const layoutClasses = useLayoutStyles()

  const [ search, setSearch ] = useState('')
  const [ tempSelectedDeviceList, setTempSelectedDeviceList ] = useState([])
  const [ tempSelectedFormList, setTempSelectedFormList ] = useState([])

  const getSelectedObject = (inputSelectedTab) => {
    if (inputSelectedTab === tabList[0]) return {
      list: deviceList,
      tempList: tempSelectedDeviceList,
    }
    else if (inputSelectedTab === tabList[1]) return {
      list: formList,
      tempList: tempSelectedFormList,
    }
  }

  const handleListItemClick = (inputSelectedTab,  inputItem) => {
    let selectedTempList, setSelectedTempList

    if (inputSelectedTab === tabList[0]) {
      selectedTempList = [...tempSelectedDeviceList]
      setSelectedTempList = setTempSelectedDeviceList
    }
    else if (inputSelectedTab === tabList[1]) {
      selectedTempList = [...tempSelectedFormList]
      setSelectedTempList = setTempSelectedFormList
    }

    const hasChecked = [...selectedTempList].find(item => item.label === inputItem.label)

    if (!Boolean(hasChecked)) setSelectedTempList([ ...selectedTempList, inputItem ])
    else {
      const newSelectedList = [...selectedTempList].filter(item => item.label !== inputItem.label)
      setSelectedTempList(newSelectedList)
    }
  }

  const handleCloseMenu = () => {
    setAnchorEl(null)
    setTempSelectedDeviceList([...selectedDeviceList])
    setTempSelectedFormList([...selectedFormList])
  }

  const handleSaveButtonClick = () => {
    setAnchorEl(null)
    setSelectedDeviceList([...tempSelectedDeviceList])
    setSelectedFormList([...tempSelectedFormList])
    setShouldSaveGroup(true)
  }

  useEffect(() => {
    selectedDeviceList.length > 0 && setTempSelectedDeviceList([...selectedDeviceList])
    selectedFormList.length > 0 && setTempSelectedFormList([...selectedFormList])
  }, [selectedDeviceList])

  return (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleCloseMenu}
      className={layoutClasses.menuChangeRoot}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
    >
      {/* SEARCH INPUT */}
      <Stack 
        direction='row' 
        className={layoutClasses.menuChangeSearchBox}
      >
        {/* INPUT */}
        <Input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
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
        className={`width100 padding0 ${layoutClasses.menuChangeList}`}
      >
        {getSelectedObject(selectedTab).list
          .filter((item) => item?.label?.toLowerCase().includes(search?.toLowerCase()))
          .map((item, index) => (
            <ListItemButton
              key={index}
              className='borderBottomDivider'
              dense
              onClick={(event) => handleListItemClick(selectedTab, item)}
            >
              {/* RADIO */}
              <ListItemIcon>
                <Checkbox checked={Boolean(getSelectedObject(selectedTab).tempList?.find(selectedItem => selectedItem.label === item.label))}/>
              </ListItemIcon>

              {/* TEXT */}
              <ListItemText primary={item.label ? item.label : '[No label]'}/>
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

MenuAssignItemsToGroup.defaultProps = {
  selectedTab: tabList[0],
  deviceList: [],
  selectedDeviceList: [],
  formList: [],
  selectedFormList: [],
}

MenuAssignItemsToGroup.propTypes = {
  anchorEl: PropTypes.object, 
  setAnchorEl: PropTypes.func.isRequired,
  selectedTab: PropTypes.oneOf(tabList).isRequired,
  deviceList: PropTypes.array.isRequired,
  selectedDeviceList: PropTypes.array.isRequired,
  setSelectedDeviceList: PropTypes.func.isRequired,
  formList: PropTypes.array.isRequired,
  selectedFormList: PropTypes.array.isRequired,
  setSelectedFormList: PropTypes.func.isRequired,
  setShouldSaveGroup: PropTypes.func.isRequired,
}

export default MenuAssignItemsToGroup