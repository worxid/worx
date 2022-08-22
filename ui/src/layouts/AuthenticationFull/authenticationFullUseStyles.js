// MUI STYLES
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    height: '100vh',
    position: 'relative',
    backgroundColor: theme.palette.primary.main,
  }
}))

export default useStyles