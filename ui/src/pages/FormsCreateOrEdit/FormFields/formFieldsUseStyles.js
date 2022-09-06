// MUI STYLES
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
  header: {
    padding: '20px 24px'
  },
  formFieldsTitle: {
    backgroundColor: theme.palette.primary.main,
    padding: '12px 25px',
  },
  informationWrap: {
    width: 370,
    textAlign: 'center',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
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
    padding: '8px 0',
    '&:last-child': {
      paddingBottom: 0,
    }
  },
  listItemButton: {
    padding: '14px 18px',
    border: `1px solid ${theme.palette.text.primary}`,
    '&.Mui-selected': {
      boxShadow: `2px 2px 0px ${theme.palette.text.primary}`,
      backgroundColor: theme.palette.primary.main,
      color: '#FFFFFF',
      '& .MuiSvgIcon-root': {
        color: '#FFFFFF'
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
  icon: {
    color: theme.palette.text.primary
  }
}))

export default useStyles