import { useState, useEffect, useContext } from 'react'

// COMPONENTS
import InvalidateSize from './InvalidateSize'
import MapCamera from './MapCamera'
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
import { postDashboardStatsMap } from 'services/worx/dashboard'

// STYLES
import useStyles from './mapUseStyles'
import 'leaflet/dist/leaflet.css'

// UTILITIES
import moment from 'moment'
import { getDefaultErrorMessage } from 'utilities/object'
import { 
  didSuccessfullyCallTheApi,
  wasAccessTokenExpired,
  wasRequestCanceled,
} from 'utilities/validation'

const Map = (props) => {
  const { 
    filterParameters, 
    selectedBarChartItem,
  } = props
  
  const axiosPrivate = useAxiosPrivate()
  
  const { drawerState } = useContext(PrivateLayoutContext)
  const { setSnackbarObject } = useContext(AllPagesContext)
  
  const [ mapObject, setMapObject ] = useState()
  const [ submissionList, setSubmissionList ] = useState([])
  const [ filteredSubmissionList, setFilteredSubmissionList ] = useState(submissionList)
  const [ boundCoordinateList, setBoundCoordinateList ] = useState([])

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
      const newSubmissionList = response?.data?.list

      setSubmissionList(newSubmissionList)
      setBoundCoordinateList(newSubmissionList.map(item => [ item?.submit_location?.lat, item.submit_location?.lng ]))
    }
    else if (!wasRequestCanceled(response?.status) && !wasAccessTokenExpired(response.status)) {
      setSnackbarObject(getDefaultErrorMessage(response))
    }
  }

  const updateMapCameraBasedOnSelectedBarChartItem = () => {
    const selectedSubmissionList = submissionList.filter(item => item.submit_date.includes(selectedBarChartItem.date))

    if (selectedSubmissionList.length > 0) {
      setFilteredSubmissionList(selectedSubmissionList)
      setBoundCoordinateList(selectedSubmissionList.map(item => [ item?.submit_location?.lat, item.submit_location?.lng ]))
    }
    else {
      setSnackbarObject({
        open: true,
        severity: 'info',
        title: '',
        message: 'No submission location for the map',
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

  useEffect(() => {
    if (selectedBarChartItem) updateMapCameraBasedOnSelectedBarChartItem()
    else setFilteredSubmissionList([...submissionList])
  }, [submissionList, selectedBarChartItem])

  return (
    <Stack
      flex='1'
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
          submissionList={filteredSubmissionList}
        />

        {/* MAP CAMERA */}
        {submissionList.length > 0 &&
        <MapCamera
          mapObject={mapObject}
          locationList={boundCoordinateList}
        />}
      </MapContainer>
    </Stack>
  )
}

export default Map