// MUI STYLES
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
  header: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    padding: '20px 24px',
  },
  headerLeft: {
    flex: 1,
  },
  headerRight: {
    border: `1px solid ${theme.palette.action.hover}`,
    height: 36
  },
  headerTitle: {
    fontWeight: 500,
  },
  tableFormsSubmissions: {
    '& .cell-source-custom': {
      paddingLeft: 24,
      textTransform: 'capitalize',
    }
  },
  buttonRedPrimary: {
    boxShadow: 'none',
    fontWeight: 400,
    fontSize: 12,
    '&:hover': {
      boxShadow: 'none'
    }
  },
  downloadMenu: {
    '& .MuiList-root': {
      padding: 0,
      width: 92,
    },
  }
}))

export default useStyles