// MUIS
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    flex: 1,
    marginBottom: 8,
    '& .MuiInputLabel-root': {
      fontSize: 14,
      fontWeight: 500,
    },
    '& .MuiInputBase-input': {
      fontSize: 14,
      fontWeight: 500,
    },
  },
}))

export default useStyles