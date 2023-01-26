// MUIS
import DialogTitle from '@mui/material/DialogTitle'
import { styled } from '@mui/material/styles'

const CustomDialogTitle = styled(({ className, ...props }) => (
  <DialogTitle
    className={className} 
    {...props}
  />
))(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '16px 20px',
  backgroundColor: theme.palette.primary.outlinedHoverBackground,
  borderLeft: `2px solid ${theme.palette.primary.main}`,
  margin: 24,
}))

export default CustomDialogTitle