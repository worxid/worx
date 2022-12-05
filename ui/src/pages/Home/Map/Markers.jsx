import { useEffect, useRef } from 'react'
import ReactDOMServer from 'react-dom/server'

// COMPONENTS
import MarkerIcon from './MarkerIcon'
import PopUp from './PopUp'

// LEAFLET
import L from 'leaflet'
import 'leaflet.markercluster/dist/leaflet.markercluster'

// LEAFLET MARKER CLUSTER
import 'leaflet.markercluster'

// STYLES
import useStyles from './mapUseStyles'

const MapMarkers = (props) => {
  const { 
    mapObject, 
    submissionList,
  } = props

  const classes = useStyles()
  
  const markerClusterRef = useRef(L.markerClusterGroup({
    maxClusterRadius: 150,
    showCoverageOnHover: false,
    iconCreateFunction: (cluster) => MarkerIcon(
      'cluster',
      classes,
      cluster.getChildCount()
    )
  }))

  useEffect(() => {
    if(mapObject && submissionList) {
      // clear all layers
      markerClusterRef.current.clearLayers()

      submissionList.forEach(item => {
        const latLng = [item?.submit_location?.lat, item.submit_location?.lng]
        if(latLng[0] && latLng[1]) {
          return L.marker(latLng, {
            icon: MarkerIcon(
              'marker',
              classes
            ),
          }).bindPopup(ReactDOMServer.renderToString(
            <PopUp 
              markerData={item}
              classes={classes}
            />
          ), {}).addTo(markerClusterRef.current)
        }
      })

      mapObject.addLayer(markerClusterRef.current)

      markerClusterRef.current.on('clusterclick', (event) => {
        event.layer.zoomToBounds({padding: [20, 20]})
      })
    }
  }, [mapObject, submissionList])

  return null
}

export default MapMarkers