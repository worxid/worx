// MUI STYLES
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '60px 32px',
    position: 'relative',
    textAlign: 'center',
  },
  iconSuccess: {
    width: 132,
    marginBottom: 16,
  },
  title: {
    marginBottom: 4,
    fontWeight: 500,
  },
  description: {
    marginBottom: 28,
  }
}))

export default useStyles