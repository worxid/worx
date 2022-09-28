import { useLocation } from 'react-router-dom'

// MUIS
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'

const AppBarText = () => {
  const location = useLocation()

  if (
    location.pathname === '/sign-up' ||
    location.pathname === '/forgot-password'
  ) return (
    <Typography 
      variant='body2'
      className='fontFamilySpaceMono'
    >
      Already have an account?&nbsp;
      <Link 
        href='/sign-in'
        underline='none'
        className='fontFamilySpaceMono fontWeight700'
      >
        Sign In
      </Link>
    </Typography>
  )
  else if (
    location.pathname === '/sign-in' ||
    location.pathname.includes('/reset-password')
  ) return (
    <Typography 
      variant='body2'
      className='fontFamilySpaceMono'
    >
      Don’t have an account?&nbsp;
      <Link 
        href='/sign-up'
        underline='none'
        className='fontFamilySpaceMono fontWeight700'
      >
        Sign Up
      </Link>
    </Typography>
  )
  else return null
}

export default AppBarText