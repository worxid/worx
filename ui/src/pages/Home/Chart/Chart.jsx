import { useContext, useState, useEffect, useRef } from 'react'

// APEX CHART
import ReactApexChart from 'react-apexcharts'

// CONSTANTS
import { 
  getTransactionChartOptions,
  getTransactionChartSeries,
} from './chartConstants'

// CONTEXTS
import { AllPagesContext } from 'contexts/AllPagesContext'

// HOOKS
import useAxiosPrivate from 'hooks/useAxiosPrivate'

// MUIS
import Stack from '@mui/material/Stack'
import { useTheme } from '@mui/material/styles'

// SERVICES
import { postDashboardStatsChart } from 'services/dashboard'

// STYLES
import useStyles from './chartUseStyles'

// UTILITIES
import { convertDate } from 'utilities/date'
import moment from 'moment'
import { 
  didSuccessfullyCallTheApi, 
  wasRequestCanceled,
} from 'utilities/validation'

const Chart = (props) => {
  const axiosPrivate = useAxiosPrivate()

  const { filterParameters } = props

  const classes = useStyles()

  const chartContainerRef = useRef()
  
  const theme = useTheme()

  const { setSnackbarObject } = useContext(AllPagesContext)

  const [ chartList, setChartList ] = useState([])

  const chartTitle = 'Submission Count'

  const getChartWidth = () => {
    if (chartContainerRef.current) {
      const containerWidth = chartContainerRef.current.clientWidth
  
      if (chartList.length * 50 < containerWidth) return '100%'
      else return chartList.length * 50
    }
    else return '100%'
  }

  const fetchDashboardChart = async (abortController, inputIsMounted) => {
    let requestParams = {
      from: moment(filterParameters?.startTime).format('YYYY-MM-DD'),
      to: moment(filterParameters?.endTime).format('YYYY-MM-DD'),
    }
    let bodyParams = filterParameters?.form?.toLowerCase() !== 'all' && filterParameters?.device?.toLowerCase() !== 'all' 
      ? {
        template_id: filterParameters.form,
        device_id: filterParameters.device,
      }
      : {}
    const response = await postDashboardStatsChart(
      abortController.signal,
      requestParams,
      bodyParams,
      axiosPrivate,
    )

    if (didSuccessfullyCallTheApi(response?.status) && inputIsMounted) {
      setChartList(response?.data?.list?.map((data) => {
        return {
          x: convertDate(data?.date, 'dd'),
          y: data?.count
        }
      }))
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
    fetchDashboardChart(abortController.signal, isMounted)

    return () => {
      isMounted = false
      abortController.abort()
    }
  }, [filterParameters])

  return (
    <Stack 
      flex='1'
      ref={chartContainerRef}
      className={classes.root}
    >
      <ReactApexChart
        className={classes.chart}
        options={getTransactionChartOptions(
          theme,
          chartTitle, 
          chartList.map(item => item.x),
          chartList.map(item => item.y),
        )}
        series={getTransactionChartSeries(
          chartTitle, 
          chartList.map(item => item.y)
        )}
        type='bar'
        width={getChartWidth()}
        height='100%'
      />
    </Stack>
  )
}

export default Chart