// MUI STYLES
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
  fab: {
    marginRight: 24,
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
  flyoutTitle: {
    display: 'none',
  },
  flyoutTitleShown: {
    display: 'unset',
    marginLeft: 24,
  },
  flyoutInitialToggle: {
    transform: 'rotate(-180deg)',
    transition: 'transform 0.25s ease-in-out',
  },
  flyoutRotateToggle: {
    transform: 'rotate(0deg)',
    transition: 'transform 0.25s ease-in-out',
  },
}))

export default useStyles