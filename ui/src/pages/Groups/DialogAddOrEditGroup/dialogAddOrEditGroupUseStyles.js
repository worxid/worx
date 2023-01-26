// MUI STYLES
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
  colorPicker: {
    width: 18,
    height: 18,
    cursor: 'pointer',
    marginRight: 8,
  },
  colorPickerMenu: {
    marginTop: 12,
  },
  colorWrap: {
    width: 200,
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingLeft: 4,
  },
  itemColor: {
    width: 18,
    height: 18,
    marginRight: 6,
    marginBottom: 6,
    cursor: 'pointer',
  },
  autocomplete: {
    marginTop: 12,
  },
  autocompleteListItem: {
    padding: '0px 4px',
    '& .MuiListItemIcon-root': {
      minWidth: 'unset',
      marginRight: 4,
    },
  },
}))

export default useStyles