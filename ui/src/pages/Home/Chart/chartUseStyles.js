// MUI STYLES
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    overflowX: 'auto',
    overflowY: 'hidden',
    width: '100%',
  },
  chart: {
    '& .apexcharts-tooltip.apexcharts-theme-light .apexcharts-tooltip-title': {
      backgroundColor: theme.palette.background.paper,
    },
    '& .apexcharts-tooltip.apexcharts-theme-light': {
      backgroundColor: theme.palette.background.default,
    },
  },
}))

export default useStyles