// MUI STYLES
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
  fab: {
    marginRight: 12,
  },
  search: {
    overflow: 'hidden',
    marginLeft: 'auto',
  },
  searchInputWide: {
    width: 250,
    transition: 'width 0.25s ease-in-out',
  },
  searchInputNarrow: {
    width: 0,
    transition: 'width 0.25s ease-in-out',
  },
}))

export default useStyles