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
    '&:hover': {
      boxShadow: 'none'
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
    '& .MuiOutlinedInput-notchedOutline': {
      border: `1.5px solid ${alpha(theme.palette.common.black, 0.08)}`
    }
  },
  dividerContent: {
    margin: '0 24px'
  },
  boxLink: {
    border: `1.5px solid ${alpha(theme.palette.common.black, 0.08)}`,
    padding: '8px 16px',
    maxWidth: 344,
  },
  iconLink: {
    color: theme.palette.text.secondary,
    marginRight: 12,
  }
}))

export default useStyles