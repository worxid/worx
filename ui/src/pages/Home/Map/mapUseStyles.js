// MUI STYLES
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
  mapContainer: {
    position: 'relative',
    zIndex: 1,
    '&.leaflet-container': {
      width: '100%',
      height: '100%',
    },
  },
  marker: {
    width: 24,
    height: 24,
    backgroundColor: theme.palette.primary.main,
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  markerCount: {
    color: theme.palette.common.white,
  },
}))

export default useStyles