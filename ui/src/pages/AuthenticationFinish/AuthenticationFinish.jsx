import { useSearchParams } from 'react-router-dom'

// ASSETS
import IconCheck from 'assets/images/icons/authentication-check.svg'
import IconEmail from 'assets/images/icons/authentication-email.svg'

// MUIS
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'

// STYLES
import useStyles from './authenticationFinishUseStyles'

const AuthenticationFinish = () => {
  const classes = useStyles()

  const [ searchParams ] = useSearchParams()

  const type = searchParams.get('type')
  const email = searchParams.get('email')

  const getinformation = (inputType) => {
    let informationObject = {}

    if (inputType === 'sign-up' || inputType === 'forgot-password') {
      informationObject = {
        title: 'Check Your Email',
        icon: IconEmail,
      }

      if (inputType === 'sign-up') {
        informationObject.caption1 = 'Click the link in your email'
        informationObject.caption2 = 'to activate your account'
        informationObject.navigationText = 'Didn’t receive the link? '
        informationObject.linkText = 'Resend'
      }
      else if (inputType === 'forgot-password') {
        informationObject.caption1 = 'A link to reset your password'
        informationObject.caption2 = 'has been sent to your email'
        informationObject.navigationText = 'Didn’t receive the link? '
        informationObject.linkText = 'Resend'
      }
    }
    else if (inputType === 'reset-password') {
      informationObject = {
        title: 'Your password has been changed successfully',
        icon: IconCheck,
        navigationText: 'Don’t have an account? ',
        linkText: 'Sign Up',
      }
    }

    return informationObject
  }

  return (
    <>
      {/* EMAIL ICON */}
      <Box
        component='img'
        src={getinformation(type).icon}
        alt=''
        className={classes.icon}
      />

      {/* TITLE */}
      <Typography
        variant='h6'
        className={classes.textTitle}
        textAlign='center'
      >
        {getinformation(type).title}
      </Typography>

      {/* CAPTION */}
      {(type === 'sign-up' || type === 'forgot-password') &&
      <Typography 
        variant='subtitle1'
        textAlign='center'
      >
        {getinformation(type).caption1}
        <br/>
        {getinformation(type).caption2}
      </Typography>}

      {/* SIGN IN BUTTON */}
      <Button
        variant='contained'
        fullWidth
        className={classes.buttonAction}
        disableElevation
        type='submit'
        href='/sign-in'
      >
        Sign In
      </Button>

      {/* NAVIGATION TEXT */}
      <Typography 
        variant='body2'
        className='fontFamilySpaceMono'
        textAlign='center'
      >
        {/* NORMAL TEXT */}
        {getinformation(type).navigationText}

        {/* LINK TEXT */}
        <Link 
          href={type === 'reset-password' ? '/sign-up' : '#'}
          underline='none'
          className='fontFamilySpaceMono fontWeight700'
        >
          {getinformation(type).linkText}
        </Link>
      </Typography>
    </>
  )
}

export default AuthenticationFinish