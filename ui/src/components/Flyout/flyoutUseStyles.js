// MUIS
import { alpha } from '@mui/material/styles'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: alpha(theme.palette.common.black, 0.4),
    zIndex: theme.zIndex.modal - 1,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    position: 'fixed',
  },
  contentContainer: {
    height: '100%',
    position: 'absolute',
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
  },
  childrenContainer: {
    padding: 24,
    overflowY: 'auto',
    backgroundColor: theme.palette.common.white,
  },
}))

export default useStyles