import { useState, useEffect } from 'react'

// COMPONENTS
import Markers from './Markers'

// CONSTANTS
import { dummySubmissionList } from '../homeConstants'

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

const Map = (props) => {
  const { filterParameters } = props
  
  const [ mapObject, setMapObject ] = useState()
  const [ submissionList, setSubmissionList ] = useState([])

  const classes = useStyles()

  useEffect(() => {
    setSubmissionList(dummySubmissionList)
  }, [filterParameters])

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
          attribution='&copy; Maps Data: <a href="https://about.google/brand-resource-center/products-and-services/geo-guidelines/#required-attribution">Google</a>'
          url='http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}'
          subdomains={['mt1','mt2','mt3']}
          minZoom={2}
          maxZoom={20}
        />

        {/* MARKERS */}
        <Markers 
          mapObject={mapObject}
          submissionList={submissionList}
        />
      </MapContainer>
    </Stack>
  )
}

export default Map