// MUI STYLES
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
    padding: 24,
    marginBottom: 0,
  },
  toolbar: {
    height: 48,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  content: {
    backgroundColor: theme.palette.grey[900],
  },
  mediaPreview: {
    height: '100%',
    maxHeight: 'calc(100vh - 96px)',
    maxWidth: '100%',
    backgroundColor: theme.palette.common.white,
  },
}))

export default useStyles