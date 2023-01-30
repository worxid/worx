// MUI STYLES
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiList-root': {
      width: 452,
      padding: 0,
    },
  },
  list: {
    maxHeight: 400,
    overflow: 'auto',
  },
  actions: {
    borderTop: `1px solid ${theme.palette.action.active}`,
    padding: 12,
  },
}))

export default useStyles