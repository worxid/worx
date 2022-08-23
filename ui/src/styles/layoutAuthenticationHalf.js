// CONSTANTS
import { values } from 'constants/values'

// MUI STYLES
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  textTitle: {
    fontWeight: 700,
    fontFamily: values.fontFamilySpaceMono,
    marginBottom: 40,
  },
  textLink: {
    alignSelf: 'flex-end',
    fontWeight: 700,
    fontFamily: values.fontFamilySpaceMono,
  },
  buttonAction: {
    margin: '24px 0px',
  },
}))

export default useStyles