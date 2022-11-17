// COMPONENTS
import Chart from './Chart/Chart'
import Filters from './Filters/Filters'
import Map from './Map/Map'

// MUIS
import Divider from '@mui/material/Divider'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

// STYLES
import useStyles from './homeUseStyles'

const Home = () => {
  const classes = useStyles()

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
      <Filters/>

      <Divider className={classes.divider}/>

      {/* CHART */}
      <Chart/>

      {/* MAP */}
      <Map/>
    </Stack>
  )
}

export default Home