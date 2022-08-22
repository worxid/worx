// MUIS
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
      {children}
    </Stack>
  )
}

export default AuthenticationFull