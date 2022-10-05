import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

// COMPONENTS
import AppBar from 'components/AppBar/AppBar'
import DataGridFilters from 'components/DataGridFilters/DataGridFilters'
import DataGridTable from 'components/DataGridTable/DataGridTable'
import DialogAddOrEditGroup from './DialogAddOrEditGroup/DialogAddOrEditGroup'
import DialogConfirmation from 'components/DialogConfirmation/DialogConfirmation'
import LoadingPaper from 'components/LoadingPaper/LoadingPaper'

// CONTEXTS
import { AllPagesContext } from 'contexts/AllPagesContext'
import { PrivateLayoutContext } from 'contexts/PrivateLayoutContext'

// MUIS
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

// MUI ICONS
import IconCircle from '@mui/icons-material/Circle'

// SERVICES
import { getGroupList } from 'services/group'

// UTILITIES
import { didSuccessfullyCallTheApi } from 'utilities/validation'

const SettingsGroup = () => {
  const initialColumns = [
    {
      field: 'name',
      headerName: 'Group Name',
      flex: 1,
      minWidth: 200,
      hide: false,
      areFilterAndSortShown: true,
      renderCell: (params) =>
        params.value && (
          <Stack  
            direction='row' 
            alignItems='center'
            spacing='8px'
          >
            {/* ICON */}
            <IconCircle 
              sx={{ color: params.row.color, width: 12 }} 
            />
            
            {/* TEXT */}
            <Typography variant='inherit'>
              {params.value}
            </Typography>
          </Stack>
        ),
    },
    {
      field: 'device_count',
      headerName: 'Total Devices',
      flex: 1,
      minWidth: 200,
      hide: false,
      areFilterAndSortShown: true,
      valueGetter: (params) => params.value ?? 0,
    },
    {
      field: 'form_count',
      headerName: 'Total Form',
      flex: 1,
      minWidth: 200,
      hide: false,
      areFilterAndSortShown: true,
      valueGetter: (params) => params.value ?? 0,
    }
  ]

  const { setIsDialogAddOrEditOpen } = useContext(PrivateLayoutContext)

  const { setSnackbarObject } = useContext(AllPagesContext)

  const initialFilters = {}

  // NAVIGATE
  const navigate = useNavigate()

  // APP BAR
  const [ pageSearch, setPageSearch ] = useState('')
  // CONTENT
  const [ isDataGridLoading, setIsDataGridLoading ] = useState(false)
  // DATA GRID - BASE
  const [ selectedColumnList, setSelectedColumnList ] = useState(initialColumns)
  const [ tableData, setTableData ] = useState([])
  // DATA GRID - PAGINATION
  const [ totalRow, setTotalRow ] = useState(0)
  const [ pageNumber, setPageNumber ] = useState(0)
  const [ pageSize, setPageSize ] = useState(100)
  // DATA GRID - ORDER
  const [ order, setOrder ] = useState(null)
  const [ orderBy, setOrderBy ] = useState(null)
  // DATA GRID - FILTER
  const [ isFilterOn, setIsFilterOn ] = useState(false)
  const [ filters, setFilters ] = useState(initialFilters)
  // DATA GRID - SELECTION
  const [ selectionModel, setSelectionModel ] = useState([])

  // DELETE DIALOG
  const [ dialogDeleteGroupName, setDialogDeleteGroupName ] = useState({})

  // DIALOG TYPE
  const [ dialogType, setDialogType ] = useState('')

  // DATA EDIT GROUP
  const [ dataDialogEdit, setDataDialogEdit ] = useState(null)

  // HANDLE ADD BUTTON CLICKED
  const handleAddButtonClick = () => {
    setDialogType('Add New')
    setIsDialogAddOrEditOpen(true)
  }

  // HANDLE EDIT BUTTON CLICKED
  const handleEditButtonClick = () => {
    const editData = tableData.filter(item => item.id === selectionModel[0])
    setDialogType('Edit')
    setDataDialogEdit(...editData)
    setIsDialogAddOrEditOpen(true)
  }

  const loadGroupListData = async (inputIsMounted, inputAbortController) => {
    const resultGroupList = await getGroupList(inputAbortController.signal)

    if (didSuccessfullyCallTheApi(resultGroupList.status) && inputIsMounted) {
      setTableData(resultGroupList.data.list)
    }
  }

  useEffect(() => {
    let isMounted = true
    const abortController = new AbortController()

    loadGroupListData(isMounted, abortController)

    return () => {
      isMounted = false
      abortController.abort()
    }
  }, [])

  return (
    <>
      {/* APP BAR */}
      <AppBar
        hasFab={true}
        onFabClick={handleAddButtonClick}
        pageTitle='Groups'
        hasSearch={true}
        search={pageSearch}
        setSearch={setPageSearch}
        hasFlyout={false}
      />

      {/* CONTENTS */}
      <Stack 
        direction='row'
        position='relative'
        flex='1'
        height='100%'
      >
        {/* MAIN CONTENT */}
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
            contentTitle='Group List'
            // EDIT
            isEditButtonEnabled={selectionModel.length === 1}
            handleEditButtonClick={handleEditButtonClick}
            // DELETE
            isDeleteButtonEnabled={selectionModel.length > 0}
            handleDeleteButtonClick={() => setDialogDeleteGroupName({id: selectionModel})}
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
            order={order}
            setOrderBy={setOrderBy}
            orderBy={orderBy}
            // FILTER
            setFilters={setFilters}
            isFilterOn={isFilterOn}
            // SELECTION
            selectionModel={selectionModel} 
            setSelectionModel={setSelectionModel}
          />
        </LoadingPaper>
      </Stack>
      
      {/* DIALOG ADD OR EDIT GROUP NAME */}
      <DialogAddOrEditGroup
        dialogType={dialogType}
        dataDialogEdit={dataDialogEdit}
        setDataDialogEdit={setDataDialogEdit}
      />

      {/* DIALOG DELETE GROUP NAME */}
      <DialogConfirmation
        title='Delete Group'
        caption='Are you sure you want to delete this group?'
        dialogConfirmationObject={dialogDeleteGroupName}
        setDialogConfirmationObject={setDialogDeleteGroupName}
        cancelButtonText='Cancel'
        continueButtonText='Delete'
        onContinueButtonClick={() => {
          setDialogDeleteGroupName({})
          setSnackbarObject({
            open: true,
            severity:'success',
            title:'',
            message:'Group deleted successfully'
          })
        }}
        onCancelButtonClick={() => setDialogDeleteGroupName({})}
      />
    </>
  )
}

export default SettingsGroup