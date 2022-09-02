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
  iconCopyWrap: {
    borderRight: `1px solid ${theme.palette.action.hover}`,
    color: theme.palette.text.secondary,
    height: 36,
    width: 36,
  },
  fieldUrl: {
    flex: 1,
    maxWidth: 198,
    padding: '0 16px 0 8px',
  },
  buttonCopy: {
    backgroundColor: theme.palette.primary.outlinedHoverBackground,
    border: 'none',
    boxShadow: 'none',
    fontSize: 12,
    fontWeight: 400,
    height: 36,
    padding: '0',
    '&:hover': {
      boxShadow: 'none',
    }
  },
  iconCopy: {
    width: 16
  },
  tableFormsSubmissions: {
    '& .cell-source-custom': {
      paddingLeft: 24
    }
  }
}))

export default useStyles