// MUI STYLES
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
  formControlInput: {
    height: 32,
    width: 240,
    '& fieldset': {
      border: `1px solid ${theme.palette.divider}`,
    },
  },
  formControlInputWithStartIcon: {
    paddingLeft: 8,
  },
  formControlSelectMenuItem: {
    width: 240,
  },
  buttonReset: {
    marginLeft: 'auto !important',
    boxShadow: 'none',
    border: 'none',
    '&:hover': {
      boxShadow: 'none',
    },
  },
}))

export default useStyles