// MUI STYLES
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
  leftAction: {
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