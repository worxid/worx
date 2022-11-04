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
    maxWidth: 344,
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
    width: '100%',
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
    }
  },
  footer: {
    padding: 24,
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
  }
}))

export default useStyles