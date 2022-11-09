import { useState, useEffect, useContext } from 'react'

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

// HOOKS
import useAxiosPrivate from 'hooks/useAxiosPrivate'

// MUIS
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

// MUI ICONS
import IconCircle from '@mui/icons-material/Circle'

// SERVICES
import {
  deleteGroup, 
  postGetGroupList, 
} from 'services/group'

// UTILITIES
import { didSuccessfullyCallTheApi } from 'utilities/validation'

const Groups = () => {
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

  const axiosPrivate = useAxiosPrivate()

  const initialFilters = {
    name: '',
    device_count: '',
    form_count: '',
  }

  // APP BAR
  const [ pageSearch, setPageSearch ] = useState('')
  // CONTENT
  const [ mustReloadDataGrid, setMustReloadDataGrid ] = useState(true)
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
  const [ dialogDeleteObject, setDialogDeleteObject ] = useState({})

  // DIALOG TYPE
  const [ dialogType, setDialogType ] = useState('')

  // DATA EDIT GROUP
  const [ dataDialogEdit, setDataDialogEdit ] = useState(null)

  // HANDLE ADD BUTTON CLICKED
  const handleAddButtonClick = () => {
    setDialogType('add')
    setIsDialogAddOrEditOpen(true)
  }

  // HANDLE EDIT BUTTON CLICKED
  const handleEditButtonClick = () => {
    const editData = tableData.filter(item => item.id === selectionModel[0])
    setDialogType('edit')
    setDataDialogEdit(...editData)
    setIsDialogAddOrEditOpen(true)
  }

  const loadGroupListData = async (inputIsMounted, inputAbortController) => {
    let requestParams = {
      size: pageSize,
      page: pageNumber,
    }
    
    if (orderBy && order) requestParams.sort = `${orderBy},${order}`

    const resultGroupList = await postGetGroupList(
      inputAbortController.signal, 
      requestParams,
      filters,
      axiosPrivate,
    )

    if (didSuccessfullyCallTheApi(resultGroupList.status) && inputIsMounted) {
      setTableData(resultGroupList.data.content)
      setTotalRow(resultGroupList.data.totalElements)
    }

    setMustReloadDataGrid(false)
  }

  const handleDialogConfirmationActionButtonClick = async (inputType) => {
    setDialogDeleteObject({})

    // CONTINUE BUTTON IS CLICKED
    if (inputType === 'continue') {
      const abortController = new AbortController()

      const resultDeleteGroup = await deleteGroup(
        abortController.signal, 
        axiosPrivate,
        { ids: selectionModel },
      )
      
      if (didSuccessfullyCallTheApi(resultDeleteGroup.status)) {
        setMustReloadDataGrid(true)
        
        setSnackbarObject({
          open: true,
          severity: 'success',
          title: '',
          message: 'Successfully delete the selected group'
        })
      }

      abortController.abort()
    }
  }

  useEffect(() => {
    let isMounted = true
    const abortController = new AbortController()

    mustReloadDataGrid && loadGroupListData(isMounted, abortController)

    return () => {
      isMounted = false
      abortController.abort()
    }
  }, [mustReloadDataGrid])

  useEffect(() => {
    setMustReloadDataGrid(true)
  }, [filters, pageNumber, pageSize, order, orderBy, pageSearch])

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
        <LoadingPaper isLoading={mustReloadDataGrid}>
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
            handleDeleteButtonClick={() => setDialogDeleteObject({ id: selectionModel[0] })}
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
        setMustReloadDataGrid={setMustReloadDataGrid}
      />

      {/* DIALOG DELETE GROUP NAME */}
      <DialogConfirmation
        title={`Delete ${selectionModel.length >= 2 ? 'Groups' : 'Group'}`}
        caption={`Are you sure you want to delete ${selectionModel.length >= 2 ? 'these groups' : 'this group'}?`}
        dialogConfirmationObject={dialogDeleteObject}
        setDialogConfirmationObject={setDialogDeleteObject}
        cancelButtonText='Cancel'
        continueButtonText='Delete'
        onContinueButtonClick={() => handleDialogConfirmationActionButtonClick('continue')}
        onCancelButtonClick={() => handleDialogConfirmationActionButtonClick('cancel')}
      />
    </>
  )
}

export default Groups