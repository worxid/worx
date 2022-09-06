// MUI STYLES
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    width: 304,
  },
  header: {
    padding: '20px 24px'
  },
  headerDescription: {
    marginLeft: 8,
  },
  contentList: {
    padding: '0 24px 20px 24px',
  },
  listItem: {
    backgroundColor: '#FFFFFF',
    border: `2px solid ${theme.palette.action.selected}`,
    marginBottom: 12,
  },
  listItemButton: {
    padding: '14px 26px'
  },
  listItemIcon: {
    minWidth: 'auto',
    paddingRight: 16,
  },
  icon: {
    color: theme.palette.text.primary
  }
}))

export default useStyles