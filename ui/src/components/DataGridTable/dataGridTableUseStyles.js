// MUIS
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
  columnUnsortedIconAsc: {
    width: 18,
    height: 18,
    transform: 'rotate(0deg)',
    transition: 'transform 0.25s ease-in-out',
  },
  columnUnsortedIconDesc: {
    transform: 'rotate(180deg)',
  },
  columnSortedIconAsc: {
    color: theme.palette.primary.main,
    transform: 'rotate(0deg)',
  },
  columnSortedIconDesc: {
    color: theme.palette.primary.main,
    transform: 'rotate(180deg)',
  },
  columnFilter: {
    marginBottom: 10,
    '& .MuiInput-root:before': {
      borderBottom: `1px solid ${theme.palette.divider}`,
    },
  },
}))

export default useStyles