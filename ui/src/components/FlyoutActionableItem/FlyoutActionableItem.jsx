import PropTypes from 'prop-types'

// MUIS
import IconButton from '@mui/material/IconButton'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'

// STYLES
import useStyles from './flyoutActionableItemUseStyles'

const FlyoutActionableItem = (props) => {
  const {
    icon,
    primaryText,
    secondaryText,
    actionIcon,
    actionIconHref,
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
          href={actionIconHref}
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

FlyoutActionableItem.defaultProps = {
  primaryText: '',
  secondaryText: '',
  actionIconHref: '',
}

FlyoutActionableItem.propTypes = {
  icon: PropTypes.object.isRequired,
  primaryText: PropTypes.string.isRequired,
  secondaryText: PropTypes.string.isRequired,
  actionIcon: PropTypes.object.isRequired,
  actionIconHref: PropTypes.string.isRequired,
  onActionButtonClick: PropTypes.func,
}

export default FlyoutActionableItem