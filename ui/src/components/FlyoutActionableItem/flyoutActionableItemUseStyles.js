// MUIS
import { grey } from '@mui/material/colors'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 4,
    border: `1px solid ${theme.palette.action.disabled}`,
  },
  iconContainer: {
    backgroundColor: grey[200],
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 32,
    height: 32,
    borderRadius: 4,
    minWidth: 'unset',
    marginRight: 16,
  },
  icon: {
    color: theme.palette.action.active,
  },
}))

export default useStyles