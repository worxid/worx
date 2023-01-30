import PropTypes from 'prop-types'

// MUIS
import IconButton from '@mui/material/IconButton'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'

// STYLES
import useStyles from './flyoutDeletableItemUseStyles'

const FlyoutDeletableItem = (props) => {
  const {
    icon,
    primaryText,
    secondaryText,
    actionIcon,
    onActionButtonClick,
  } = props

  const classes = useStyles()

  const SelectedIcon = icon
  const SelectedActionIcon = actionIcon

  return (
    <ListItem 
      className={classes.root}
      sx={{ height: secondaryText ? 'unset' : 56 }}
      secondaryAction={
        <IconButton 
          edge='end'
          onClick={onActionButtonClick}
        >
          <SelectedActionIcon color='primary'/>
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
  actionIcon: PropTypes.object.isRequired,
  onActionButtonClick: PropTypes.func.isRequired,
}

export default FlyoutDeletableItem