import { useState } from 'react'

// COMPONENTS
import Chart from './Chart/Chart'
import Filters from './Filters/Filters'
import Map from './Map/Map'

// CONSTANTS
import { 
  dummyDeviceList,
  dummyFormList, 
} from './homeConstants'

// DATE AND TIME
import moment from 'moment'

// MUIS
import Divider from '@mui/material/Divider'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

// STYLES
import useStyles from './homeUseStyles'

const Home = () => {
  const classes = useStyles()

  const initialFIlterParameters = {
    form: dummyFormList[0].text,
    device: dummyDeviceList[0].text,
    startTime: moment().subtract(1, 'month').toDate(),
    endTime: moment().endOf('month').toDate(), 
  }

  const [ filterParameters, setFilterParameters ] = useState(initialFIlterParameters)

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
        initialFIlterParameters={initialFIlterParameters}
        filterParameters={filterParameters}
        setFilterParameters={setFilterParameters}
        formList={dummyFormList}
        deviceList={dummyDeviceList}
      />

      <Divider className={classes.divider}/>

      {/* CHART */}
      <Chart/>

      {/* MAP */}
      <Map filterParameters={filterParameters}/>
    </Stack>
  )
}

export default Home