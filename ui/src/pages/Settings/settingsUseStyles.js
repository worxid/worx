// MUI STYLES
import { alpha } from '@mui/material/styles'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
  subtitle: {
    marginTop: 24,
    marginBottom: 24,
  },
  mainContent: {
    padding: 24,
    overflow: 'auto'
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
    minWidth: 68,
    minHeight: 68,
    height: 92,
    width: 92,
    borderRadius: 4,
    marginRight: 28,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px dashed #020202',
    position: 'relative',
    backgroundColor: alpha(theme.palette.common.black, 0.14),
    padding: 8,
  },
  buttonDeletelogo: {
    position: 'absolute',
    top: -20,
    right: -20,
    color: theme.palette.primary.main
  },
  iconAddLogo: {
    width: 14,
    height: 14
  },
  imagePreview: {
    width: '100%',
    height: '100%'
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
    fontWeight: 700,
    display: 'flex',
    alignSelf: 'flex-end',
    '&.Mui-disabled': {
      color: `${alpha(theme.palette.common.black, 0.38)}`,
      backgroundColor: `${alpha(theme.palette.common.black, 0.08)}`,
    }
  },
  tabs: {
    alignItems: 'center',
    '& .Mui-selected': {
      fontSize: 14,
      fontWeight: 400,
      color: '#2F2F30',
      lineHeight: '20px',
      letterSpacing: '0.15px',
      backgroundColor: theme.palette.common.white,
    },
  },
  tab: {
    minHeight: 68,
    minWidth: 222,
    textTransform: 'capitalize',
    fontSize: 14,
    fontWeight: 500,
    lineHeight: '20px',
    letterSpacing: '0.15px',
    color: `${alpha(theme.palette.common.black, 0.54)}`,
    backgroundColor: `${alpha(theme.palette.common.black, 0.08)}`,
  }
}))

export default useStyles