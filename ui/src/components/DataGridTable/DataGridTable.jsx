import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

// CUSTOM COMPONENTS
import CustomDataGrid from 'components/Customs/CustomDataGrid'
import CustomTooltip from 'components/Customs/CustomTooltip'
import FilterTextField from 'components/FilterTextField/FilterTextField'

// MUIS
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import { useGridApiRef } from '@mui/x-data-grid'

// MUI ICONS
import IconArrowUpward from '@mui/icons-material/ArrowUpward'
import IconSort from '@mui/icons-material/Sort'

// STYLES
import useStyles from './dataGridTableUseStyles'

const DataGridTable = (props) => {
  const {
    // BASE
    initialColumns,
    selectedColumnList,
    setSelectedColumnList,
    rows,
    // PAGINATION
    total,
    page,
    pageSize,
    setPage,
    setPageSize,
    // ORDER
    setOrder,
    setOrderBy,
    // FILTER
    setFilters,
    isFilterOn,
    // SELECTION
    selectionModel, 
    setSelectionModel,
    ...otherProps
  } = props

  const classes = useStyles()

  const dataGridApiRef = useGridApiRef()

  const [sortModel, setSortModel] = useState([])

  const getSortIcon = (field) => {
    const currentSortModel = dataGridApiRef.current.getSortModel()

    let selectedIcon = <IconSort className={classes.columnUnsortedIconAsc}/>

    if (currentSortModel[0]) {
      if (currentSortModel[0].field === field) {
        if (currentSortModel[0].sort === 'asc') selectedIcon = (
          <IconArrowUpward
            className={`${classes.columnUnsortedIconAsc} ${classes.columnSortedIconAsc}`}
          />
        )
        else if (currentSortModel[0].sort === 'desc') selectedIcon = (
          <IconArrowUpward
            className={`${classes.columnUnsortedIconAsc} ${classes.columnSortedIconDesc}`}
          />
        )
      } 
      else {
        if (currentSortModel[0].sort === 'asc') selectedIcon = (
          <IconSort
            className={`${classes.columnUnsortedIconAsc} ${classes.columnUnsortedIconAsc}`}
          />
        )
        else if (currentSortModel[0].sort === 'desc') selectedIcon = (
          <IconSort
            className={`${classes.columnUnsortedIconAsc} ${classes.columnUnsortedIconDesc}`}
          />
        )
      }
    }

    return selectedIcon
  }

  const handleSortIconClick = (field) => {
    const currentSortModel = dataGridApiRef.current.getSortModel()

    let newSortModel = []
    if (currentSortModel[0]) {
      if (currentSortModel[0].field === field) {
        if (currentSortModel[0].sort === 'asc') newSortModel = [{ field, sort: 'desc' }]
        else if (currentSortModel[0].sort === 'desc') newSortModel = []
      } 
      else newSortModel = [{ field, sort: 'asc' }]
    } 
    else if (!currentSortModel[0]) newSortModel = [{ field, sort: 'asc' }]

    handleSortModelChange(newSortModel)
  }

  const filterOnColumns = initialColumns.map((item) => {
    if (item.field !== 'actions' && item.areFilterAndSortShown) {
      return {
        renderHeader: (params) => (
          <>
            {/* DEVICE TEXT FIELD */}
            <FilterTextField
              className={classes.columnFilter}
              variant='standard'
              label={item.headerName}
              type='text'
              name={item.field}
              updateFilters={setFilters}
              onClick={(event) => event.stopPropagation()}
            />

            {/* SORT ICON */}
            <CustomTooltip 
              title='Sort by this column' 
              placement='bottom'
            >
              <IconButton
                size='small'
                onClick={() => handleSortIconClick(item.field)}
              >
                {getSortIcon(item.field)}
              </IconButton>
            </CustomTooltip>
          </>
        ),
      }
    }

    return { renderHeader: null }
  })

  const handleChangeRowsPerPage = (newPageSize) => {
    setPageSize(newPageSize)
    setPage(0)
  }

  const handleSortModelChange = (model, details) => {
    setOrder(model[0] ? model[0].sort : null)
    setOrderBy(model[0] ? model[0].field : null)
    setSortModel(model)
  }

  const handleCellClick = (inputParams, inputEvent, inputDetails) => { 
    // CELL CHILDREN IS CLICKED
    if (Number.isInteger(inputParams.id) && inputParams.field !== '__check__') {
      setSelectionModel([ inputParams.id ])
    }
    // CELL CHECKBOX CHILDREN IS CLICKED
    else if (Number.isInteger(inputParams.id) && inputParams.field === '__check__') {
      if(selectionModel.length === 0) setSelectionModel([ inputParams.id ])
      else {
        let newSelectionModel = [...selectionModel]

        if(selectionModel.includes(inputParams.id)) newSelectionModel = newSelectionModel.filter(item => item !== inputParams.id)
        else {
          newSelectionModel.push(inputParams.id)
        }

        setSelectionModel(newSelectionModel)
      }
    }
    // CELL CHECKBOX GROUP IS CLICKED
    else if (inputParams.id.includes('auto-generated-row-null') && inputParams.field === '__check__') {
      let newSelectionModel = []

      // SELECT ALL CHILDREN INSIDE THE GROUP
      if (inputEvent.target.checked) {
        newSelectionModel = [ ...selectionModel, ...inputParams.rowNode.children, inputParams.id ]
        newSelectionModel = [ ...new Set(newSelectionModel) ]
      }
      // DESELECT ALL CHILDREN INSIDE THE GROUP
      else {
        newSelectionModel = selectionModel.filter(item => item !== inputParams.id)
        newSelectionModel = newSelectionModel.filter(item => !inputParams.rowNode.children.includes(item))
      }
      
      setSelectionModel(newSelectionModel)
    }
  }

  const handleColumnHeaderClick = (inputParams, inputEvent, inputDetails) => {
    // CHECKBOX IS CLICKED
    if(inputParams.field === '__check__') {
      if(selectionModel.length === 0) {
        const newSelectionModel = rows.map(item => item.id)
        setSelectionModel(newSelectionModel)
      }
      else setSelectionModel([]) 
    }
    // NON CHECKBOX IS CLICKED
    else return
  }

  useEffect(() => {
    if (isFilterOn) {
      setSelectedColumnList((current) => {
        return current.map((item, index) => {
          return {
            ...item,
            renderHeader: filterOnColumns[index].renderHeader
              ? filterOnColumns[index].renderHeader
              : null,
            sortable: false,
          }
        })
      })
    } else {
      setSelectedColumnList((current) => {
        return current.map((item, index) => {
          item.renderHeader = undefined
          if (item.field !== 'actions') item.sortable = undefined
          return { ...item }
        })
      })
    }
  }, [isFilterOn])

  return (
    <Box flex={1}>
      <CustomDataGrid
        // BASE
        columns={selectedColumnList}
        rows={rows}
        headerHeight={isFilterOn ? 72 : 49}
        // PAGINATION
        page={page}
        pageSize={pageSize}
        onPageSizeChange={handleChangeRowsPerPage}
        onPageChange={(page, details) => setPage(page)}
        paginationMode='server'
        rowCount={total}
        // SORT
        sortModel={sortModel}
        onSortModelChange={handleSortModelChange}
        apiRef={dataGridApiRef}
        // SELECTION
        onCellClick={(params, event, details) => handleCellClick(params, event, details)}
        onColumnHeaderClick={(params, event, details) => handleColumnHeaderClick(params, event, details)}
        selectionModel={selectionModel}
        // SETTINGS
        initialState={{
          pinnedColumns: {
            right: ['actions'],
          },
        }}
        {...otherProps}
      />
    </Box>
  )
}

DataGridTable.defaultProps = {
  // BASE
  initialColumns: [],
  selectedColumnList: [],
  rows: [],
  // PAGINATION
  total: 0,
  page: 0,
  pageSize: 0,
  // FILTER
  isFilterOn: false,
  // SELECTION
  selectionModel: [],
}

DataGridTable.propTypes = {
  // BASE
  initialColumns: PropTypes.array.isRequired,
  selectedColumnList: PropTypes.array.isRequired,
  setSelectedColumnList: PropTypes.func.isRequired,
  rows: PropTypes.array.isRequired,
  // PAGINATION
  total: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  // ORDER
  setOrder: PropTypes.func.isRequired,
  setOrderBy: PropTypes.func.isRequired,
  setPage: PropTypes.func.isRequired,
  setPageSize: PropTypes.func.isRequired,
  // FILTER
  setFilters: PropTypes.func.isRequired,
  isFilterOn: PropTypes.bool.isRequired,
  // SELECTION
  selectionModel: PropTypes.array.isRequired,
  setSelectionModel: PropTypes.func.isRequired,
}

export default DataGridTable
