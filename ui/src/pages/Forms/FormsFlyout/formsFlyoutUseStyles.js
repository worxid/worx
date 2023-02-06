// MUI STYLES
import { alpha } from '@mui/material/styles'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
  flyoutBoxInfo: {
    backgroundColor: alpha(theme.palette.common.black, 0.04),
    padding: 16,
    marginBottom: 16,
  },
  flyoutInfoItem: {
    flexDirection: 'column',
    alignItems: 'start',
    padding: 0,
    marginBottom: 16,
    '&:last-child': {
      marginBottom: 0,
    }
  },
  flyoutTitleInfo: {
    color: theme.palette.text.secondary,
  },
  flyoutIconInfo: {
    color: theme.palette.text.secondary,
    fontSize: 16,
    marginRight: 4,
  },
  flyoutDescInfo: {
    fontSize: 14,
    marginTop: 4,
  },
  flyoutGroupChip: {
    margin: '2px 4px 2px 0'
  },
  flyoutItemGroup: {
    marginBottom: 16,
  },
  menuChangeGroup: {
    marginLeft: 16,
  },
  actionViewAll: {
    fontSize: 12,
    boxShadow: 'none',
    border: 'none',
    '&:hover': {
      boxShadow: 'none'
    }
  },
  submissionList: {
    '& .MuiListItem-root': {
      marginBottom: 8,
      '&:last-child': {
        marginBottom: 0,
      }
    }
  },
  pagination: {
    marginTop: 12,
    '& .MuiPagination-ul': {
      justifyContent: 'center',
    },
    '& .MuiPaginationItem-root': {
      borderRadius: 0,
      padding: '0 2px',
      margin: 0,
      minWidth: 24,
    },
    '& .Mui-selected': {
      backgroundColor: 'transparent',
      borderBottom: `2px solid ${theme.palette.primary.main}`,
      borderRadius: 0,
      padding: '0 2px',
      margin: 0,
      minWidth: 24,
      '&:hover': {
        backgroundColor: 'transparent',
      },
    },
  },
}))

export default useStyles