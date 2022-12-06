import ReactDOMServer from 'react-dom/server'

// LEAFLET
import L from 'leaflet'

// MUIS
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

const MarkerIcon = (
  type,
  classes,
  pointCount,
) => {
  return L.divIcon({
    className: 'custom-icon',
    html: ReactDOMServer.renderToString(
      <Box className={`${classes.marker} ${type === 'cluster' && 'cluster'} zoom`}>
        {/* MARKER COUNT */}
        {type === 'cluster' &&
        <Typography 
          variant='body1'
          className={classes.markerCount}
        >
          {pointCount}
        </Typography>}
      </Box>
    ),
    iconSize: type === 'cluster' ? [32, 32] : [20, 20]
  })
}

export default MarkerIcon