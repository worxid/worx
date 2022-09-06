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
  flyoutRowActionButtons: {
    flexDirection: 'row',
  },
  flyoutListItemRejectButton: {
    background: 'rgba(218, 54, 48, 0.1)',
    color: '#DA3630',
    fontWeight: 500
  },
  flyoutListItemApproveButton: {
    marginLeft: '10px',
    background: 'rgba(76, 175, 80, 0.1)',
    color: '#4CAF50',
    fontWeight: 500
  },
}))

export default useStyles