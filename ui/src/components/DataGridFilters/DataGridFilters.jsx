import { useState } from 'react'
import PropTypes from 'prop-types'

// CUSTOM COMPONENTS
import CustomTooltip from 'components/Customs/CustomTooltip'

// MUIS
import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

// MUI ICONS
import IconFilterAlt from '@mui/icons-material/FilterAlt'
import IconSettings from '@mui/icons-material/Settings'

// STYLES
import useStyles from './dataGridFiltersUseStyles'

const DataGridFilters = (props) => {
  const { 
    // COLUMN
    columns,
    selectedColumnList,
    handleColumnsMenuItemClick,
    // FILTER
    isFilterOn, 
    setIsFilterOn,
    // TEXT
    contentTitle,
  } = props

  const classes = useStyles()

  const [ columnsMenuAnchor, setColumnsMenuAnchor ] = useState(null)

  return (
    <Stack 
      direction='row'
      alignItems='center'
      className={classes.root}
    >
      {/* TITLE TEXT */}
      <Typography
        variant='subtitle2'
        className={classes.contentTitle}
      >
        {contentTitle}
      </Typography>

      {/* FILTER ICON */}
      <CustomTooltip 
        title='Filters' 
        placement='top'
      >
        <IconButton 
          className={classes.iconButton}
          onClick={() => setIsFilterOn(current => !current)}
        >
          <IconFilterAlt color={isFilterOn ? 'primary' : 'default'} />
        </IconButton>
      </CustomTooltip>

      {/* CUSTOMIZE COLUMNS ICON */}
      <CustomTooltip 
        title='Customize Columns' 
        placement='top'
      >
        <IconButton 
          className={classes.iconButton}
          onClick={(event) => setColumnsMenuAnchor(event.currentTarget)}
        >
          <IconSettings/>
        </IconButton>
      </CustomTooltip>

      {/* CUSTOMIZE COLUMNS MENU */}
      <Menu
        anchorEl={columnsMenuAnchor}
        open={Boolean(columnsMenuAnchor)}
        onClose={() => setColumnsMenuAnchor(null)}
        className={classes.columnsMenuRoot}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        {/* TITLE */}
        <Typography
          variant='subtitle2'
          className={classes.columnsMenuTitle}
        >
          Columns
        </Typography>

        {/* COLUMN ITEMS */}
        {columns.map((item, index) => (
          (item.field !== 'actions') &&
          <MenuItem 
            key={index}
            className={classes.columnsMenuItem}
            onClick={() => handleColumnsMenuItemClick(index)}
          >
            <Checkbox checked={!selectedColumnList[index].hide}/>
            <Typography
              variant='subtitle2'
              className={classes.columnsMenuText}
            >
              {item.headerName}
            </Typography>
          </MenuItem>
        ))}
      </Menu>
    </Stack>
  )
}

DataGridFilters.defaultProps = {
  // COLUMN
  columns: [],
  selectedColumnList: [],
  // FILTER
  isFilterOn: false,
  // TEXT
  contentTitle: '',
}

DataGridFilters.propTypes = {
  // COLUMN
  columns: PropTypes.array.isRequired,
  selectedColumnList: PropTypes.array.isRequired,
  handleColumnsMenuItemClick: PropTypes.func.isRequired,
  // FILTER
  isFilterOn: PropTypes.bool.isRequired,
  setIsFilterOn: PropTypes.func.isRequired,
  // TEXT
  contentTitle: PropTypes.string.isRequired,
}

export default DataGridFilters
