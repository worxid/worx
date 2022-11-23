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
  popUpContainer: {
    padding: 12,
    border: `1px solid ${theme.palette.common.black}`,
    display: 'flex',
    flexDirection: 'column',
  },
  popUpTitle: {
    marginBottom: 8,
    fontWeight: 600,
  },
  popUpListItem: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 8,
    '&:last-child': {
      marginBottom: 0,
    },
  },
  popUpListItemIcon: {
    marginRight: 8,
    width: 16,
    height: 16,
    color: theme.palette.action.active,
  },
}))

export default useStyles