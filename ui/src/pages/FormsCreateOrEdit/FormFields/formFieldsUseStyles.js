// MUI STYLES
import { alpha } from '@mui/material/styles'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
  header: {
    padding: '20px 24px'
  },
  informationWrap: {
    width: 370,
    textAlign: 'center',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    padding: '0 8px'
  },
  informationTitle: {
    marginBottom: 8,
  },
  listFieldsWrap: {
    height: '100%',
    position: 'relative',
    overflowY: 'auto',
  },
  listItem: {
    backgroundColor: 'transparent',
    border: 'none',
    padding: 0,
    marginBottom: 12,
    '&:last-child': {
      marginBottom: 0,
    }
  },
  listItemButton: {
    border: `1px solid ${theme.palette.text.primary}`,
    '&.Mui-selected': {
      boxShadow: `2px 2px 0px ${theme.palette.text.primary}`,
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
      '& .MuiSvgIcon-root': {
        color: theme.palette.common.white
      },
      '&:hover': {
        backgroundColor: theme.palette.primary.light
      }
    }
  },
  listItemIcon: {
    minWidth: 'auto',
    paddingRight: 16,
  },
  reactSortable: {
    minHeight: '100%',
    overflowY: 'auto',
    padding: '22px'
  },
  boxFormHeader: {
    padding: '4px 16px',
    '& .MuiAlert-message': {
      padding: 0,
    },
    '& .MuiAlertTitle-root': {
      margin: 0,
      fontSize: 14,
      lineHeight: 1.4
    }
  },
  formDescription: {
    color: alpha(theme.palette.common.white, 0.54)
  }
}))

export default useStyles