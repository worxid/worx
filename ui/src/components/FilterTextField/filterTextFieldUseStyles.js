// MUIS
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: 8,
    '& .MuiInputLabel-root': {
      fontSize: 12,
      fontWeight: 500,
    },
    '& .MuiInputBase-input': {
      fontSize: 12,
      fontWeight: 500,
    },
  },
}))

export default useStyles