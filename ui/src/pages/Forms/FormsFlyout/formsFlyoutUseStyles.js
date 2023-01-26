// MUI STYLES
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
  pagination: {
    marginTop: 12,
    '& .MuiPagination-ul': {
      justifyContent: 'center',
    },
    '& .MuiPaginationItem-root': {
      borderRadius: 0,
      padding: '0 2px',
      margin: 0,
      minWidth: 24,
    },
    '& .Mui-selected': {
      backgroundColor: 'transparent',
      borderBottom: `2px solid ${theme.palette.primary.main}`,
      borderRadius: 0,
      padding: '0 2px',
      margin: 0,
      minWidth: 24,
      '&:hover': {
        backgroundColor: 'transparent',
      },
    },
  },
}))

export default useStyles