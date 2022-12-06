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
  actionLeft: {
    width: '40%',
    justifyContent: 'flex-end',
    '&.mobile': {
      justifyContent: 'center'
    }
  },
  actionCenter: {
    width: '20%',
  },
  actionRight: {
    alignItems: 'flex-start',
    width: '40%',
    '&.mobile': {
      alignItems: 'center'
    }
  },
  webcamWrapper: {
    overflow: 'hidden',
    backgroundColor: theme.palette.additional.drawer.background,
  },
  webcamDesktop: {
    height: '100%',
  },
  resultPhotoDesktop: {
    height: '100%'
  },
  resultPhotoMobile: {
    maxWidth: '100%',
    // result for tablet
    [theme.breakpoints.up('sm')]: {
      maxWidth: '75%',
    }
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
    '&.mobile': {
      width: 60,
      height: 60,
      backgroundColor: 'transparent',
      '&:hover': {
        backgroundColor: 'transparent',
      }
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
    '&.mobile': {
      marginLeft: 16
    }
  },
  buttonRetake: {
    color:theme.palette.common.white,
    '&.mobile': {
      marginRight: 'auto',
      marginLeft: 32,
    }
  },
  buttonUsePhoto: {
    color:theme.palette.common.white,
    '&.mobile': {
      marginLeft: 'auto',
      marginRight: 32,
    }
  },
  buttonSwitchCamera: {
    marginRight: 20,
    color:theme.palette.common.white,
    '&.mobile': {
      marginRight: 16
    }
  },
  iconCaptureMobile: {
    border: `4px solid ${theme.palette.common.white}`,
    borderRadius: '50%',
    height: '100%',
    maxHeigh: 72,
    width: 72,
    padding: 4,
    '& .iconCaptureMobile-inside': {
      height: '100%',
      width: '100%',
      backgroundColor: theme.palette.common.white,
      borderRadius: '50%'
    }
  }
}))

export default useStyles