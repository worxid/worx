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
}))

export default useStyles