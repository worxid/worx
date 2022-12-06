// MUIS
import { createTheme } from '@mui/material/styles'

// THEME
import customTheme from 'constants/theme'

const themeMobilePreview = createTheme(customTheme, {
  components: {
    MuiButton: {
      defaultProps: {
        sx: {
          fontSize: 12,
        }
      }
    },
    MuiFormControl: {
      defaultProps: {
        sx: {
          fontSize: 12,
          '& .MuiFormLabel-root': {
            fontSize: 12,
          },
        },
      },
    },
    MuiFormControlLabel: {
      defaultProps: {
        sx: {
          '& .MuiTypography-root': {
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            width: 216,
          }
        }
      }
    },
    MuiPaper: {
      defaultProps: {
        sx: {
          width: 244,
        },
      },
    },
    MuiSelect: {
      defaultProps: {
        sx: {
          fontSize: 12,
          '& .MuiSelect-nativeInput': {
            fontSize: 12,
            '&::placeholder': {
              fontSize: 12,
            }
          },
          '& .MuiFormLabel-root': {
            fontSize: 12,
          },
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        sx: {
          fontSize: 12,
          '& .MuiInputBase-input': {
            fontSize: 12,
            '&::placeholder': {
              fontSize: 12,
            }
          },
          '& .MuiInputLabel-root': {
            fontSize: 12,
          },
        },
      },
    },
  }
})

export default themeMobilePreview