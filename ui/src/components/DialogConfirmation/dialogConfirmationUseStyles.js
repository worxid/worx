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
  dialogActions: {
    padding: 0,
  },
  dialogButton: {
    fontWeight: 400,
    border: 'none',
    boxShadow: 'none',
    '&:hover': {
      backgroundColor: 'transparent',
      boxShadow: 'none',
    },
  },
  cancelButton: {
    color: theme.palette.text.secondary,
  },
  deleteButton: {
    color: theme.palette.primary.main,
  },
}))

export default useStyles