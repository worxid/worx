// MUIS
import DialogActions from '@mui/material/DialogActions'
import { styled } from '@mui/material/styles'

const CustomDialogActions = styled(({ className, ...props }) => (
  <DialogActions
    className={className} 
    {...props}
  />
))(({ theme }) => ({
  padding: '16px 32px',
}))

export default CustomDialogActions