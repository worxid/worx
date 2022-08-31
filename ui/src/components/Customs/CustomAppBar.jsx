// MUIS
import AppBar from '@mui/material/AppBar'
import { styled } from '@mui/material/styles'

const CustomAppBar = styled(AppBar)
(({ theme }) => ({
  backgroundColor: 'unset',
  boxShadow: 'unset',
  color: theme.palette.text.primary,
  marginBottom: 24,
}))

export default CustomAppBar