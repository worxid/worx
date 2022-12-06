// MUI STYLES
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
  mapContainer: {
    position: 'relative',
    zIndex: 1,
    // MAP
    '&.leaflet-container': {
      width: '100%',
      height: '100%',
    },
    // POP UP
    '& .leaflet-popup-content-wrapper, &.leaflet-popup-tip': {
      borderRadius: 0,
      border: `1px solid ${theme.palette.common.black}`,
    },
  },
  marker: {
    width: 20,
    height: 20,
    backgroundColor: theme.palette.primary.main,
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '&.cluster': {
      width: 32,
      height: 32,
    }
  },
  markerCount: {
    color: theme.palette.common.white,
  },
  popUpContainer: {
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
  popUpListItemLink: {
    cursor: 'pointer',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
}))

export default useStyles