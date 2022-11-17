// MUI STYLES
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
  formControlInput: {
    height: 32,
    paddingLeft: 8,
    '& fieldset': {
      border: `2px solid ${theme.palette.divider}`,
    },
  },
  formControlAutocomplete: {
    '& .MuiOutlinedInput-root': {
      height: 32,
    },
    '& fieldset': {
      border: `2px solid ${theme.palette.divider}`,
    },
  },
}))

export default useStyles