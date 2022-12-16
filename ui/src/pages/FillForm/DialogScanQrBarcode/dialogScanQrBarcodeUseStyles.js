// MUI STYLES
import { alpha } from '@mui/material/styles'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
  dialogCamera: {
    '& .MuiDialog-paper': {
      maxWidth: '100%',
      width: '100%',
      height: '100vh !important',
      margin: 0,
      maxHeight: '100%',
    }
  },
}))

export default useStyles