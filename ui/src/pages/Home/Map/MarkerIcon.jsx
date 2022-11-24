import ReactDOMServer from 'react-dom/server'

// LEAFLET
import L from 'leaflet'

// MUIS
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

const MarkerIcon = (
  type,
  classes,
  feature,
) => {
  return L.divIcon({
    className: 'custom-icon',
    html: ReactDOMServer.renderToString(
      <Box className={`${classes.marker} zoom`}>
        {/* MARKER COUNT */}
        {type === 'cluster' &&
        <Typography 
          variant='body2'
          className={classes.markerCount}
        >
          {feature?.properties?.point_count}
        </Typography>}
      </Box>
    ),
  })
}

export default MarkerIcon