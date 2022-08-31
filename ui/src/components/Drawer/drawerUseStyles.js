// MUI STYLES
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
  headerIconToggle: {
    position: 'absolute',
    left: 16,
    transform: 'rotateY(0deg)',
    transition: 'transform 0.25s ease-in-out',
    color: theme.palette.common.white,
  },
  headerLogoProduct: {
    height: 28,
  },
  navigationItem: {
    paddingLeft: 24,
    height: 48,
    '&:hover': {
      backgroundColor: theme.palette.additional.drawer.hover,
    },
  },
  navigationItemActive: {
    backgroundColor: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
    },
  },
  navigationItemContentInactive: {
    color: theme.palette.additional.drawer.contentInactive,
  },
  navigationItemContentActive: {
    color: theme.palette.additional.drawer.contentActive,
  },
  navigationChilrenIcon: {
    width: 8,
    marginLeft: 8,
  },
}))

export default useStyles