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
    width: 90,
    padding: '4px 4px',
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
    maxWidth: 348,
    flex: 1,
    '& .MuiInputBase-input': {
      fontSize: 12,
    },
    '& .MuiOutlinedInput-root': {
      paddingTop: 3.2,
      paddingBottom: 3.2,
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
      top: -4,
    },
    '& .MuiFormLabel-root[data-shrink="true"]': {
      top: 0
    },
    '& .MuiOutlinedInput-notchedOutline': {
      border: `1.5px solid ${alpha(theme.palette.common.black, 0.08)}`,
      fontSize: 12,
    },
    [theme.breakpoints.down('sm')]: {
      maxWidth: '100%',
    }
  },
  dividerContent: {
    margin: '0 24px'
  },
  boxLink: {
    border: `1.5px solid ${alpha(theme.palette.common.black, 0.08)}`,
    padding: '8px 16px',
    width: '100%',
    maxWidth: 348,
    [theme.breakpoints.down('sm')]: {
      maxWidth: '100%',
    }
  },
  iconLink: {
    color: theme.palette.text.secondary,
    marginRight: 12,
  },
  tabs: {
    minHeight: 39,
    borderBottom: `1px solid ${alpha(theme.palette.common.black, 0.12)}`,
    '& .MuiButtonBase-root': {
      textTransform: 'capitalize',
      minHeight: 'auto',
      paddingLeft: 24,
      paddingRight: 24,
    },
    [theme.breakpoints.down('sm')]: {
      borderTop: `1px solid ${alpha(theme.palette.common.black, 0.12)}`,
      '& .MuiButtonBase-root': {
        paddingLeft: 20,
        paddingRight: 20,
      },
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
    width: '100%',
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