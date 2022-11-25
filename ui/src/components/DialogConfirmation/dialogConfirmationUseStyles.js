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
    fontWeight: 600,
    letterSpacing: '1%'
  },
}))

export default useStyles