// COMPONENTS
import Drawer from 'components/Drawer/Drawer'

// MUIS
import CssBaseline from '@mui/material/CssBaseline'
import Stack from '@mui/material/Stack'

// STYLES
import useStyles from './privateUseStyles'

const Private = (props) => {
  const { children } = props

  const classes = useStyles()

  return (
    <Stack 
      direction='row'
      className={`${classes.root} no-zoom`}
    >
      <CssBaseline/>

      {/* DRAWER */}
      <Drawer/>

      {/* CONTENT CONTAINER */}
      <Stack
        component='main'
        className={`${classes.contentContainer} zoom`}
      >
        {children}
      </Stack>
    </Stack>
  )
}

export default Private