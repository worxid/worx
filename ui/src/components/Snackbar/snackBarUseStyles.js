// MUI STYLES
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
  alertContainer: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: 4,
    borderWidth: 1.5,
    color: theme.palette.text.primary
  }
}))

export default useStyles