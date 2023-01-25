// MUIS
import DialogActions from '@mui/material/DialogActions'
import { styled } from '@mui/material/styles'

const CustomDialogActions = styled(({ className, ...props }) => (
  <DialogActions
    className={className} 
    {...props}
  />
))(({ theme }) => ({
  padding: 0,
}))

export default CustomDialogActions