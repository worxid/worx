import { useContext, useEffect, useState } from 'react'

// COMPONENTS
import Chart from './Chart/Chart'
import Filters from './Filters/Filters'
import Map from './Map/Map'

// CONTEXTS
import { AllPagesContext } from 'contexts/AllPagesContext'

// HOOKS
import useAxiosPrivate from 'hooks/useAxiosPrivate'

// MUIS
import Divider from '@mui/material/Divider'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

// SERVICES
import { postGetDeviceList } from 'services/worx/devices'
import { postGetListFormTemplate } from 'services/formTemplate'

// STYLES
import useStyles from './homeUseStyles'

// UTILITIES
import { getLast30Days } from 'utilities/date'
import { getDefaultErrorMessage } from 'utilities/object'
import { 
  didSuccessfullyCallTheApi, 
  wasAccessTokenExpired,
  wasRequestCanceled,
} from 'utilities/validation'

const Home = () => {
  const axiosPrivate = useAxiosPrivate()
  const classes = useStyles()

  const { setSnackbarObject } = useContext(AllPagesContext)

  const initialList = { id: 'all', label: 'All' }

  const initialFilterParameters = {
    form: 'all',
    device: 'all',
    startTime: getLast30Days().startTime,
    endTime: getLast30Days().endTime,
  }
  const [ filterParameters, setFilterParameters ] = useState(initialFilterParameters)

  const [ formList, setFormList ] = useState([initialList])
  const [ deviceList, setDeviceList ] = useState([initialList])
  const [ selectedBarChartItem, setSelectedBarChartItem ] = useState(null)

  // FETCH FILTER DATA
  const fetchDeviceList = async (abortController, inputIsMounted) => {
    const response = await postGetDeviceList(
      abortController.signal,
      {},
      {},
      axiosPrivate,
    )

    if (didSuccessfullyCallTheApi(response?.status) && inputIsMounted) {
      setDeviceList(
        [
          initialList,
          ...response.data.content
        ]
      )
    }
    else if (!wasRequestCanceled(response?.status) && !wasAccessTokenExpired(response.status)) {
      setSnackbarObject(getDefaultErrorMessage(response))
    }
  }

  const fetchFormList = async (abortController, inputIsMounted) => {
    const response = await postGetListFormTemplate(
      abortController.signal,
      {},
      {},
      axiosPrivate,
    )

    if (didSuccessfullyCallTheApi(response?.status) && inputIsMounted) {
      setFormList(
        [
          initialList,
          ...response.data.content
        ]
      )
    }
    else if (!wasRequestCanceled(response?.status) && !wasAccessTokenExpired(response.status)) {
      setSnackbarObject(getDefaultErrorMessage(response))
    }
  }
  
  useEffect(() => {
    let isMounted = true
    const abortController = new AbortController()

    fetchDeviceList(abortController.signal, isMounted)
    fetchFormList(abortController.signal, isMounted)

    return () => {
      isMounted = false
      abortController.abort()
    }
  }, [])

  return (
    <Stack className={classes.root}>
      {/* HEADER */}
      <Typography 
        variant='h6'
        className={classes.title}
      >
        Dashboard
      </Typography>

      <Divider className={classes.divider}/>

      {/* FILTERS */}
      <Filters
        initialFilterParameters={initialFilterParameters}
        filterParameters={filterParameters}
        setFilterParameters={setFilterParameters}
        formList={formList}
        deviceList={deviceList}
      />

      <Divider className={classes.divider}/>

      {/* CHART */}
      <Chart 
        filterParameters={filterParameters}
        setSelectedBarChartItem={setSelectedBarChartItem}
      />

      {/* MAP */}
      <Map 
        filterParameters={filterParameters}
        selectedBarChartItem={selectedBarChartItem}
      />
    </Stack>
  )
}

export default Home