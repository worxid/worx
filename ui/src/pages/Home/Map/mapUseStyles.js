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
}))

export default useStyles