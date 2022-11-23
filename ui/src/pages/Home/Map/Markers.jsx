import { useState, useEffect, useRef } from 'react'

// COMPONENTS
import MarkerIcon from './MarkerIcon'

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
          {},
        ),
      })
    }
    // CLUSTER ITEM
    else {
      return L.marker(latitudeLongitude, {
        icon: MarkerIcon(
          'cluster',
          classes,
          feature,
          { superclusterRef, mapObject, },
        ),
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
          parseFloat(item.longitude) || null,
          parseFloat(item.latitude) || null,
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
    if(mapBounds && mapZoom && submissionList.length) {
      updateCluster()
    }
  }, [mapObject, mapBounds, mapZoom, submissionList])

  return null
}

export default MapMarkers