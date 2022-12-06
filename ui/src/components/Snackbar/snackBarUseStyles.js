// MUI STYLES
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 400,
  },
  alertContainer: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: 4,
    borderWidth: 1.5,
    color: theme.palette.text.primary
  },
  title: {
    display: '-webkit-box',
    overflow: 'hidden',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 2,
  },
  message: {
    display: '-webkit-box',
    overflow: 'hidden',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 5,
  },
}))

export default useStyles