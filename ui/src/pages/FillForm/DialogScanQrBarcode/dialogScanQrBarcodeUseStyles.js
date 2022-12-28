// MUI STYLES
import { alpha } from '@mui/material/styles'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
  dialogCamera: {
    '& .MuiDialog-paper': {
      maxWidth: '100%',
      width: '100%',
      height: '100vh !important',
      margin: 0,
      maxHeight: '100%',
    }
  },
  scanCamWrapper: {
    overflow: 'hidden',
    backgroundColor: theme.palette.additional.drawer.background,
  },
  actionWrapper: {
    backgroundColor: theme.palette.additional.drawer.background,
    padding: 16,
    height: 104,
    flex: '0 0 auto',
    '&.mobile': {
      backgroundColor: alpha(theme.palette.common.black, 0.4),
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      padding: '16px 8px',
    }
  },
  buttonCancel: {
    color:theme.palette.common.white,
    fontWeight: 400,
    border: 'none',
    boxShadow: 'none',
    width: 'fit-content',
    '&:hover': {
      boxShadow: 'none',
      background: 'none',
    },
  },
  scanCam: {
    width: '100%',
    height: '100%',
    '& video': {
      objectFit: 'cover',
      height: '100%'
    }
  },
  loadingWrapper: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },
  buttonSwitchCamera: {
    marginRight: 20,
    color:theme.palette.common.white,
    '&.mobile': {
      marginRight: 16
    }
  },
}))

export default useStyles