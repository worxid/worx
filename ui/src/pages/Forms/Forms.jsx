import { useState } from 'react'

// COMPONENTS
import AppBar from 'components/AppBar/AppBar'
import DataGridFilters from 'components/DataGridFilters/DataGridFilters'
import DataGridTable from 'components/DataGridTable/DataGridTable'
import LoadingPaper from 'components/LoadingPaper/LoadingPaper'

// CONSTANTS
import { dummyTableData } from './formsConstants'

const Forms = () => {  
  const initialColumns = [
    {
      field: 'formTitle',
      headerName: 'Form Title',
      flex: 1,
      minWidth: 200,
      hide: false,
      areFilterAndSortShown: true,
    },
    {
      field: 'description',
      headerName: 'Description',
      flex: 1,
      minWidth: 200,
      hide: false,
      areFilterAndSortShown: true,
    },
    {
      field: 'created',
      headerName: 'Created',
      flex: 1,
      minWidth: 200,
      hide: false,
      areFilterAndSortShown: true,
    },
    {
      field: 'updated',
      headerName: 'Updated',
      flex: 1,
      minWidth: 200,
      hide: false,
      areFilterAndSortShown: true,
    },
    {
      field: 'groups',
      headerName: 'Updated',
      flex: 1,
      minWidth: 200,
      hide: false,
      areFilterAndSortShown: true,
    },
    {
      field: 'submissions',
      headerName: 'Submissions',
      flex: 1,
      minWidth: 200,
      hide: false,
      areFilterAndSortShown: true,
    },
    {
      field: 'fields',
      headerName: 'Fields',
      flex: 1,
      minWidth: 200,
      hide: false,
      areFilterAndSortShown: true,
    },
    {
      field: 'defaultForms',
      headerName: 'Default Form',
      flex: 1,
      minWidth: 200,
      hide: false,
      areFilterAndSortShown: true,
    },
  ]

  const initialFilters = {}

  // APP BAR
  const [ pageSearch, setPageSearch ] = useState('')
  // CONTENT
  const [ isDataGridLoading, setIsDataGridLoading ] = useState(false)
  // DATA GRID - BASE
  const [ selectedColumnList, setSelectedColumnList ] = useState(initialColumns)
  const [ tableData, setTableData ] = useState(dummyTableData)
  // DATA GRID - PAGINATION
  const [ totalRow, setTotalRow ] = useState(0)
  const [ pageNumber, setPageNumber ] = useState(0)
  const [ pageSize, setPageSize ] = useState(100)
  // DATA GRID - ORDER
  const [ order, setOrder ] = useState('desc')
  const [ orderBy, setOrderBy ] = useState('dateAndTime')
  // DATA GRID - FILTER
  const [ isFilterOn, setIsFilterOn ] = useState(false)
  const [ filters, setFilters ] = useState(initialFilters)
  // DATA GRID - SELECTION
  const [ selectionModel, setSelectionModel ] = useState([])

  return (
    <>
      {/* APP BAR */}
      <AppBar
        hasFab={true}
        pageTitle='Forms'
        hasSearch={true}
        search={pageSearch}
        setSearch={setPageSearch}
      />

      {/* CONTENT */}
      <LoadingPaper isLoading={isDataGridLoading}>
        <DataGridFilters
          // COLUMN
          columns={initialColumns}
          selectedColumnList={selectedColumnList}
          setSelectedColumnList={setSelectedColumnList}
          // FILTER
          isFilterOn={isFilterOn}
          setIsFilterOn={setIsFilterOn}
          // TEXT
          contentTitle='Form List'
          // EDIT
          isEditButtonEnabled={selectionModel.length === 1}
          handleEditButtonClick={() => console.log('edit')}
          // EDIT
          isDeleteButtonEnabled={selectionModel.length > 0}
          handleDeleteButtonClick={() => console.log('delete')}
        />

        <DataGridTable
          // BASE
          initialColumns={initialColumns}
          selectedColumnList={selectedColumnList}
          setSelectedColumnList={setSelectedColumnList}
          rows={tableData}
          // PAGINATION
          total={totalRow}
          page={pageNumber}
          setPage={setPageNumber}
          pageSize={pageSize}
          setPageSize={setPageSize}
          // ORDER
          setOrder={setOrder}
          setOrderBy={setOrderBy}
          // FILTER
          setFilters={setFilters}
          isFilterOn={isFilterOn}
          // SELECTION
          selectionModel={selectionModel} 
          setSelectionModel={setSelectionModel}
        />
      </LoadingPaper>
    </>
  )
}

export default Forms