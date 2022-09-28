// ASSETS
import LogoProductWithText from 'assets/images/logos/product-logo-with-text.svg'

// COMPONENTS
import AppBarText from './AppBarText'

// MUIS
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import Stack from '@mui/material/Stack'
import Toolbar from '@mui/material/Toolbar'

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

          {/* APP BAR TEXT */}
          <AppBarText/>
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