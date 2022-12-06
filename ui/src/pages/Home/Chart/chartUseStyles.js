// MUI STYLES
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    overflowX: 'auto',
    overflowY: 'hidden',
    width: '100%',
  },
  chart: {
    '& .apexcharts-tooltip': {
      borderRadius: 0,
      border: 'none',
    },
  },
  chartTooltip: {
    padding: 12,
    borderRadius: 0,
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${theme.palette.common.black}`,
    color: theme.palette.text.primary,
  },
}))

export default useStyles