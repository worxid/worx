// MUI STYLES
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    maxHeight: '100%',
    height: '100vh',
    width: '100%',
  },
  root: {
    height: '100%',
    padding: '125px 140px',
    [theme.breakpoints.down('lg')]: {
      padding: '100px 60px'
    },
    [theme.breakpoints.down('md')]: {
      padding: '60px 40px'
    },
    [theme.breakpoints.down('sm')]: {
      padding: '20px 24px'
    }
  },
  img: {
    height: '300px',
    maxWidth: '100%',
    marginBottom: 64,
    [theme.breakpoints.down('lg')]: {
      marginBottom: 52,
    },
    [theme.breakpoints.down('lg')]: {
      marginBottom: 36,
    },
    [theme.breakpoints.down('sm')]: {
      marginBottom: 28,
    }
  },
  title: {
    color: theme.palette.text.primary,
    textAlign: 'center',
    marginBottom: 16,

  },
  caption: {
    color: theme.palette.text.secondary,
    textAlign: 'center',
  },
}))

export default useStyles
