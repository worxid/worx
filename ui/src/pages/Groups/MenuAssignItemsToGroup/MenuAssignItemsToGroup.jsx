import PropTypes from 'prop-types'

// MUIS
import Menu from '@mui/material/Menu'

// STYLES
import useStyles from './menuAssignItemsToGroupUseStyles'

const MenuAssignItemsToGroup = (props) => {
  const {
    anchorEl, setAnchorEl,
  } = props

  const classes = useStyles()

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
      a
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