// MUI STYLES
import { alpha } from '@mui/material/styles'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
  tabCustom: {
    backgroundColor: theme.palette.action.selected,
    '& .MuiButtonBase-root.MuiTab-root': {
      textTransform: 'none'
    },
    '& .MuiButtonBase-root.MuiTab-root.Mui-selected': {
      color: theme.palette.text.primary,
      backgroundColor: theme.palette.common.white
    }
  },
  contentsProperties: {
    padding: '10px 24px',
  },
  formControl: {
    marginBottom: 16,
    '&.formControlGrouped': {
      marginBottom: 24,
    },
    '& .MuiOutlinedInput-notchedOutline': {
      border: `2px solid ${theme.palette.action.selected}`
    },
    '& .MuiFormControlLabel-label': {
      fontSize: 14,
    }
  },
  buttonOutlinedPrimary: {
    color: theme.palette.primary.main,
    border: `2px solid ${theme.palette.primary.main}`,
    boxShadow: 'none',
    width: 160,
    '&:hover': {
      border: `2px solid ${theme.palette.primary.main}`,
      boxShadow: 'none',
    }
  },
  caseSmartphone: {
    backgroundColor: theme.palette.background.default,
    border: `6px solid ${theme.palette.common.black}`,
    borderRadius: 32,
    height: 620,
    width: 348,
    margin: '48px 20px 48px 20px',
    padding: '32px 26px 16px 26px'
  },
  lcdSmartphone: {
    background: theme.palette.common.white,
    border: `4px solid ${theme.palette.common.black}`,
    borderRadius: 12,
    width: '100%',
    overflowY: 'auto',
  },
  buttonSmartphone: {
    background: theme.palette.common.white,
    border: `8px solid ${theme.palette.common.black}`,
    borderRadius: 32,
    height: 26,
    width: 76,
    marginTop: 16,
  },
  headerSmartphone: {
    backgroundColor: theme.palette.primary.dark,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  barSmartphone: {
    padding: '8px 16px',
    color: theme.palette.common.white,
    lineHeight: 1,
  },
  headerForm: {
    backgroundColor: theme.palette.primary.main,
    padding: '12px 16px',
    color: theme.palette.common.white,
  },
  iconCircle: {
    color: alpha(theme.palette.common.white, 0.2)
  },
  descriptionForm: {
    backgroundColor: theme.palette.background.default,
    padding: '12px 16px'
  },
  contentSmartphone: {
    padding: '12px 0',
  },
  formControlMobile: {
    marginTop: 8,
    '& .MuiFormControlLabel-label': {
      fontSize: 12,
    },
  },
  buttonRedPrimary: {
    backgroundColor: alpha(theme.palette.primary.main, 0.1),
    boxShadow: 'none',
    border: 'none',
    borderRadius: 4,
    color: theme.palette.primary.main,
    fontWeight: 400,
    '&.buttonCamera': {
      marginRight: 20,
    },
    '&.buttonDateRange': {
      marginLeft: 12,
    },
    '&:hover': {
      backgroundColor: alpha(theme.palette.primary.main, 0.1),
      boxShadow: 'none'
    }
  },
  iconBar: {
    height: 16,
    width: 'auto'
  },
  separatorType: {
    borderWidth: 4,
    marginBottom: 12,
    backgroundColor: theme.palette.background.default,
  },
  opacityHalf: {
    opacity: 0.5,
  }
}))

export default useStyles