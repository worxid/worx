import { useSearchParams } from 'react-router-dom'

// ASSETS
import IconCheck from 'assets/images/icons/authentication-check.svg'
import IconEmail from 'assets/images/icons/authentication-email.svg'
import LogoProductWithTextWhite from 'assets/images/logos/product-logo-with-text-white.svg'

// MUIS
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Link from '@mui/material/Link'
import Stack from '@mui/material/Stack'
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
      }
      else if (inputType === 'forgot-password') {
        informationObject.caption1 = 'A link to reset your password'
        informationObject.caption2 = 'has been sent to your email'
      }
    }
    else if (inputType === 'reset-password') {
      informationObject = {
        title: 'Your password has been changed successfully',
        icon: IconCheck,
      }
    }

    return informationObject
  }

  return (
    <Stack
      justifyContent='center'
      alignItems='center'
      className={classes.root}
    >
      {/* PRODUCT LOGO */}
      <Box
        component='img'
        src={LogoProductWithTextWhite}
        alt=''
        className={classes.logoProduct}
      />

      {/* CONTENT CONTAINER */}
      <Stack 
        alignItems='center'
        className={classes.containerContent}
      >
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
        >
          {getinformation(type).title}
        </Typography>

        {/* CAPTION */}
        {(type === 'sign-up' || type === 'forgot-password') &&
        <Typography variant='subtitle1'>
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

        {/* RESEND TEXT */}
        {(type === 'sign-up' || type === 'forgot-password') &&
        <Typography variant='subtitle1'>
          Didn’t receive the link?&nbsp;
          <Link
            underline='none'
            className={classes.linkInsideText}
          >
            Resend
          </Link>
        </Typography>}
      </Stack>
    </Stack>
  )
}

export default AuthenticationFinish