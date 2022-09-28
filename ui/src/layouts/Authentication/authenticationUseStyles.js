// MUI STYLES
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.common.black}`,
    padding: 28,
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 0,
    backgroundColor: theme.palette.common.white,
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    maxWidth: 1400,
  },
  content: {
    width: '100%',
    maxWidth: 480,
    padding: '40px 0px',
  },
}))

export default useStyles