// CONSTANTS
import { values } from 'constants/values'

// MUIS
import Stack from '@mui/material/Stack'
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip'
import { styled } from '@mui/material/styles'

const StyledTooltip = styled(({ className, ...props }) => (
  <Tooltip 
    {...props} 
    classes={{ popper: className }} 
  />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    borderRadius: 0,
    padding: '0px !important',
    margin: '0px !important',
    backgroundColor: theme.palette.additional.drawer.background,
  },
  [values.zoomBoundary]: {
    [`& .${tooltipClasses.tooltip}`]: {
      zoom: values.zoomValue,
    },
  }
}))

const NavigationTooltip = (props) => {
  return (
    <Stack className='neutralize-zoom-tooltip'>
      <StyledTooltip className='no-zoom' {...props}/>
    </Stack>
  )
}

export default NavigationTooltip