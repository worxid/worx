// MUI STYLES
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    margin: -24,
    padding: 24,
    backgroundColor: theme.palette.background.paper,
    flex: 1,
  },
  title: {
    height: 48,
    display: 'flex',
    alignItems: 'center',
    marginBottom: 24,
  },
  divider: {
    margin: '0px -24px',
  },
}))

export default useStyles