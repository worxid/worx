// CONSTANTS
import { values } from 'constants/values'

// MUIS
import MuiGlobalStyles from '@mui/material/GlobalStyles'
import { alpha } from '@mui/material/styles'

const GlobalStyles = () => {
  const zoomValue = 0.85

  return (
    <MuiGlobalStyles
      styles={(theme) => ({
        // ALL ELEMENTS
        '*, *::before, *::after': {
          boxSizing: 'border-box',
          fontFamily: values.fontFamilyDmMono,
          shapeRendering: 'geometricPrecision',
          textRendering: 'geometricPrecision',
          imageRendering: 'optimizeQuality',
          fillRule: 'evenodd',
          clipRule: 'evenodd',
        },

        // GENERAL
        '.backgroundColorPrimaryMain': {
          backgroundColor: theme.palette.primary.main,
        },
        '.borderRadius0': {
          borderRadius: 0,
        },
        '.colorTextPrimary': {
          color: theme.palette.text.primary,
        },
        '.colorTextSecondary': {
          color: theme.palette.text.secondary,
        },
        '.cursorPointer': {
          cursor: 'pointer !important',
        },
        '.displayBlock': {
          display: 'block'
        },
        '.flexDirectionRow': {
          flexDirection: 'row !important',
        },
        '.fontFamilySpaceMono': {
          fontFamily: `${values.fontFamilySpaceMono} !important`,
        },
        '.fontWeight500': {
          fontWeight: '500 !important',
        },
        '.heightFitContent': {
          height: 'fit-content'
        },
        '.marginBottom0': {
          marginBottom: 0,
        },
        '.marginBottom12': {
          marginBottom: 12,
        },
        '.marginRightAuto': {
          marginRight: 'auto !important',
        },
        '.overflowXhidden': {
          overflowX: 'hidden !important'
        },
        '.overflowYauto': {
          overflowY: 'auto !important'
        },
        '.padding0': {
          padding: '0 !important',
        },
        '.paddingX8': {
          paddingLeft: 8,
          paddingRight: 8,
        },
        '.paddingX16': {
          paddingLeft: 16,
          paddingRight: 16,
        },
        '.textCenter': {
          textAlign: 'center'
        },
        '.width100': {
          width: '100%',
        },

        // SCROLLBAR
        '&::-webkit-scrollbar': {
          width: 5,
          height: 5,
          backgroundColor: alpha('#000000', 0.16),
        },
        '&::-webkit-scrollbar-thumb': {
          width: 5,
          height: 5,
          backgroundColor: alpha('#000000', 0.2),
        },

        // ZOOM
        '@media only screen and (max-height: 820px)': {
          'body': {
            zoom: zoomValue,
          },
          '.zoom': {
            zoom: zoomValue,
          },
          '.no-zoom': {
            zoom: 1 / zoomValue,
          },
        },
      })}
    />
  )
}

export default GlobalStyles