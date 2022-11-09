import { useContext } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'

// CONTEXTS
import { AllPagesContext } from 'contexts/AllPagesContext'

// MUIS
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'

// SERVICES
import { postResendEmailConfirmation } from 'services/users'

// UTILITIES
import { didSuccessfullyCallTheApi } from 'utilities/validation'

const AppBarText = () => {
  const location = useLocation()
  const [ searchParams ] = useSearchParams()

  // CONTEXTS
  const { setSnackbarObject } = useContext(AllPagesContext)

  const pageType = searchParams.get('type')
  const email = searchParams.get('email')

  // HANDLE RESEND CLICK
  const handleResendClick = async (event, type) => {
    event.preventDefault()
    const abortController = new AbortController()

    if(type === 'sign-up' && email) {
      const response = await postResendEmailConfirmation(
        abortController.signal,
        {
          email,
        }
      )

      if(didSuccessfullyCallTheApi(response?.status)) {
        setSnackbarObject({
          open: true,
          severity:'success',
          title: '',
          message: 'Successfully requested to resend confirmation email',
        })
      } else {
        setSnackbarObject({
          open: true,
          severity:'error',
          title: response?.data?.error?.status?.replaceAll('_', ' ') || '',
          message: response?.data?.error?.message || 'Something gone wrong',
        })
      }
    }
  }

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
    location.pathname.includes('/reset-password') ||
    (location.pathname === '/authentication-finish' && 
    pageType === 'reset-password')
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
  else if (
    (location.pathname === '/authentication-finish' && 
    pageType === 'sign-up') ||
    (location.pathname === '/authentication-finish' && 
    pageType === 'forgot-password')
  ) return (
    <Typography 
      variant='body2'
      className='fontFamilySpaceMono'
    >
      Didn’t receive the link?&nbsp;
      <Link 
        href='#'
        underline='none'
        className='fontFamilySpaceMono fontWeight700'
        onClick={(event) => handleResendClick(event, pageType)}
      >
        Resend
      </Link>
    </Typography>
  )
  else return null
}

export default AppBarText