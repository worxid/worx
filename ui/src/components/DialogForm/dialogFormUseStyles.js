// MUI STYLES
import { alpha } from '@mui/material/styles'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
  dialogForm: {
    '& .MuiDialog-paper': {
      width: 400,
      height: '550px !important',
      border: `3px solid ${theme.palette.text.primary}`
    }
  },
  dialogFormTitle: {
    fontSize: 16
  },
  dialogFormActions: {
    borderTop: `3px solid ${theme.palette.text.primary}`,
    width: '100%',
    padding: 12
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 2,
    backgroundColor: alpha(theme.palette.common.white, 0.7),
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    borderRadius: 'inherit',
  },
  loading: {
    width: '48px !important',
    height: '48px !important',
  },
}))

export default useStyles