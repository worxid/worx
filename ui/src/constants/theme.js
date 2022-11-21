// CONSTANTS
import { colors } from 'constants/colors'
import { values } from 'constants/values'

// MUIS
import { createTheme, responsiveFontSizes } from '@mui/material'

// COLOR AND TYPOGRAPHY STYLES
let customTheme = createTheme({
  palette: {
    primary: colors.primary,
    secondary: colors.secondary,
    error: colors.error,
    info: colors.info,
    warning: colors.warning,
    success: colors.success,
    text: colors.text,
    background: colors.background,
    additional: colors.additional,
  },
  typography: {
    fontFamily: values.fontFamilyDmMono,
  },
})

const customButtonStyles = {
  height: 48,
  border: `2px solid ${customTheme.palette.common.black}`,
  borderRadius: 0,
  boxShadow: `2px 2px 0px ${customTheme.palette.common.black}`,
  '&:hover': {
    boxShadow: `2px 2px 0px ${customTheme.palette.common.black},
      4px 4px 0px ${customTheme.palette.common.black}`,
  },
}

// COMPONENT STYLES
customTheme = createTheme(customTheme, {
  components: {
    // SORTED ALPHABETICALLY
    MuiAppBar:{
      defaultProps: {
        sx: {
          backgroundColor: 'unset',
          boxShadow: 'unset',
          color: customTheme.palette.text.primary,
          marginBottom: '24px',
        },
      },
    },
    MuiButton: {
      defaultProps: {
        sx: {
          fontFamily: values.fontFamilySpaceMono,
          fontWeight: 700,
          textTransform: 'none',
          ...customButtonStyles,
        },
      },
    },
    MuiFab: {
      defaultProps: {
        sx: {
          width: 48,
          ...customButtonStyles,
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
    MuiOutlinedInput: {
      defaultProps: {
        sx: {
          borderRadius: 0,
          fontSize: 14,
          height: 48,
          '& fieldset': {
            border: `2px solid ${customTheme.palette.common.black}`,
          },
        },
      },
    },
    MuiPaper: {
      defaultProps: {
        sx: {
          borderRadius: 0,
          boxShadow: customTheme.shadows[3],
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
    MuiToolbar: {
      defaultProps: {
        sx: {
          '&.MuiToolbar-root': {
            minHeight: 'unset',
            padding: 0,
          },
        },
      },
    },
  },
})

customTheme = responsiveFontSizes(customTheme)

export default customTheme