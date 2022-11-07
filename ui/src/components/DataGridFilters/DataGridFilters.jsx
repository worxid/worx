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
import IconDelete from '@mui/icons-material/Delete'
import IconDownload from '@mui/icons-material/Download'
import IconEdit from '@mui/icons-material/Edit'
import IconFilterAlt from '@mui/icons-material/FilterAlt'
import IconSettings from '@mui/icons-material/Settings'
import IconShare from '@mui/icons-material/Share'

// STYLES
import useStyles from './dataGridFiltersUseStyles'

const DataGridFilters = (props) => {
  const { 
    // COLUMN
    columns,
    selectedColumnList,
    setSelectedColumnList,
    // FILTER
    isFilterOn, 
    setIsFilterOn,
    // TEXT
    contentTitle,
    // SHARE
    isShareButtonEnabled,
    handleShareButtonClick,
    // EDIT
    isEditButtonEnabled,
    handleEditButtonClick,
    // DELETE
    isDeleteButtonEnabled,
    handleDeleteButtonClick,
    // DOWNLOAD
    isDownloadButtonEnabled,
    handleDownloadButtonClick,
  } = props

  const classes = useStyles()

  const [ columnsMenuAnchor, setColumnsMenuAnchor ] = useState(null)

  const handleColumnsMenuItemClick = (inputIndex) => {
    let tempSelectedColumnList = [...selectedColumnList]
    tempSelectedColumnList[inputIndex].hide = !tempSelectedColumnList[inputIndex].hide
    setSelectedColumnList(tempSelectedColumnList)
  }

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

      {/* DOWNLOAD ROW ICON */}
      {isDownloadButtonEnabled &&
      <CustomTooltip 
        title='Download' 
        placement='top'
      >
        <IconButton 
          className={classes.iconButton}
          onClick={handleDownloadButtonClick}
        >
          <IconDownload/>
        </IconButton>
      </CustomTooltip>}

      {/* SHARE ICON */}
      {isShareButtonEnabled &&
      <CustomTooltip 
        title='Share' 
        placement='top'
      >
        <IconButton 
          className={classes.iconButton}
          onClick={handleShareButtonClick}
        >
          <IconShare/>
        </IconButton>
      </CustomTooltip>}

      {/* EDIT ICON */}
      {isEditButtonEnabled &&
      <CustomTooltip 
        title='Edit' 
        placement='top'
      >
        <IconButton 
          className={classes.iconButton}
          onClick={handleEditButtonClick}
        >
          <IconEdit/>
        </IconButton>
      </CustomTooltip>}

      {/* DELETE ICON */}
      {isDeleteButtonEnabled &&
      <CustomTooltip 
        title='Delete' 
        placement='top'
      >
        <IconButton 
          className={classes.iconButton}
          onClick={handleDeleteButtonClick}
        >
          <IconDelete/>
        </IconButton>
      </CustomTooltip>}

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
        className={`${classes.columnsMenuRoot} neutralize-zoom-menu`}
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
  // SHARE
  isShareButtonEnabled: false,
  // EDIT
  isEditButtonEnabled: false,
  // DELETE
  isDeleteButtonEnabled: false,
  // DOWNLOAD
  isDownloadButtonEnabled: false,
}

DataGridFilters.propTypes = {
  // COLUMN
  columns: PropTypes.array.isRequired,
  selectedColumnList: PropTypes.array.isRequired,
  setSelectedColumnList: PropTypes.func.isRequired,
  // FILTER
  isFilterOn: PropTypes.bool.isRequired,
  setIsFilterOn: PropTypes.func.isRequired,
  // TEXT
  contentTitle: PropTypes.string.isRequired,
  // SHARE
  isShareButtonEnabled: PropTypes.bool,
  handleShareButtonClick: PropTypes.func,
  // EDIT
  isEditButtonEnabled: PropTypes.bool,
  handleEditButtonClick: PropTypes.func,
  // DELETE
  isDeleteButtonEnabled: PropTypes.bool,
  handleDeleteButtonClick: PropTypes.func,
  // DOWNLOAD
  isDownloadButtonEnabled: PropTypes.bool,
  handleDownloadButtonClick: PropTypes.func,
}

export default DataGridFilters