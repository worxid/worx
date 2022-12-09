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
    margin: '24px 0px',
  },
}))

export default useStyles