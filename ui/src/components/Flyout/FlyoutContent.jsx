// MUIS
import DialogContent from '@mui/material/DialogContent'
import { styled } from '@mui/material/styles'

const FlyoutContent = styled(({ className, ...props }) => (
  <DialogContent
    className={className} 
    {...props}
  />
))(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: 24,
  overflowY: 'auto',
}))

export default FlyoutContent