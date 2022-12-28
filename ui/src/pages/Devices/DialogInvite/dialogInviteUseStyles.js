// MUI STYLES
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiPaper-root': {
      width: 400,
      height: 'auto !important',
    }
  },
  content: {
    padding: 24,
    minHeight: 280,
    [theme.breakpoints.down('sm')]: {
      padding: 20,
    }
  },
  footer: {
    borderTop: `3px solid ${theme.palette.common.black}`,
    padding: '12px 24px',
    [theme.breakpoints.down('sm')]: {
      padding: 20,
    }
  },
  exportLoadingText: {
    fontSize: 14,
    fontWeight: 400,
    lineHeight: '23.24px',
    color: theme.palette.text.disabled,
  },
  loading: {
    width: '20px !important',
    height: '20px !important',
  },
}))

export default useStyles