// MUI STYLES
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
  flyoutListItemIcon: {
    minWidth: 'unset',
    marginRight: 16,
  },
  flyoutListItemActionButton: {
    height: 32,
    fontSize: 12,
    fontWeight: 400,
  },
  flyoutListItemActionLink: {
    cursor: 'pointer',
    fontSize: 12,
    fontWeight: 500,
  },
  flyoutListItemRejectButton: {
    backgroundColor: theme.palette.primary.outlinedHoverBackground,
    color: theme.palette.primary.main,
    fontWeight: 500
  },
  flyoutListItemApproveButton: {
    marginLeft: '10px',
    backgroundColor: theme.palette.success.background,
    color: theme.palette.success.main,
    fontWeight: 500
  },
  dialogAddOrEditIconClose: {
    marginRight: 16,
    cursor: 'pointer',
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
  dialogAddOrEditFormControlIcon: {
    marginRight: 12,
    marginBottom: 2,
    color: theme.palette.text.secondary,
  },
  avatar: {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
    fontSize: 12,
    width: 24,
    height: 24
  },
}))

export default useStyles