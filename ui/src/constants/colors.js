// MUIS
import { alpha } from '@mui/material/styles'

const black = '#000000'
const white = '#FFFFFF'

export const colors = {
  // PRIMARY (RED)
  primary: {
    main: '#DA3630',
    light: '#F46A65',
    dark: '#B73A3B',
    contrastText: white,
    containedHoverBackground: '#A12B2C',
    outlinedHoverBackground: alpha('#DA3630', 0.1),
    outlinedRestingBackground: alpha('#DA3630', 0.5),
  },
  // SECONDARY (YELLOW)
  secondary: {
    main: '#F8CA45',
    light: '#FCDC81',
    dark: '#D9A614',
    contrastText: white,
    containedHoverBackground: '#98740E',
    outlinedHoverBackground: alpha('#F8CA45', 0.1),
    outlinedRestingHover: alpha('#F8CA45', 0.5),
  },
  // ERROR (RED)
  error: {
    main: '#F44336',
    dark: '#E31B0C',
    light: '#F88078',
    contrastText: white,
    containedHoverBackground: '#AB2F26',
    outlinedHoverBackground: alpha('#F44336', 0.08),
    outlinedRestingBorder: alpha('#F44336', 0.5),
    content: '#621B16',
    background: '#FEECEB',
  },
  // INFO (BLUE)
  info: {
    main: '#2196F3',
    dark: '#0B79D0',
    light: '#64B6F7',
    contrastText: white,
    containedHoverBackground: '#1769AA',
    outlinedRestingBorder: alpha('#2196F3', 0.50),
    outlinedHoverBackground: alpha('#2196F3', 0.08),
    content: '#0D3C61',
    background: '#E9F5FE',
  },
  // WARNING (DARK ORANGE)
  warning: {
    main: '#ED6C02',
    dark: '#C77700',
    light: '#FFB547',
    contrastText: white,
    containedHover: '#A64C01',
    outlinedRestingBorder: alpha('#ED6C02', 0.50),
    outlinedHoverBackground: alpha('#ED6C02', 0.08),
    content: '#5F2B01',
    background: '#FDF0E6',
  },
  // SUCCESS (GREEN)
  success: {
    main: '#4CAF50',
    dark: '#3B873E',
    light: '#7BC67E',
    contrastText: white,
    containedHoverBackground: '#357A38',
    outlinedRestingBorder: alpha('#4CAF50', 0.50),
    outlinedHoverBackground: alpha('#4CAF50', 0.08),
    content: '#1E4620',
    background: '#EDF7ED',
  },
  // TEXT (BLACK)
  text: {
    primary: black,
    secondary: alpha(black, 0.54),
    disabled: alpha(black, 0.3),
  },
  // ADDTIONAL COLLECTIONS
  additional: {
    // DRAWER
    drawer: {
      background: '#1E1E1E',
      contentInactive: '#A7A8BB',
      contentActive: white,
      hover: '#282828',
    },
  },
}