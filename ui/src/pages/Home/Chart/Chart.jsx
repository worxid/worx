import { useState, useEffect, useRef } from 'react'

// APEX CHART
import ReactApexChart from 'react-apexcharts'

// CONSTANTS
import { 
  dummyChartList10,
  dummyChartList30,
  dummyChartList50,
  getTransactionChartOptions,
  getTransactionChartSeries,
} from './chartConstants'

// MUIS
import Stack from '@mui/material/Stack'
import { useTheme } from '@mui/material/styles'

// STYLES
import useStyles from './chartUseStyles'

const Chart = () => {
  const classes = useStyles()

  const chartContainerRef = useRef()

  const theme = useTheme()

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

  useEffect(() => {
    setChartList(dummyChartList30)
  }, [])

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
          chartList.map(item => item.x)
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