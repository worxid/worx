// MUI STYLES
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
  subtitle: {
    marginTop: 24,
    marginBottom: 40,
  },
  mainContent: {
    padding: '28px'
  },
  dashboardLogoInfo: {
    marginTop: 8
  },
  infoLogo: {
    fontSize: 12,
    lineHeight: '20px',
    letterSpacing: '0.4px',
    marginBottom: 12,
  },
  boxAddLogo: {
    width: 68,
    height: 68,
    borderRadius: 4,
    marginRight: 28,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px dashed #020202',
  },
  iconAddLogo: {
    width: 14,
    height: 14
  },
  buttonUpload: {
    height: 28,
    width: '50%',
    marginTop: -4,
    fontSize: 14,
    fontWeight: 400,
    lineHeight: '20.02px',
    letterSpacing: '0.15px',
    border: 'none',
    color: '#236FFF',
    boxShadow: 'none',
    '&:hover': {
      border: 'none',
      boxShadow: 'none',
      backgroundColor: theme.palette.common.white,
    },
    '& .MuiButton-startIcon': {
      color: '#236FFF',
      marginLeft: -28,
    },
  },
  buttonAction: {
    height: 48,
    minWidth: 168,
    marginTop: -12,
    display: 'flex',
    alignSelf: 'flex-end',
  }
}))

export default useStyles