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
    backgroundColor: theme.palette.action.active,
    color: theme.palette.common.white,
    fontSize: 14,
    borderRadius: 0,
  },
  [values.zoomBoundary]: {
    [`& .${tooltipClasses.tooltip}`]: {
      zoom: values.zoomValue,
    },
  }
}))

const CustomTooltip = (props) => {
  return (
    <Stack className='neutralize-zoom-tooltip'>
      <StyledTooltip className='no-zoom' {...props}/>
    </Stack>
  )
}

export default CustomTooltip