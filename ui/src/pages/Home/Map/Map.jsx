import { useState } from 'react'

// COMPONENTS
import Markers from './Markers'

// LEAFLET
import { 
  MapContainer, 
  TileLayer, 
} from 'react-leaflet'

// MUIS
import Stack from '@mui/material/Stack'

// STYLES
import useStyles from './mapUseStyles'
import 'leaflet/dist/leaflet.css'

const Map = () => {
  const [ mapObject, setMapObject ] = useState()

  const classes = useStyles()

  return (
    <Stack
      flex='2'
      margin='0px -24px -24px'
    >
      <MapContainer
        center={[ 0, 0 ]}
        className={classes.mapContainer}
        zoomControl={false}
        zoom={2}
        whenReady={(mapObject) => setMapObject(mapObject.target)}
      >
        {/* BASE MAP */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://tile.openstreetmap.org/{z}/{x}/{y}.png'
          minZoom={2}
          maxZoom={20}
        />

        {/* MARKERS */}
        <Markers/>
      </MapContainer>
    </Stack>
  )
}

export default Map