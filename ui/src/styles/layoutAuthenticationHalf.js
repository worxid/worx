// CONSTANTS
import { values } from 'constants/values'

// MUI STYLES
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
  textTitle: {
    fontWeight: 700,
    fontFamily: values.fontFamilySpaceMono,
    marginBottom: 40,
  },
  buttonAction: {
    margin: '24px 0px',
  },
}))

export default useStyles