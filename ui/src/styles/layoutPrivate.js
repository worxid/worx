// MUI STYLES
import { alpha } from '@mui/material/styles'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
  dialogDateRangePicker: {
    '& .MuiPaper-root': {
      maxWidth: 'unset',
    },
  },
  dialogDateRangePickerHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  flyoutListItemIcon: {
    minWidth: 'unset',
    marginRight: 16,
  },
  flyoutListItemActionButton: {
    height: 32,
    fontSize: 12,
    fontWeight: 400,
    minWidth: 'fit-content',
  },
  flyoutListItemActionLink: {
    cursor: 'pointer',
    fontSize: 12,
    fontWeight: 500,
  },
  flyoutListItemRejectButton: {
    backgroundColor: theme.palette.primary.outlinedHoverBackground,
    color: theme.palette.primary.main,
    fontWeight: 600,
    '&:hover': {
      backgroundColor: alpha(theme.palette.primary.main, 0.2),
    }
  },
  flyoutListItemApproveButton: {
    backgroundColor: theme.palette.success.background,
    color: theme.palette.success.main,
    fontWeight: 600,
    '&:hover': {
      backgroundColor: alpha(theme.palette.success.main, 0.2),
    }
  },
  dialogButton: {
    fontWeight: 400,
    border: 'none',
    boxShadow: 'none',
  },
  greyButton: {
    color: theme.palette.text.secondary,
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
      boxShadow: 'none',
    },
  },
  redButton: {
    color: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: theme.palette.primary.outlinedHoverBackground,
      boxShadow: 'none',
    },
  },
  dialogAddOrEditFormControlContainer: {
    display: 'flex',
    alignItems: 'flex-end',
    height: 65,
    width: '100%',
    flex: '0 0 65px',
  },
  avatar: {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
    fontSize: 12,
    width: 24,
    height: 24
  },
  menuChangeRoot: {
    '& .MuiList-root': {
      width: 452,
      padding: 0,
    },
  },
  menuChangeSearchBox: {
    height: 52,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 24px',
    borderTop: `1px solid ${theme.palette.divider}`,
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  menuChangeList: {
    maxHeight: 400,
    overflow: 'auto',
  },
  menuChangeActions: {
    borderTop: `1px solid ${theme.palette.action.active}`,
    padding: 12,
  },
}))

export default useStyles