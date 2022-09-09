// MUI STYLES
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
  iconAndFormControlContainer: {
    display: 'flex',
    alignItems: 'flex-end',
    height: 65,
    width: '100%',
    flex: '0 0 65px',
  },
  iconFormControl: {
    marginRight: 12,
    marginBottom: 2,
    color: theme.palette.text.secondary,
  },
  formControl: {
    width: '100%',
  },
}))

export default useStyles