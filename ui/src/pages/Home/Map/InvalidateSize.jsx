import { useEffect } from 'react'

const InvalidateSize = (props) => {
  const { 
    map,
    dependencyList, 
  } = props

  useEffect(() => {
    const timer = setTimeout(() => {
      map && map.invalidateSize()
    }, 300)

    return () => clearTimeout(timer)
  }, [...dependencyList])

  return null
}

export default InvalidateSize