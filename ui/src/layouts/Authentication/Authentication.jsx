// ASSETS
import LogoProductWithText from 'assets/images/logos/product-logo-with-text.svg'

// MUIS
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import Stack from '@mui/material/Stack'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'

// STYLES
import useStyles from './authenticationUseStyles'

const AuthenticationHalf = (props) => {
  const { children } = props

  const classes = useStyles()

  return (
    <Stack className={`${classes.root} no-zoom`}>
      {/* APP BAR */}
      <AppBar 
        className={`${classes.appBar} zoom`}
        position='sticky'
      >
        <Toolbar className={classes.toolbar}>
          {/* PRODUCT LOGO */}
          <Link href='/'>
            <Box
              component='img'
              src={LogoProductWithText}
              alt=''
            />
          </Link>

          {/* TEXT AND LINK */}
          <Typography 
            variant='body2'
            className='fontFamilySpaceMono'
          >
            Already have an account? Sign In
          </Typography>
        </Toolbar>
      </AppBar>

      {/* CHILDREN CONTAINER */}
      <Stack 
        className='zoom'
        justifyContent='center'
        alignItems='center'
        flex='1'
      >
        <Stack className={classes.content}>
          {children}
        </Stack>
      </Stack>
    </Stack>
  )
}

export default AuthenticationHalf