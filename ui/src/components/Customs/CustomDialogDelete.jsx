// MUIS
import Dialog from '@mui/material/Dialog'
import { styled } from '@mui/material/styles'

const CustomDialogDelete = styled(({ className, ...props }) => (
  <Dialog
    className={className} 
    {...props}
  />
))(({ theme }) => ({
  '& .MuiDialog-paper': {
    padding: 32,
    paddingBottom: 20,
    width: 460,
    border: `3px solid ${theme.palette.text.primary}`
  },
}))

export default CustomDialogDelete