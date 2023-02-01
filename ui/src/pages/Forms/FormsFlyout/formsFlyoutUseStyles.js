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
  actionViewAll: {
    fontSize: 12,
    boxShadow: 'none',
    border: 'none',
    '&:hover': {
      boxShadow: 'none'
    }
  },
  submissionItem: {
    padding: 12,
    border: `1px solid ${theme.palette.action.disabled}`,
    borderRadius: 4,
    marginBottom: 8,
    '&:last-child': {
      marginBottom: 0,
    }
  },
  flyoutListItemAvatar: {
    borderRadius: 4,
    backgroundColor: alpha(theme.palette.common.black, 0.08),
    '& svg': {
      color: theme.palette.text.secondary
    },
  },
  iconActionItem: {
    color: alpha(theme.palette.common.black, 0.28)
  },
  actionMenuItem: {
    '& .MuiListItemIcon-root': {
      minWidth: 28,
    },
    '& .MuiSvgIcon-root.primary': {
      color: theme.palette.primary.light
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