// CONSTANTS
import { values } from 'constants/values'

// MUI STYLES
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
  headerIconToggle: {
    position: 'absolute',
    left: 12,
    transform: 'rotateY(0deg)',
    transition: 'transform 0.25s ease-in-out',
    color: theme.palette.common.white,
    [values.noZoomBoundary]: {
      left: 16,
    }
  },
  headerLogoProduct: {
    height: 28,
  },
  navigationItem: {
    paddingLeft: 20,
    height: 48,
    '&:hover': {
      backgroundColor: theme.palette.additional.drawer.hover,
    },
    [values.noZoomBoundary]: {
      paddingLeft: 24,
    }
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
  logOutItemButton: {
    paddingLeft: 20,
    [values.noZoomBoundary]: {
      paddingLeft: 24,
    }
  },
  logOutAvatar: {
    width: 32,
    height: 32,
    backgroundColor: theme.palette.primary.outlinedHoverBackground,
  },
  navigationTooltipItem: {
    paddingLeft: 16,
  },
}))

export default useStyles