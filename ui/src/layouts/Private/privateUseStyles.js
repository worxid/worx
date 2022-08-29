// MUI STYLES
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '100vh',
    overflow: 'hidden',
  },
  contentContainer: {
    flex: 1,
    height: '100%',
    padding: 24,
    overflowY: 'auto',
    position: 'relative',
  },
}))

export default useStyles