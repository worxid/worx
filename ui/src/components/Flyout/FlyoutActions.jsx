// TO DO: CHECK IF THIS COMPONENT IS STILL USED
// MUIS
import DialogActions from '@mui/material/DialogActions'
import { styled } from '@mui/material/styles'

const FlyoutActions = styled(({ className, ...props }) => (
  <DialogActions
    className={className} 
    {...props}
  />
))(({ theme }) => ({
  padding: 24,
}))

export default FlyoutActions