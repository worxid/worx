// MUI STYLES
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
  iconStatusSize: {
    height: 13,
    width: 13
  },
  colorSuccessMain: {
    color: theme.palette.success.main,
  },
  colorWarningMain: {
    color: theme.palette.warning.main,
  },
}))

export default useStyles