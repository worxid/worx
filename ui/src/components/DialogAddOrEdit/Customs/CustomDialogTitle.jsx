// MUIS
import DialogTitle from '@mui/material/DialogTitle'
import { styled } from '@mui/material/styles'

const CustomDialogTitle = styled(({ className, ...props }) => (
  <DialogTitle
    className={className} 
    {...props}
  />
))(({ theme }) => ({
  fontWeight: 600,
  padding: '36px 40px',
}))

export default CustomDialogTitle