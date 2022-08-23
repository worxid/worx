// CONSTANTS
import { colors } from 'constants/colors'
import { values } from 'constants/values'

// MUIS
import { createTheme, responsiveFontSizes } from '@mui/material'

let customTheme = createTheme({
  palette: {
    primary: colors.primary,
    secondary: colors.secondary,
    error: colors.error,
    info: colors.info,
    warning: colors.warning,
    success: colors.success,
    text: colors.text,
  },
  typography: {
    fontFamily: values.fontFamilyDmMono,
  },
})

customTheme = createTheme(customTheme, {
  components: {
    MuiButton: {
      defaultProps: {
        sx: {
          border: `2px solid ${customTheme.palette.common.black}`,
          borderRadius: 0,
          height: 48,
          fontFamily: values.fontFamilySpaceMono,
          fontWeight: 700,
          textTransform: 'none',
          boxShadow: `2px 2px 0px ${customTheme.palette.common.black}`,
          '&:hover': {
            boxShadow: `2px 2px 0px ${customTheme.palette.common.black},
              4px 4px 0px ${customTheme.palette.common.black}`,
          },
        },
      },
    },
    MuiFormHelperText: {
      defaultProps: {
        sx: {
          height: '24px',
          marginTop: 0,
        },
      },
    },
    MuiInputLabel: {
      defaultProps: {
        sx: {
          fontSize: 14,
        },
      },
    },
    MuiOutlinedInput: {
      defaultProps: {
        sx: {
          fontSize: 14,
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        sx: {
          fontSize: 14,
          '& .MuiInputBase-input': {
            fontSize: 14,
          },
          '& .MuiInputLabel-root': {
            fontSize: 14,
          },
        },
      },
    },
  },
})

customTheme = responsiveFontSizes(customTheme)

export default customTheme