// ASSETS
import imageAuthenticationGrid from 'assets/images/backgrounds/authentication-grid.svg'

// CONSTANTS
import { values } from 'constants/values'

// MUI STYLES
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    overflow: 'hidden'
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  contentSide: {
    position: 'relative',
    backgroundImage: `url("${imageAuthenticationGrid}")`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    borderRight: `3px solid ${theme.palette.common.black}`,
    overflowY: 'hidden',
    height: '100%'
  },
  containerText: {
    marginTop: 152,
    width: '80%',
    margin: '10%',
  },
  text: {
    color: theme.palette.common.white,
    fontFamily: values.fontFamilySpaceMono,
  },
  textTitle: {
    fontWeight: 700,
    marginBottom: 12,
  },
  pictureComplementary: {
    width: '92%',
    alignSelf: 'flex-end',
  },
  contentMain: {
    alignItems: 'center',
    margin: '60px 0px',
  },
  containerChildren: {
    width: 480,
    alignItems: 'center',
  },
}))

export default useStyles