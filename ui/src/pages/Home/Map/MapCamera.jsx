import { useEffect } from 'react'

const MapCamera = (props) => {
  const { 
    locationList, 
    mapObject, 
  } = props

  useEffect(() => {
    if(locationList.length === 1) mapObject.flyTo(locationList[0], 12)
    else if(locationList.length > 1) mapObject.fitBounds(locationList)
  }, [locationList])
  
  return null
}

export default MapCamera