// ASSETS
import imageAuthenticationGrid from 'assets/images/backgrounds/authentication-grid.svg'

// CONSTANTS
import { values } from 'constants/values'

// MUI STYLES
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundImage: `url("${imageAuthenticationGrid}")`,
    backgroundRepeat: 'repeat',
    minHeight: '100vh',
    height: '100vh',
    position: 'relative',
    backgroundColor: theme.palette.primary.main,
  },
  logoProduct: {
    marginBottom: 60,
  },
  containerContent: {
    width: 600,
    backgroundColor: theme.palette.common.white,
    border: `3px solid ${theme.palette.common.black}`,
    padding: 60,
    alignItems: 'center',
    textAlign: 'center',
  },
  icon: {
    height: 100,
  },
  textTitle: {
    margin: '32px 0px 12px',
    fontFamily: values.fontFamilySpaceMono,
    fontWeight: 700,
  },
  buttonAction: {
    margin: '28px 0px 16px',
  },
  linkInsideText: {
    cursor: 'pointer',
    fontFamily: values.fontFamilySpaceMono,
    fontWeight: 700,
  },
}))

export default useStyles