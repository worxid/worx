import PropTypes from 'prop-types'

// MUIS
import IconButton from '@mui/material/IconButton'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'

// MUI ICONS
import IconDelete from '@mui/icons-material/Delete'

// STYLES
import useStyles from './flyoutDeletableItemUseStyles'

const FlyoutDeletableItem = (props) => {
  const {
    icon,
    primaryText,
    secondaryText,
    onDeleteButtonClick,
  } = props

  const classes = useStyles()

  const SelectedIcon = icon

  return (
    <ListItem 
      className={classes.root}
      secondaryAction={
        <IconButton 
          edge='end'
          onClick={onDeleteButtonClick}
        >
          <IconDelete color='primary'/>
        </IconButton>
      }
    >
      {/* ICON */}
      <ListItemIcon className={classes.iconContainer}>
        <SelectedIcon 
          className={classes.icon} 
          fontSize='small'
        />
      </ListItemIcon>

      {/* TEXT */}
      <ListItemText 
        primary={primaryText}
        secondary={secondaryText}
      />
    </ListItem>
  )
}

FlyoutDeletableItem.defaultProps = {
  primaryText: '',
  secondaryText: '',
}

FlyoutDeletableItem.propTypes = {
  icon: PropTypes.object.isRequired,
  primaryText: PropTypes.string.isRequired,
  secondaryText: PropTypes.string.isRequired,
  onDeleteButtonClick: PropTypes.func.isRequired,
}

export default FlyoutDeletableItem