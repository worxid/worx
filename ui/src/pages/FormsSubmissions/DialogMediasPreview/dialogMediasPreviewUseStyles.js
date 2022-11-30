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
    maxHeight: 'calc(100vh - (2 * 96px))',
    maxWidth: '100%',
  },
  mediaPreviewDocument: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    backgroundColor: theme.palette.common.white,
  },
  mediaPreviewImage: {
    height: '100%',
    maxWidth: '100%',
    backgroundColor: theme.palette.common.white,
  },
  actionButton: {
    border: 'none',
    boxShadow: 'none',
    '&:hover': {
      boxShadow: 'none',
    },
  },
}))

export default useStyles