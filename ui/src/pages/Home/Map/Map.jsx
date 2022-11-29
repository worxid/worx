import { useState, useEffect, useContext } from 'react'

// COMPONENTS
import InvalidateSize from './InvalidateSize'
import Markers from './Markers'

// CONTEXTS
import { AllPagesContext } from 'contexts/AllPagesContext'
import { PrivateLayoutContext } from 'contexts/PrivateLayoutContext'

// HOOKS
import useAxiosPrivate from 'hooks/useAxiosPrivate'

// LEAFLET
import { 
  MapContainer, 
  TileLayer, 
} from 'react-leaflet'

// MUIS
import Stack from '@mui/material/Stack'

// SERVICES
import { postDashboardStatsMap } from 'services/dashboard'

// STYLES
import useStyles from './mapUseStyles'
import 'leaflet/dist/leaflet.css'

// UTILITIES
import moment from 'moment'
import { 
  didSuccessfullyCallTheApi, 
  wasRequestCanceled,
} from 'utilities/validation'

const Map = (props) => {
  const axiosPrivate = useAxiosPrivate()

  const { filterParameters } = props

  const { drawerState } = useContext(PrivateLayoutContext)
  const { setSnackbarObject } = useContext(AllPagesContext)
  
  const [ mapObject, setMapObject ] = useState()
  const [ submissionList, setSubmissionList ] = useState([])

  const classes = useStyles()

  const fetchDashboardMap = async (abortController, inputIsMounted) => {
    let requestParams = {
      from: moment(filterParameters?.startTime).format('YYYY-MM-DD'),
      to: moment(filterParameters?.endTime).format('YYYY-MM-DD'),
    }
    const bodyParams = {}
    if(filterParameters?.form !== 'all'){
      bodyParams.template_id = filterParameters.form
    } 
    if (filterParameters?.device !== 'all') {
      bodyParams.device_id = filterParameters.device
    }
    const response = await postDashboardStatsMap(
      abortController.signal,
      requestParams,
      bodyParams,
      axiosPrivate,
    )

    if (didSuccessfullyCallTheApi(response?.status) && inputIsMounted) {
      setSubmissionList(response?.data?.list)
    }
    else if (!wasRequestCanceled(response?.status)) {
      setSnackbarObject({
        open: true,
        severity: 'error',
        title: response?.data?.error?.status?.replaceAll('_', ' ') || '',
        message: response?.data?.error?.message || 'Something went wrong',
      })
    }
  }

  useEffect(() => {
    let isMounted = true
    const abortController = new AbortController()
    fetchDashboardMap(abortController.signal, isMounted)

    return () => {
      isMounted = false
      abortController.abort()
    }
  }, [
    filterParameters.device,
    filterParameters.form,
    filterParameters.endTime,
    filterParameters.startTime
  ])

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

        {/* INVALIDATE SIZE */}
        <InvalidateSize
          map={mapObject}
          dependencyList={[ mapObject, drawerState.isDrawerExpanded ]}
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