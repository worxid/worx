// ASSETS
import IconEmail from 'assets/images/icons/authentication-email.svg'

// MUIS
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'

// STYLES
import useLayoutStyles from 'styles/layoutAuthenticationFull'

const SignUpFinish = () => {
  const layoutClasses = useLayoutStyles()

  return (
    <>
      {/* EMAIL ICON */}
      <Box
        component='img'
        src={IconEmail}
        alt=''
        className={layoutClasses.icon}
      />

      {/* TITLE */}
      <Typography
        variant='h6'
        className={layoutClasses.textTitle}
      >
        Check Your Email
      </Typography>

      {/* CAPTION */}
      <Typography variant='subtitle1'>
        Click the link in your email
        <br/>
        to activate your account
      </Typography>

      {/* SIGN IN BUTTON */}
      <Button
        variant='contained'
        fullWidth
        className={layoutClasses.buttonAction}
        disableElevation
        type='submit'
        href='/sign-in'
      >
        Sign In
      </Button>

      {/* RESEND TEXT */}
      <Typography variant='subtitle1'>
        Didn’t receive the link?&nbsp;
        <Link
          underline='none'
          className={layoutClasses.linkInsideText}
        >
          Resend
        </Link>
      </Typography>
    </>
  )
}

export default SignUpFinish