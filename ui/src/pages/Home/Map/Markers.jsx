import { useState, useEffect, useRef } from 'react'
import ReactDOMServer from 'react-dom/server'

// COMPONENTS
import MarkerIcon from './MarkerIcon'
import PopUp from './PopUp'

// LEAFLET
import L from 'leaflet'
import 'leaflet.markercluster/dist/leaflet.markercluster'

// STYLES
import useStyles from './mapUseStyles'

// SUPERCLUSTER
import Supercluster from 'supercluster'

const MapMarkers = (props) => {
  const { 
    mapObject, 
    submissionList,
  } = props

  const classes = useStyles()
  
  const superclusterRef = useRef()
  const geoJsonRef = useRef()

  const [ mapBounds, setMapBounds ] = useState()
  const [ mapZoom, setMapZoom ] = useState(2)

  const updateMapBoundsAndZoom = (inputMap, inputSetBounds, inputSetZoom) => {
    if (inputMap) {
      const b = inputMap.getBounds()
      
      inputSetBounds([
        b.getSouthWest().lng,
        b.getSouthWest().lat,
        b.getNorthEast().lng,
        b.getNorthEast().lat
      ])
      
      inputSetZoom(inputMap.getZoom())
    }
  }

  const createClusterIcon = (feature, latitudeLongitude) => {
    // USUAL MARKER ITEM
    if (!feature?.properties?.cluster && latitudeLongitude) {
      return L.marker(latitudeLongitude, {
        icon: MarkerIcon(
          'marker',
          classes,
          feature,
        ),
      }).bindPopup(ReactDOMServer.renderToString(
        <PopUp 
          markerData={feature.markerData}
          classes={classes}
        />
      ), {})
    }
    // CLUSTER ITEM
    else {
      return L.marker(latitudeLongitude, {
        icon: MarkerIcon(
          'cluster',
          classes,
          feature,
        ),
      }).on('click', (event) => {
        if(superclusterRef.current) {
          const zoomTo = superclusterRef?.current?.getClusterExpansionZoom(feature?.properties?.cluster_id)
          mapObject.setView(latitudeLongitude, zoomTo)
          setMapZoom(zoomTo)
        }
      })
    }
  }

  const updateCluster = () => {
    if(!geoJsonRef.current) geoJsonRef.current = L.geoJSON(null, {
      pointToLayer: createClusterIcon
    }).addTo(mapObject)

    // CLEAR PREVIOUS LAYERS
    geoJsonRef.current.clearLayers()

    let pointList = submissionList.map(item => ({
      type: 'Feature',
      properties: {
        cluster: false,
      },
      geometry: {
        type: 'Point',
        coordinates: [
          parseFloat(item?.submit_location?.lng) || null,
          parseFloat(item?.submit_location?.lat) || null,
        ],
      },
      markerData: item,
    }))

    superclusterRef.current = new Supercluster({
      radius: 60,
      extent: 256,
      maxZoom: 20,
    })
    superclusterRef.current.load(pointList)

    const clusterList = superclusterRef.current.getClusters(mapBounds, mapZoom)

    geoJsonRef.current.addData(clusterList)
  }

  useEffect(() => {
    if(mapObject) {
      if(!mapBounds) {
        updateMapBoundsAndZoom(mapObject, setMapBounds, setMapZoom)
      }
  
      mapObject.on('zoomend dragend', () => {
        updateMapBoundsAndZoom(mapObject, setMapBounds, setMapZoom)
      })
    }
  }, [mapObject])

  useEffect(() => {
    if(mapBounds && mapZoom && submissionList) {
      updateCluster()
    }
  }, [mapObject, mapBounds, mapZoom, submissionList])

  return null
}

export default MapMarkers