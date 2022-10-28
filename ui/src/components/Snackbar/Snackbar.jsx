import PropTypes from 'prop-types'

// MUIS
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import MuiSnackbar from '@mui/material/Snackbar'
import Slide from '@mui/material/Slide'

// STYLES
import useStyles from './snackBarUseStyles'

const SlideTransition = (props) => (
  <Slide 
    {...props} 
    direction='left' 
  />
)

const Snackbar = (props) => {
  const {
    open,
    setToast,
    severity,
    title,
    message,
  } = props

  const classes = useStyles()

  const handleToastClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setToast(current => {
      return {
        ...current,
        open: false,
      }
    })
  }

  return (
    <MuiSnackbar 
      open={open} 
      autoHideDuration={6000} 
      onClose={handleToastClose}
      anchorOrigin={{ 
        vertical: 'top', 
        horizontal: 'right', 
      }}
      TransitionComponent={SlideTransition}
    >
      <Alert 
        elevation={6}
        variant='outlined'
        onClose={handleToastClose}
        severity={severity}
        className={classes.alertContainer}
      >
        {/* TITLE */}
        {title !== '' &&
        <AlertTitle>
          {title}
        </AlertTitle>}

        {/* MESSAGE */}
        {message !== '' && message}
      </Alert>
    </MuiSnackbar>
  )
}

Snackbar.defaultProps = {
  open: false,
  severity: 'success',
  title: '',
  message: '',
}

Snackbar.propTypes = {
  open: PropTypes.bool.isRequired,
  setToast: PropTypes.func.isRequired,
  severity: PropTypes.oneOf([ 'error', 'warning', 'info', 'success' ]).isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
}

export default Snackbar