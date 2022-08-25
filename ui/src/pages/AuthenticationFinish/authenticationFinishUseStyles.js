// CONSTANTS
import { values } from 'constants/values'

// MUI STYLES
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
  icon: {
    height: 100,
  },
  textTitle: {
    margin: '32px 0px 12px',
    fontFamily: values.fontFamilySpaceMono,
    fontWeight: 700,
  },
  buttonAction: {
    margin: '28px 0px 16px',
  },
  linkInsideText: {
    cursor: 'pointer',
    fontFamily: values.fontFamilySpaceMono,
    fontWeight: 700,
  },
}))

export default useStyles