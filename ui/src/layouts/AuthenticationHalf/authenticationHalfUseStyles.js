// CONSTANTS
import { values } from 'constants/values'

// MUI STYLES
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  contentSide: {
    position: 'relative',
    backgroundColor: theme.palette.primary.main,
    borderRight: `3px solid ${theme.palette.common.black}`,
  },
  containerText: {
    marginTop: 152,
    width: '80%',
    margin: '10%',
  },
  text: {
    color: theme.palette.common.white,
    fontFamily: values.fontFamilySpaceMono,
  },
  textTitle: {
    fontWeight: 700,
    marginBottom: 12,
  },
  pictureComplementary: {
    width: '92%',
    alignSelf: 'flex-end',
  },
  contentMain: {
    alignItems: 'center',
    margin: '60px 0px',
  },
}))

export default useStyles