// MUIS
import DialogContent from '@mui/material/DialogContent'
import { styled } from '@mui/material/styles'

const CustomDialogContent = styled(({ className, ...props }) => (
  <DialogContent
    className={className} 
    {...props}
  />
))(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: '0px 48px 20px',
  overflowY: 'auto',
}))

export default CustomDialogContent