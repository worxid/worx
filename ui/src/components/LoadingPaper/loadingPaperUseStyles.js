// MUIS
import { alpha } from '@mui/material/styles'

// MUI STYLES
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
  contentRoot: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
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
