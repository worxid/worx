// CONSTANTS
import { values } from 'constants/values'

// MUIS
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'

const CustomDialogActionButton = styled(({ className, ...props }) => (
  <Button
    className={className} 
    {...props}
  />
))(({ theme }) => ({
  textTransform: 'none',
  fontFamily: values.fontFamilyDmMono,
}))

export default CustomDialogActionButton