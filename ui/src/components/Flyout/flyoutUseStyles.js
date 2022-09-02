// MUI STYLES
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    top: 0,
    right: 0,
    height: '100%',
    transition: 'all 0.25s ease-in-out',
    padding: 24,
    overflowY: 'auto',
    backgroundColor: theme.palette.common.white,
    boxShadow: theme.shadows[7],
  },
}))

export default useStyles