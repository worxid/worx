// MUI STYLES
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
  iconStatusSize: {
    height: 12,
    width: 12
  },
  colorSuccessMain: {
    color: theme.palette.success.main,
  },
  colorWarningMain: {
    color: theme.palette.warning.main,
  },
}))

export default useStyles