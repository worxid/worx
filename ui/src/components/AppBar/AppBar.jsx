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
      </Toolbar>
    </MuiAppBar>
  )
}

AppBar.defaultProps = {
  hasFab: true,
  pageTitle: '',
  hasSearch: true,
  search: '',
}

AppBar.propTypes = {
  // FAB
  hasFab: PropTypes.bool.isRequired,
  // TITLE
  pageTitle: PropTypes.string.isRequired,
  // SEARCH
  hasSearch: PropTypes.bool.isRequired,
  search: PropTypes.string,
  setSearch: PropTypes.func,
}

export default AppBar