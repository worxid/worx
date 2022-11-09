// MUI STYLES
import { makeStyles } from '@mui/styles'
          
const useStyles = makeStyles((theme) => ({
  pickerStyle: {
    width: '18px',
    height: '18px',
    cursor: 'pointer',
  },
  popOverDialog: {
    marginTop: 15,
  },
  colorWrap: {
    width: '198px',
    padding: '6px 0 0 6px',
    display: 'flex',
    flexWrap: 'wrap',
  },
  itemColor: {
    width: '18px',
    height: '18px',
    marginRight: '6px',
    marginBottom: '6px',
    cursor: 'pointer',
  },
}))
          
export default useStyles