import { useState } from 'react'
import PropTypes from 'prop-types'

// MUIS
import Input from '@mui/material/Input'
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
  } = props

  const classes = useStyles()
  const layoutClasses = useLayoutStyles()

  const [ search, setSearch ] = useState('')

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
    </Menu>
  )
}

MenuAssignItemsToGroup.defaultProps = {
}

MenuAssignItemsToGroup.propTypes = {
  anchorEl: PropTypes.object, 
  setAnchorEl: PropTypes.func.isRequired,
}

export default MenuAssignItemsToGroup