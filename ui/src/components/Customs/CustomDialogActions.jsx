// MUIS
import DialogActions from '@mui/material/DialogActions'
import { styled } from '@mui/material/styles'

const CustomDialogActions = styled(({ className, ...props }) => (
  <DialogActions
    className={className} 
    {...props}
  />
))(({ theme }) => ({
  padding: 24,
}))

export default CustomDialogActions