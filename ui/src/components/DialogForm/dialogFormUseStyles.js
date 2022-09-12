// MUI STYLES
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
  dialogForm: {
    '& .MuiDialog-paper': {
      width: 400,
      height: '550px !important',
      border: `3px solid ${theme.palette.text.primary}`
    }
  },
  dialogFormTitle: {
    fontSize: 16
  },
  dialogFormActions: {
    borderTop: `3px solid ${theme.palette.text.primary}`,
    width: '100%',
    padding: 12
  },
}))

export default useStyles