// ASSETS
import LogoProductWithTextWhite from 'assets/images/logos/product-logo-with-text-white.svg'

// MUIS
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'

// STYLES
import useStyles from './authenticationFullUseStyles'

const AuthenticationFull = (props) => {
  const { children } = props
  
  const classes = useStyles()

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
        {children}
      </Stack>
    </Stack>
  )
}

export default AuthenticationFull