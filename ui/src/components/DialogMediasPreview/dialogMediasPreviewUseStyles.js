// MUI STYLES
import { alpha } from '@mui/material/styles'
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
    maxHeight: '100%',
    maxWidth: '100%',
    position: 'relative',
    overflowY: 'auto',
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
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 2,
    backgroundColor: alpha(theme.palette.common.white, 0.7),
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    borderRadius: 'inherit',
  },
  loading: {
    width: '48px !important',
    height: '48px !important',
  },
}))

export default useStyles