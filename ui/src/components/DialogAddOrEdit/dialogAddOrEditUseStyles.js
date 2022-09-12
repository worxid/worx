// MUIS
import { alpha } from '@mui/material/styles'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: alpha(theme.palette.common.black, 0.4),
    zIndex: theme.zIndex.modal + 1,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    position: 'absolute',
  },
  contentContainer: {
    width: 500,
    height: '100%',
    backgroundColor: theme.palette.common.white,
  },
}))

export default useStyles