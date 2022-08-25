// ASSETS
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

  return (
    <>
      {/* EMAIL ICON */}
      <Box
        component='img'
        src={IconEmail}
        alt=''
        className={classes.icon}
      />

      {/* TITLE */}
      <Typography
        variant='h6'
        className={classes.textTitle}
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
        className={classes.buttonAction}
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
          className={classes.linkInsideText}
        >
          Resend
        </Link>
      </Typography>
    </>
  )
}

export default AuthenticationFinish