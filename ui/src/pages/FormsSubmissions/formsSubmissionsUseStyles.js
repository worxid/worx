// MUI STYLES
import { alpha } from '@mui/material/styles'
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
  },
  columnLink: {
    cursor: 'pointer',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    display: 'flex',
    alignItems: 'center',
  },
  columnLinkIcon: {
    marginRight: 8,
  },
  columnChip: {
    fontSize: 12,
    '&.red': {
      backgroundColor: alpha(theme.palette.primary.main, 0.2),
      color: theme.palette.primary.main,
    }
  },
}))

export default useStyles