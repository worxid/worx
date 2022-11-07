// MUI STYLES
import { alpha } from '@mui/material/styles'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
  dialogShareLink: {
    '& .MuiPaper-root': {
      width: 504,
      height: 'auto !important',
    }
  },
  content: {
    padding: 24,
    [theme.breakpoints.down('sm')]: {
      padding: 20,
    }
  },
  buttonRedPrimary: {
    boxShadow: 'none',
    fontWeight: 400,
    fontSize: 12,
    height: 36,
    minHeight: 36,
    '&:hover': {
      boxShadow: 'none'
    },
    '&.Mui-disabled': {
      backgroundColor: theme.palette.primary.main,
    }
  },
  buttonRedLight: {
    backgroundColor: theme.palette.primary.outlinedHoverBackground,
    color: theme.palette.primary.main,
    fontWeight: 400,
    fontSize: 12,
    boxShadow: 'none',
    '&:hover': {
      backgroundColor: theme.palette.primary.outlinedHoverBackground,
      boxShadow: 'none'
    }
  },
  inputEmailAutocomplete: {
    maxWidth: '100%',
    flex: 1,
    '& .MuiInputBase-input': {
      fontSize: 12,
    },
    '& .MuiChip-root': {
      borderRadius: 0,
      backgroundColor: alpha(theme.palette.common.black, 0.12),
      fontSize: 12,
    },
    '& .MuiInputBase-root': {
      height: 'auto',
      '&::placeholder': {
        fontSize: 12,
      }
    },
    '& .MuiFormLabel-root': {
      fontSize: 12,
    },
    '& .MuiOutlinedInput-notchedOutline': {
      border: `1.5px solid ${alpha(theme.palette.common.black, 0.08)}`,
      fontSize: 12,
    }
  },
  dividerContent: {
    margin: '0 24px'
  },
  boxLink: {
    border: `1.5px solid ${alpha(theme.palette.common.black, 0.08)}`,
    padding: '8px 16px',
    maxWidth: 344,
    [theme.breakpoints.down('sm')]: {
      maxWidth: '100%',
    }
  },
  iconLink: {
    color: theme.palette.text.secondary,
    marginRight: 12,
  },
  tabs: {
    borderBottom: `1px solid ${alpha(theme.palette.common.black, 0.12)}`,
    '& .MuiButtonBase-root': {
      textTransform: 'capitalize',
      minHeight: 'auto',
      paddingLeft: 24,
      paddingRight: 24,
    },
    [theme.breakpoints.down('sm')]: {
      borderTop: `1px solid ${alpha(theme.palette.common.black, 0.12)}`,
    }
  },
  footer: {
    padding: 24,
    [theme.breakpoints.down('sm')]: {
      padding: 20,
    }
  },
  buttonSocialMedia: {
    marginRight: 12,
    height: 18,
    '& circle': {
      fill: alpha(theme.palette.common.black, 0.7),
    }
  },
  buttonQrCode: {
    width: 96,
    fontSize: 12,
    height: 32,
    border: 'none',
    boxShadow: 'none',
    color: theme.palette.common.black,
    fontWeight: 400,
    '&:hover': {
      boxShadow: 'none',
      backgroundColor: 'transparent'
    }
  },
  inputWrap: {
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    }
  },
  actionWrap: {
    paddingLeft: 12,
    [theme.breakpoints.down('sm')]: {
      paddingTop: 24,
      alignItems: 'flex-end',
      flex: 1,
      width: '100%'
    }
  }
}))

export default useStyles