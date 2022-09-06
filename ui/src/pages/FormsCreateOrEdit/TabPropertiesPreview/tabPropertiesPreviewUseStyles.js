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
      backgroundColor: '#FFFFFF'
    }
  },
  headerProperties: {
    padding: '10px 24px'
  },
  contentsProperties: {
    padding: '10px 24px',
  },
  formControl: {
    '& .MuiOutlinedInput-notchedOutline': {
      border: `2px solid ${theme.palette.action.selected}`
    }
  }
}))

export default useStyles