// MUI STYLES
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
  iconStatusSize: {
    height: 16,
    width: 16
  },
  menuChangeGroup: {
    '& .MuiList-root': {
      width: 760,
    }
  }
}))

export default useStyles