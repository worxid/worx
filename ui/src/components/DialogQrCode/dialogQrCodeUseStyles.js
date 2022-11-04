// MUI STYLES
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
  dialogQrCode: {
    '& .MuiPaper-root': {
      width: 432,
      height: 'auto !important',
    }
  },
  content: {
    padding: '20px 24px 24px 24px',
  },
  buttonRedPrimary: {
    boxShadow: 'none',
    fontWeight: 400,
    fontSize: 12,
    height: 36,
    minHeight: 36,
    maxWidth: 212,
    width: '100%',
    margin: '0 auto',
    '&:hover': {
      boxShadow: 'none'
    },
    '&.Mui-disabled': {
      backgroundColor: theme.palette.primary.main,
    }
  },
  imgQrCode: {
    width: '100%',
    maxWidth: 160,
    display: 'block',
    margin: '0 auto',
    paddingBottom: 16,
  },
  backdrop: {
    zIndex: theme.zIndex.tooltip
  }
}))

export default useStyles