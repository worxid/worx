// MUI STYLES
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
  header: {
    padding: 24,
  },
  headerTitle: {
    fontWeight: 500,
    flex: 1,
  },
  contents: {
    overflowY: 'auto',
  },
  contentForms: {
    overflowY: 'auto',
    padding: 24,
    '& .MuiGrid-item': {
      marginBottom: 32,
      '&:nth-last-child(-n+2)': {
        marginBottom: 0,
      }
    }
  },
  checkboxGroup: {
    '& .Mui-checked.Mui-disabled': {
      color: theme.palette.primary.main
    }
  },
  gridItemSeparator: {
    marginBottom: '18px !important'
  },
  textfieldDateAdornment: {
    color: 'rgba(0, 0, 0, 0.26)'
  },
  list: {
    padding: 0,
  },
  listItem: {
    padding: 0,
    width: 240
  },
  listFileAvatar: {
    color: theme.palette.text.secondary,
    maxWidth: 73,
  },
  listFileIcon: {
    height: 55,
    width: 47,
  },
  listItemText: {
    margin : 0,
    paddingLeft: 8,
    '& .MuiListItemText-primary': {
      color: theme.palette.text.secondary,
      fontSize: 12,
    },
    '& .MuiListItemText-secondary': {
      color: theme.palette.text.secondary,
      fontSize: 12,
    }
  },
  listImage: {
    width: 48,
    height: 48,
    objectFit: 'cover'
  },
  radioGroup: {
    '& .Mui-checked.Mui-disabled': {
      color: theme.palette.primary.main
    }
  },
}))

export default useStyles