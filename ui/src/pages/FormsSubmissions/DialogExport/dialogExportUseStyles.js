// MUI STYLES
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
  dialogExport: {
    '& .MuiPaper-root': {
      width: 504,
      height: 'auto !important',
    }
  },
  content: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 24,
    [theme.breakpoints.down('sm')]: {
      padding: 20,
    }
  },
  buttonRedPrimary: {
    boxShadow: 'none',
    fontWeight: 400,
    fontSize: 12,
    height: 36,
    minHeight: 36,
    width: 90,
    padding: '4px 4px',
    '&:hover': {
      boxShadow: 'none'
    },
    '&.Mui-disabled': {
      backgroundColor: theme.palette.text.disabled,
      color: theme.palette.background.paper
    }
  },
  formControl: {
    maxWidth: 328,
    '& .MuiFormControlLabel-label': {
      fontSize: 12,
      fontWeight: 400
    },
    '& .MuiInputLabel-root': {
      fontSize: 12,
      fontWeight: 400
    },
    '& .MuiRating-icon': {
      marginRight: 4,
    },
    '& .MuiInputBase-input': {
      fontSize: 12,
      fontWeight: 400
    }
  },
  dividerContent: {
    margin: '0 24px'
  },
  footer: {
    padding: 24,
    [theme.breakpoints.down('sm')]: {
      padding: 20,
    }
  },
  exportLoadingText: {
    fontSize: 14,
    fontWeight: 400,
    lineHeight: '23.24px',
    color: theme.palette.text.disabled,
  },
  loading: {
    width: '20px !important',
    height: '20px !important',
  },
}))

export default useStyles