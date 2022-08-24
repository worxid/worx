// MUI STYLES
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
  root: {
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
}))

export default useStyles