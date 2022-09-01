import { useState } from 'react'
import PropTypes from 'prop-types'

// CUSTOM COMPONENTS
import CustomTooltip from 'components/Customs/CustomTooltip'

// MUIS
import MuiAppBar from '@mui/material/AppBar'
import Fab from '@mui/material/Fab'
import IconButton from '@mui/material/IconButton'
import Input from '@mui/material/Input'
import InputAdornment from '@mui/material/InputAdornment'
import Stack from '@mui/material/Stack'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'

// MUI ICONS
import IconAdd from '@mui/icons-material/Add'
import IconClose from '@mui/icons-material/Close'
import IconKeyboardTab from '@mui/icons-material/KeyboardTab'
import IconSearch from '@mui/icons-material/Search'

// STYLES
import useStyles from './appBarUseStyles'

const AppBar = (props) => {
  const {
    // FAB
    hasFab,
    // TITLE
    pageTitle,
    // SEARCH
    hasSearch,
    search, setSearch,
    // FLYOUT
    hasFlyout,
    isFlyoutShown,
    flyoutTitle,
    flyoutTitleMargin,
    onToggleFlyoutClick,
  } = props

  const classes = useStyles()

  const [ isSearchOpen, setIsSearchOpen ] = useState(false)

  return (
    <MuiAppBar 
      position='relative' 
      className='zoom'
    >
      <Toolbar>
        {/* FAB */}
        {hasFab &&
        <Fab 
          color='primary'
          className={classes.fab}
        >
          <IconAdd/>
        </Fab>}

        {/* TITLE */}
        <Typography 
          variant='h6' 
          className='marginRightAuto'
        >
          {pageTitle}
        </Typography>

        {/* SEARCH */}
        {hasSearch &&
        <Stack 
          direction='row'
          className={classes.search}
        >
          {/* SEARCH ICON */}
          <CustomTooltip
            title='Search'
            placement='bottom'
          >
            <IconButton onClick={() => setIsSearchOpen(true)}>
              <IconSearch/>
            </IconButton>
          </CustomTooltip>

          {/* SEARCH INPUT */}
          <Input 
            className={isSearchOpen ? classes.searchInputWide : classes.searchInputNarrow}
            placeholder='Search'
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            endAdornment={
              // ICON CLOSE
              <InputAdornment position='end'>
                <IconClose
                  onClick={() => setIsSearchOpen(false)}
                  className='cursorPointer'
                />
              </InputAdornment>
            }
          />
        </Stack>}

        {/* FLYOUT TITLE */}
        {hasFlyout &&
        <Typography
          variant='h6'
          className={isFlyoutShown
            ? `${classes.flyoutTitle} ${classes.flyoutTitleShown}`
            : classes.flyoutTitle
          }
          sx={{ marginRight: isFlyoutShown ? `${flyoutTitleMargin}px` : 0 }}
        >
          {flyoutTitle}
        </Typography>}

        {/* TOGGLE FLYOUT ICON */}
        {hasFlyout &&
        <IconButton 
          className={isFlyoutShown
            ? `${classes.flyoutInitialToggle} ${classes.flyoutRotateToggle}`
            : classes.flyoutInitialToggle
          }
          onClick={onToggleFlyoutClick}
        >
          <IconKeyboardTab/>
        </IconButton>}
      </Toolbar>
    </MuiAppBar>
  )
}

AppBar.defaultProps = {
  // FAB
  hasFab: true,
  // TITLE
  pageTitle: '',
  // SEARCH
  hasSearch: true,
  search: '',
  // FLYOUT
  hasFlyout: false,
  isFlyoutShown: false,
  flyoutTitle: '',
  flyoutTitleMargin: 0,
}

AppBar.propTypes = {
  // FAB
  hasFab: PropTypes.bool.isRequired,
  // TITLE
  pageTitle: PropTypes.string.isRequired,
  // SEARCH
  hasSearch: PropTypes.bool.isRequired,
  search: PropTypes.string.isRequired,
  setSearch: PropTypes.func,
  // FLYOUT
  hasFlyout: PropTypes.bool.isRequired,
  isFlyoutShown: PropTypes.bool.isRequired,
  flyoutTitle: PropTypes.string.isRequired,
  flyoutTitleMargin: PropTypes.number.isRequired,
  onToggleFlyoutClick: PropTypes.func,
}

export default AppBar