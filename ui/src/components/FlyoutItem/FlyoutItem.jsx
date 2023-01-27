import PropTypes from 'prop-types'

// MUIS
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

// STYLES
import useStyles from './flyoutItemUseStyles'

const FlyoutItem = (props) => {
  const { 
    icon, 
    title,
    value,
    className,
  } = props

  const classes = useStyles()
  
  const SelectedIcon = icon

  return (
    <Stack className={className}>
      {/* HEADER */}
      <Stack
        direction='row'
        alignItems='center'
        spacing='8px'
      >
        {/* ICON */}
        <SelectedIcon className={classes.flyoutItemIcon}/>

        {/* TITLE */}
        <Typography
          variant='caption'
          color='text.secondary'
        >
          {title}
        </Typography>
      </Stack>
      {/* VALUE */}
      <Typography
        variant='body2'
      >
        {value}
      </Typography>
    </Stack>
  )
}

FlyoutItem.defaultProps = {
  title: '',
  value: '',
  className: '',
}

FlyoutItem.propTypes = {
  icon: PropTypes.object.isRequired, 
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
}

export default FlyoutItem