// CONSTANTS
import { values } from 'constants/values'

// MUIS
import MuiGlobalStyles from '@mui/material/GlobalStyles'
import { alpha } from '@mui/material/styles'

const GlobalStyles = () => {
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
          pageBreakInside: 'avoid'
        },

        // CONTENT CONTAINER
        '.contentContainer': {
          transition: 'all 0.25s ease-in-out',
        },

        // EDIT ITEM
        '.editIcon': {
          visibility: 'hidden',
        },
        '.editIconContainer': {
          '&:hover': {
            '.editIcon': {
              visibility: 'visible',
            },
          },
        },

        // GENERAL
        '.backgroundColorPrimaryMain': {
          backgroundColor: theme.palette.primary.main,
        },
        '.borderRadius0': {
          borderRadius: 0,
        },
        '.borderBottomDivider': {
          borderBottom: `1px solid ${theme.palette.divider}`,
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
        '.displayNone': {
          display: 'none'
        },
        '.flexDirectionRow': {
          flexDirection: 'row !important',
        },
        '.fontFamilySpaceMono': {
          fontFamily: `${values.fontFamilySpaceMono} !important`,
        },
        '.fontWeight400': {
          fontWeight: '400 !important',
        },
        '.fontWeight500': {
          fontWeight: '500 !important',
        },
        '.fontWeight600': {
          fontWeight: '600 !important',
        },
        '.fontWeight700': {
          fontWeight: '700 !important',
        },
        '.heightFitContent': {
          height: 'fit-content'
        },
        '.marginBottom0': {
          marginBottom: 0,
        },
        '.marginRightAuto': {
          marginRight: 'auto !important',
        },
        '.marginTopAuto': {
          marginTop: 'auto !important',
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
        '.textCapitalize': {
          textTransform: 'lowercase',
          '&:first-letter': {
            textTransform: 'capitalize'
          },
        },
        '.whiteSpacePreWrap': {
          whiteSpace: 'pre-wrap'
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
        [values.zoomBoundary]: {
          'body': {
            zoom: values.zoomValue,
          },
          // AUTOCOMPLETE PURE
          '.neutralize-zoom-autocomplete': {
            '& .MuiInputBase-root': {
              height: '44px !important',
            },
            '& .MuiInputBase-input': {
              zoom: values.zoomValue,
            },
            '& .MuiOutlinedInput-notchedOutline': {
              borderWidth: 1.5,
            },
            '& .MuiFormLabel-root': {
              zoom: values.zoomValue,
            },
            '& legend': {
              zoom: values.zoomValue,
            },
            '& .MuiButtonBase-root': {
              zoom: values.zoomValue,
            }
          },
          '.MuiAutocomplete-popper': {
            zoom: 1 / values.zoomValue,
          },
          '.MuiAutocomplete-popper ul': {
            zoom: values.zoomValue,
          },
          '.MuiAutocomplete-popper li': {
            zoom: values.zoomValue,
          },
          '.neutralize-dialog-form': {
            zoom: 1 / values.zoomValue,
            '& .MuiDialogTitle-root': {
              zoom: values.zoomValue,
            },
            '& .MuiDialogActions-root': {
              zoom: values.zoomValue,
            }
          },
          '.neutralize-zoom-select': {
            '& .MuiSelect-select': {
              zoom: 1 / values.zoomValue,
            },
            '& .MuiChip-root': {
              zoom: values.zoomValue,
            }
          },
          '.neutralize-zoom-select-menu': {
            '& .MuiPaper-root': {
              zoom: 1 / values.zoomValue,
              width: 'auto',
            },
            '& .MuiList-root': {
              zoom: values.zoomValue,
            },
            '& .MuiList-root li': {
              zoom: values.zoomValue,
            }
          },
          '.neutralize-zoom-sortable': {
            zoom: 1 / values.zoomValue,
            '& .sortable-ghost': {
              zoom: values.zoomValue,
            },
          },
          '.neutralize-zoom-menu': {
            '& .MuiPaper-root': {
              zoom: 1 / values.zoomValue,
            },
            '& .MuiList-root': {
              zoom: values.zoomValue,
            }
          },
          '.neutralize-zoom-tooltip': {
            zoom: 1 / values.zoomValue,
            '& .MuiIconButton-root .MuiSvgIcon-root': {
              zoom: values.zoomValue,
            }
          },
          '.zoom': {
            zoom: values.zoomValue,
          },
          '.no-zoom': {
            zoom: 1 / values.zoomValue,
          },
          '& [id^="choosestroke-action-"]': {
            zoom: 1/values.zoomValue,
            '& .MuiTooltip-tooltip': {
              zoom: values.zoomValue
            }
          },
          '& [id^="canvastool-action-"]': {
            zoom: 1/values.zoomValue,
            '& .MuiTooltip-tooltip': {
              zoom: values.zoomValue
            }
          },
          '& [id^="choosecolor-action-"]': {
            zoom: 1/values.zoomValue,
            '& .MuiTooltip-tooltip': {
              zoom: values.zoomValue
            }
          }
        },
      })}
    />
  )
}

export default GlobalStyles