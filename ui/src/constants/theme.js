// CONSTANTS
import { colors } from 'constants/colors'
import { values } from 'constants/values'

// MUIS
import { createTheme, responsiveFontSizes } from '@mui/material'

let customThemePrivate = createTheme({
  components: {
    MuiFilledInput: {
      defaultProps: {
        sx: {
          fontSize: 14,
        },
      },
    },
    MuiInput: {
      defaultProps: {
        sx: {
          fontSize: 14,
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
    MuiListItemText: {
      defaultProps: {
        sx: {
          '& .MuiTypography-root': {
            fontSize: 14,
          },
        },
      },
    },
    MuiMenuItem: {
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

customThemePrivate = responsiveFontSizes(customThemePrivate)

export default customThemePrivate