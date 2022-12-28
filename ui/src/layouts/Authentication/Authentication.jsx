import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// ASSETS
import LogoProductWithText from 'assets/images/logos/product-logo-with-text.svg'

// MUIS
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import Stack from '@mui/material/Stack'
import Toolbar from '@mui/material/Toolbar'

// SERVICES
import { getDashboardMetaData } from 'services/strapi/dashboard'

// STYLES
import useStyles from './authenticationUseStyles'

// UTILITIES
import { updateMetaData } from 'utilities/dom'

const AuthenticationHalf = (props) => {
  const { children } = props

  const classes = useStyles()

  const location = useLocation()

  const loadPageMetaData = async (inputIsMounted, inputAbortController) => {
    const resultMetaData = await getDashboardMetaData(
      inputAbortController.signal,
      'dashboard-sign-in',
    )
    
    if (resultMetaData.status === 200 && inputIsMounted) {
      updateMetaData(resultMetaData?.data?.data?.attributes?.Metadata)
    }
  }

  useEffect(() => {
    let isMounted = true
    const abortController = new AbortController()

    if (location.pathname === '/sign-up' || location.pathname === '/sign-in') {
      loadPageMetaData(isMounted, abortController)
    }

    return () => {
      isMounted = false
      abortController.abort()
    }
  }, [location])

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