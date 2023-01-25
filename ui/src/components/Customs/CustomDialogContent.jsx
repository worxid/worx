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
  padding: '0px 4px',
  overflowY: 'auto',
}))

export default CustomDialogContent