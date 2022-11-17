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
    width: 200,
    '& .MuiOutlinedInput-root': {
      height: 32,
      padding: '0px !important',
    },
    '& fieldset': {
      border: `2px solid ${theme.palette.divider}`,
    },
  },
  formControlAutocompleteListItemButton: {
    padding: 0,
    '& .MuiListItemIcon-root': {
      minWidth: 'unset',
    },
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