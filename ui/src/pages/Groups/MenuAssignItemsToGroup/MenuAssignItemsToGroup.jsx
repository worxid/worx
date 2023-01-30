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
import useStyles from './menuAssignItemsToGroupUseStyles'

const MenuAssignItemsToGroup = (props) => {
  const {
    anchorEl, setAnchorEl,
    deviceList,
    selectedDeviceList, setSelectedDeviceList,
    setShouldSaveGroup,
  } = props

  const classes = useStyles()
  const layoutClasses = useLayoutStyles()

  const [ search, setSearch ] = useState('')
  const [ tempSelectedDeviceList, setTempSelectedDeviceList ] = useState([])

  const handleListItemClick = (event, inputItem) => {
    const hasChecked = [...tempSelectedDeviceList].find(item => item.label === inputItem.label)

    if (!Boolean(hasChecked)) setTempSelectedDeviceList([ ...tempSelectedDeviceList, inputItem ])
    else {
      const newSelectedDeviceList = [...tempSelectedDeviceList].filter(item => item.label !== inputItem.label)
      setTempSelectedDeviceList(newSelectedDeviceList)
    }
  }

  const handleCloseMenu = () => {
    setAnchorEl(null)
    setTempSelectedDeviceList([...selectedDeviceList])
  }

  const handleSaveButtonClick = () => {
    setAnchorEl(null)
    setSelectedDeviceList([...tempSelectedDeviceList])
    setShouldSaveGroup(true)
  }

  useEffect(() => {
    selectedDeviceList.length > 0 && setTempSelectedDeviceList([...selectedDeviceList])
  }, [selectedDeviceList])

  return (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleCloseMenu}
      className={classes.root}
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
        className={layoutClasses.menuSearchBox}
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
        className={`width100 padding0 ${classes.list}`}
      >
        {deviceList
          .filter((item) => item?.label?.toLowerCase().includes(search?.toLowerCase()))
          .map((item, index) => (
            <ListItemButton
              key={index}
              className='borderBottomDivider'
              dense
              onClick={(event) => handleListItemClick(event, item)}
            >
              {/* RADIO */}
              <ListItemIcon>
                <Checkbox checked={Boolean(tempSelectedDeviceList?.find(selectedDevice => selectedDevice.label === item.label))}/>
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
        className={classes.actions}
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
  deviceList: [],
  selectedDeviceList: [],
}

MenuAssignItemsToGroup.propTypes = {
  anchorEl: PropTypes.object, 
  setAnchorEl: PropTypes.func.isRequired,
  deviceList: PropTypes.array.isRequired,
  selectedDeviceList: PropTypes.array.isRequired,
  setSelectedDeviceList: PropTypes.func.isRequired,
  setShouldSaveGroup: PropTypes.func.isRequired,
}

export default MenuAssignItemsToGroup