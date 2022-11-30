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
import { postGetDeviceList } from 'services/devices'
import { postGetListFormTemplate } from 'services/formTemplate'

// STYLES
import useStyles from './homeUseStyles'

// UTILITIES
import { getLast30Days } from 'utilities/date'
import { 
  didSuccessfullyCallTheApi, 
  wasRequestCanceled,
} from 'utilities/validation'

const Home = () => {
  const axiosPrivate = useAxiosPrivate()
  const classes = useStyles()

  const { setSnackbarObject } = useContext(AllPagesContext)

  const initialFilterParameters = {
    form: 'all',
    device: 'all',
    startTime: getLast30Days().startTime,
    endTime: getLast30Days().endTime,
  }
  const [ filterParameters, setFilterParameters ] = useState(initialFilterParameters)

  const [formList, setFormList] = useState([])
  const [deviceList, setDeviceList] = useState([])

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
          {
            id: 'all',
            label: 'All'
          },
          ...response.data.content
        ]
      )
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
          {
            id: 'all',
            label: 'All'
          },
          ...response.data.content
        ]
      )
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
      <Chart filterParameters={filterParameters}/>

      {/* MAP */}
      <Map filterParameters={filterParameters}/>
    </Stack>
  )
}

export default Home