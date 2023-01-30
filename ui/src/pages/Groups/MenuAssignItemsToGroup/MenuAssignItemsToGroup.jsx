import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

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
    selectedDeviceList,
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

  useEffect(() => {
    selectedDeviceList.length > 0 && setTempSelectedDeviceList([...selectedDeviceList])
  }, [selectedDeviceList])

  return (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={() => setAnchorEl(null)}
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
}

export default MenuAssignItemsToGroup