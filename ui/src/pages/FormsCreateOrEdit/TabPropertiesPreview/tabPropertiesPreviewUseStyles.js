// MUI STYLES
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
  tabCustom: {
    backgroundColor: theme.palette.action.selected,
    '& .MuiButtonBase-root.MuiTab-root': {
      textTransform: 'none'
    },
    '& .MuiButtonBase-root.MuiTab-root.Mui-selected': {
      color: theme.palette.text.primary,
      backgroundColor: theme.palette.common.white
    }
  },
  contentsProperties: {
    padding: '10px 24px',
  },
  formControl: {
    marginBottom: 16,
    '&.formControlGrouped': {
      marginBottom: 24,
    },
    '& .MuiOutlinedInput-notchedOutline': {
      border: `2px solid ${theme.palette.action.selected}`
    },
    '& .MuiFormControlLabel-label': {
      fontSize: 14,
    }
  },
  buttonOutlinedPrimary: {
    color: theme.palette.primary.main,
    border: `2px solid ${theme.palette.primary.main}`,
    boxShadow: 'none',
    width: 160,
    '&:hover': {
      border: `2px solid ${theme.palette.primary.main}`,
      boxShadow: 'none',
    }
  },
}))

export default useStyles