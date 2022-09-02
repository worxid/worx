// COMPONENTS
import AppBar from 'components/AppBar/AppBar'

// MUIS
import Button from '@mui/material/Button'

// STYLES
import useStyles from './formsEditUseStyles'

const FormsEdit = () => {
  const classes = useStyles()

  return (
    <>
      <AppBar
        hasFab={false}
        hasBack={true}
        backLink='/forms'
        pageTitle='Edit Form'
        hasSearch={false}
        extraComponent={
          <Button 
            variant='contained'
            className={classes.appBarExtraComponent}
          >
            Save
          </Button>
        }
      />
    </>
  )
}

export default FormsEdit