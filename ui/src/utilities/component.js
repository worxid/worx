// MUI ICONS
import IconKeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown'
import IconKeyboardArrowUp from '@mui/icons-material/KeyboardArrowUp'

export const getExpandOrCollapseIcon = (inputState = false, inputSize = 'medium') => {
  if (inputState) return <IconKeyboardArrowUp fontSize={inputSize}/>
  else return <IconKeyboardArrowDown fontSize={inputSize}/>
}

export const getDeviceStatusColor = (status) => {
  if(status === 'PENDING') return 'warning.main'
  else if(status === 'DENIED') return 'error.main'
  else if(status === 'APPROVED') return 'success.main'
}