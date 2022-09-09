// CONSTANTS
import { colors } from 'constants/colors'

// MUIS
import { alpha } from '@mui/material/styles'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
  title: {
    marginBottom: 16,
  },
  caption: {
    marginBottom: 30,
    color: theme.palette.text.secondary,
    letterSpacing: '1%'
  },
  dialogButton: {
    fontWeight: 400,
    border: 'none',
    boxShadow: 'none',
  },
  cancelButton: {
    color: theme.palette.text.secondary,
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
      boxShadow: 'none',
    },
  },
  deleteButton: {
    color: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: theme.palette.primary.outlinedHoverBackground,
      boxShadow: 'none',
    },
  },
}))

export default useStyles