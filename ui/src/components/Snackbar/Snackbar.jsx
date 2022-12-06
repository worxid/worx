import PropTypes from 'prop-types'

// MUIS
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import MuiSnackbar from '@mui/material/Snackbar'
import Slide from '@mui/material/Slide'
import Typography from '@mui/material/Typography'

// STYLES
import useStyles from './snackBarUseStyles'

// UTILITIES
import { capitalizeEachWord } from 'utilities/string'

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
      className={classes.root}
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
        <AlertTitle className={classes.title}>
          {capitalizeEachWord(title)}
        </AlertTitle>}

        {/* MESSAGE */}
        <Typography 
          variant='body2'
          className={classes.message}
        >
          {message}
        </Typography>
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