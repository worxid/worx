// MUIS
import { makeStyles } from '@mui/styles'

const flyoutWidth = 700

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiDialog-paper': {
      position: 'fixed',
      right: 0,
      margin: 0,
      maxWidth: 'unset',
      height: '100vh',
      maxHeight: '100vh',
      overflowX: 'auto',
    },
  },
  contentContainer: {
    height: '100%',
    position: 'relative',
  },
  closeIconContainer: {
    width: 36,
    height: 36,
    backgroundColor: theme.palette.action.active,
    borderTopLeftRadius: '50%',
    borderBottomLeftRadius: '50%',
    cursor: 'pointer',
    color: theme.palette.common.white,
    marginTop: 24,
    position: 'fixed',
    zIndex: '10000 !important',
    right: flyoutWidth,
  },
  childrenContainer: {
    overflowY: 'auto',
    backgroundColor: theme.palette.common.white,
    width: flyoutWidth,
  },
}))

export default useStyles