// MUI STYLES
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
  groupItem: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  menuSearchBox: {
    height: 52,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 24px',
    borderTop: `1px solid ${theme.palette.divider}`,
    borderBottom: `1px solid ${theme.palette.divider}`,
  }
}))

export default useStyles