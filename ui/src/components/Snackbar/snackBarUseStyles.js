// CONSTANT
import {colors} from 'constants/colors'

// MUI STYLES
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
  alertContainer: {
    backgroundColor: colors.background.paper,
    borderRadius: 4,
    borderWidth: 1.5,
    color: theme.palette.text.primary
  }
}))

export default useStyles