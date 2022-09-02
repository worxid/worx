import PropTypes from 'prop-types'

// MUIS
import Stack from '@mui/material/Stack'

// STYLES
import useStyles from './flyoutUseStyles'

const Flyout = (props) => {
  const { 
    className,
    children,
    isFlyoutShown,
    flyoutWidth,
  } = props

  const classes = useStyles()

  return (
    // NOTE: HAS TRIED TO USE SLIDE COMPONENT BUT STILL FAILED
    <Stack 
      className={`${classes.root} ${className}`}
      sx={{ 
        width: `${flyoutWidth}px`, 
        transform: isFlyoutShown ? 'none' : `translateX(${flyoutWidth + 24}px)`, 
      }}
    >
      {children}
    </Stack>
  )
}

Flyout.defaultProps = {
  className: '',
  isFlyoutShown: false,
  flyoutWidth: 400,
}

Flyout.propTypes = {
  className: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  isFlyoutShown: PropTypes.bool.isRequired,
  flyoutWidth: PropTypes.number.isRequired,
}

export default Flyout