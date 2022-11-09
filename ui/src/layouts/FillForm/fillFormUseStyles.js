// MUI STYLES
import { alpha } from '@mui/material/styles'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '48px 20px 40px 20px',
    backgroundColor: theme.palette.background.default,
    minHeight: '100vh',
    [theme.breakpoints.down('md')]: {
      padding: '8px 8px 20px 8px',
    }
  },
  content: {
    maxWidth: 740,
    width: '100%',
    backgroundColor: theme.palette.common.white,
    padding: 0,
    flex: 0,
    [theme.breakpoints.down('sm')]: {
      flex: 1,
    }
  },
  footer: {
    marginTop: 40,
    maxWidth: 740,
    width: '100%',
    [theme.breakpoints.down('md')]: {
      marginTop: 20,
      padding: '0 8px'
    }
  },
  footerDescription: {
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  },
  footerLogo: {
    maxWidth: 88,
    [theme.breakpoints.down('md')]: {
      maxWidth: 60,
    }
  },
  buttonRedPrimary: {
    backgroundColor: alpha(theme.palette.primary.main, 0.1),
    boxShadow: 'none',
    border: 'none',
    borderRadius: 4,
    color: theme.palette.primary.main,
    fontWeight: 400,
    fontSize: 12,
    '&.buttonGetStarted': {
      border: `2px solid ${theme.palette.common.black}`,
      borderRadius: 0,
      marginLeft: 12,
    },
    '&:hover': {
      backgroundColor: alpha(theme.palette.primary.main, 0.1),
      boxShadow: 'none'
    },
    [theme.breakpoints.down('md')]: {
      '&.buttonGetStarted': {
        padding: '0 12px'
      }
    }
  },
}))

export default useStyles