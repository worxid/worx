// MUI STYLES
import { alpha } from '@mui/material/styles'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
  dialogCamera: {
    '& .MuiDialog-paper': {
      maxWidth: 1104,
      width: '100%',
      borderRadius: 10,
      height: 704,
    }
  },
  actionWrapper: {
    backgroundColor: theme.palette.additional.drawer.background,
    padding: 16,
    height: 104,
    flex: '0 0 auto',
  },
  actionLeft: {
    width: '40%'
  },
  actionCenter: {
    width: '20%',
  },
  actionRight: {
    width: '40%',
  },
  webcamWrapper: {
    height: 438,
    overflow: 'hidden',
    backgroundColor: theme.palette.additional.drawer.background,
  },
  webcam: {
    height: '100%',
  },
  resultPhoto: {
    height: 'fit-content',
    maxWidth: '100%',
    width: 'fit-content',
  },
  buttonTakePhoto: {
    backgroundColor: theme.palette.error.main,
    width: 72,
    height: 72,
    '& .MuiSvgIcon-root': {
      color: theme.palette.common.white,
    },
    '&:hover': {
      backgroundColor: alpha(theme.palette.error.main, 0.84)
    },
    [theme.breakpoints.down('sm')]: {
      width: 60,
      height: 60,
    }
  },
  buttonCancel: {
    marginLeft: 20,
    color:theme.palette.common.white,
    fontWeight: 400,
    border: 'none',
    boxShadow: 'none',
    width: 'fit-content',
    '&:hover': {
      boxShadow: 'none',
      background: 'none',
    },
    [theme.breakpoints.down('sm')]: {
      marginLeft: 16
    }
  },
  buttonRetake: {
    color:theme.palette.common.white,
  },
  buttonUsePhoto: {
    color:theme.palette.common.white,
  },
  buttonSwitchCamera: {
    marginRight: 20,
    color:theme.palette.common.white,
    [theme.breakpoints.down('sm')]: {
      marginRight: 16
    }
  }
}))

export default useStyles