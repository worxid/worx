import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

// COMPONENTS
import AppBar from 'components/AppBar/AppBar'
import CellGroups from 'components/DataGridRenderCell/CellGroups'
import DataGridFilters from 'components/DataGridFilters/DataGridFilters'
import DataGridTable from 'components/DataGridTable/DataGridTable'
import DialogChangeGroup from 'components/DialogChangeGroup/DialogChangeGroup'
import DialogConfirmation from 'components/DialogConfirmation/DialogConfirmation'
import DialogShareLink from 'components/DialogShareLink/DialogShareLink'
import DialogQrCode from 'components/DialogQrCode/DialogQrCode'
import FormFlyout from './FormsFlyout/FormsFlyout'
import LoadingPaper from 'components/LoadingPaper/LoadingPaper'

// CONSTANTS
import { paramsCreateForm } from './formsConstants'

// CONTEXTS
import { AllPagesContext } from 'contexts/AllPagesContext'
import { PrivateLayoutContext } from 'contexts/PrivateLayoutContext'

// DATE
import moment from 'moment'

// HOOKS
import useAxiosPrivate from 'hooks/useAxiosPrivate'

// MUIS
import Stack from '@mui/material/Stack'

// SERVICES
import {
  deleteFormTemplate,
  postCreateFormTemplate, 
  postGetListFormTemplate, 
} from 'services/worx/formTemplate'

// UTILITIES
import { convertDate } from 'utilities/date'
import { getDefaultErrorMessage } from 'utilities/object'
import { 
  didSuccessfullyCallTheApi, 
  isFormatDateSearchValid, 
  wasAccessTokenExpired,
  wasRequestCanceled,
} from 'utilities/validation'

const Forms = () => {
  // CONTEXT
  const { setSnackbarObject } = useContext(AllPagesContext)
  const { 
    setIsDialogFormOpen, 
    setIsFlyoutOpen,
  } = useContext(PrivateLayoutContext)

  const axiosPrivate = useAxiosPrivate()
  const initialColumns = [
    {
      field: 'label',
      headerName: 'Form Title',
      flex: 1,
      minWidth: 200,
      hide: false,
      isFilterShown: true,
      isSortShown: true,
    },
    {
      field: 'description',
      headerName: 'Description',
      flex: 1,
      minWidth: 200,
      hide: false,
      isFilterShown: true,
      isSortShown: true,
    },
    {
      field: 'created_on',
      headerName: 'Created',
      flex: 1,
      minWidth: 200,
      hide: false,
      isFilterShown: false,
      isSortShown: true,
      valueGetter: params => convertDate(params.value)
    },
    {
      field: 'modified_on',
      headerName: 'Updated',
      flex: 1,
      minWidth: 200,
      hide: false,
      isFilterShown: false,
      isSortShown: true,
      valueGetter: params => convertDate(params.value)
    },
    {
      field: 'assigned_groups',
      headerName: 'Groups',
      flex: 1,
      minWidth: 315,
      hide: false,
      isFilterShown: true,
      isSortShown: true,
      renderCell: (params) =>
        params.value && (
          <CellGroups dataValue={params.value} />
        ),
    },
    {
      field: 'submission_count',
      headerName: 'Submissions',
      flex: 1,
      minWidth: 200,
      hide: false,
      isFilterShown: true,
      isSortShown: true,
    },
  ]
  const initialFilters = {}

  // NAVIGATE
  const navigate = useNavigate()

  // APP BAR
  const [ pageSearch, setPageSearch ] = useState('')
  // CONTENT
  const [ isDataGridLoading, setIsDataGridLoading ] = useState(true)
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
  // SELECTED GROUP DATA
  const [ groupData, setGroupData ] = useState([])
  // DELETE DIALOG
  const [ dialogDeleteForms, setDialogDeleteForms ] = useState({})

  // HANDLE FAB CLICK
  const handleFabClick = async () => {
    const abortController = new AbortController()

    const response = await postCreateFormTemplate(
      abortController.signal, 
      paramsCreateForm, 
      axiosPrivate,
    )

    if (didSuccessfullyCallTheApi(response?.status)) {
      navigate(`/forms/edit/${response.data.value.id}`)
    } 
    else if (!wasRequestCanceled(response?.status) && !wasAccessTokenExpired(response.status)) {
      setSnackbarObject(getDefaultErrorMessage(response))
    }

    abortController.abort()
  }

  // HANDLE DATE SEARCH VALUE
  const handleDateSearchValue = (filterValue) => {
    if(filterValue) {
      if(isFormatDateSearchValid(filterValue)) {
        const value = moment(filterValue, 'dd-MM-yyyy HH:mm:ss').toISOString()
        return value
      } else {
        setSnackbarObject({
          open: true,
          severity:'info',
          title:'',
          message:'For your information, example value search date is 30-09-2022 18:00:00'
        })
        return ''
      }
    } else {
      return ''
    }
  }

  // FETCHING DATA TABLE FORMS
  const fetchingFormsList = async (abortController, inputIsMounted) => {
    let createdDate = handleDateSearchValue(filters?.created_on)
    let modifiedDate = handleDateSearchValue(filters?.modified_on)

    let requestParams = {
      size: pageSize,
      page: pageNumber,
    }

    if (order && orderBy) requestParams.sort = `${orderBy},${order}`

    const response = await postGetListFormTemplate(
      abortController.signal,
      requestParams,
      {
        label: filters?.label || '',
        description: filters?.description || '',
        created_on: createdDate || '',
        modified_on: modifiedDate || '',
        // EXAMPLE: group, group
        assigned_groups: filters?.assigned_groups?.includes(', ')
          ? filters?.assigned_groups?.split(', ') : filters?.assigned_groups
            ? [filters?.assigned_groups] : null,
        submission_count: filters?.submission_count || null,
        global_search: pageSearch,
        from: '',
        to: '',
      },
      axiosPrivate,
    )

    if(didSuccessfullyCallTheApi(response?.status) && inputIsMounted) {
      setTableData(response.data.content)
      setTotalRow(response.data.totalElements)
    }
    else if (!wasRequestCanceled(response?.status) && !wasAccessTokenExpired(response.status)) {
      setSnackbarObject(getDefaultErrorMessage(response))
    }

    isDataGridLoading && setIsDataGridLoading(false)
  }

  // HANLDE DELETE FORM TEMPLATE
  const handleDeleteFormTemplate = async () => {
    setIsDataGridLoading(true)
    const abortController = new AbortController()

    setDialogDeleteForms({})

    if(selectionModel.length >= 1) {
      // CURRENTLY JUST CAN DELETE 1 ITEM
      const response = await deleteFormTemplate(
        abortController.signal, 
        axiosPrivate,
        { ids: selectionModel }, 
      )

      if (didSuccessfullyCallTheApi(response?.status)) {
        fetchingFormsList(abortController.signal, true)

        setSnackbarObject({
          open: true,
          severity:'success',
          title:'',
          message:'Form deleted successfully'
        })

        setSelectionModel([])
      } 
      else if (!wasRequestCanceled(response?.status) && !wasAccessTokenExpired(response.status)) {
        setSnackbarObject(getDefaultErrorMessage(response))
      }
    }

    setIsDataGridLoading(false)
    abortController.abort()
  }

  useEffect(() => {
    if (selectionModel.length === 1) setIsFlyoutOpen(true)
    else setIsFlyoutOpen(false)
  }, [selectionModel])

  // SIDE EFFECT FETCHING DATA
  useEffect(() => {
    let isMounted = true
    const abortController = new AbortController()

    fetchingFormsList(abortController, isMounted)

    return () => {
      isMounted = false
      abortController.abort()
    }
  }, [filters, pageNumber, pageSize, pageSearch, order, orderBy])

  return (
    <>
      {/* APP BAR */}
      <AppBar
        hasFab={true}
        onFabClick={() => handleFabClick()}
        pageTitle='Forms'
        hasSearch={true}
        search={pageSearch}
        setSearch={setPageSearch}
      />

      {/* MAIN CONTENT */}
      <Stack 
        direction='row'
        position='relative'
        flex='1'
        height='100%'
      >
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
            // DATE RANGE TIME
            isWithDateTimePicker={false}
            isWithTimePicker={false}
            // SHARE
            isShareButtonEnabled={selectionModel.length === 1}
            handleShareButtonClick={() => setIsDialogFormOpen('dialogShareLink')}
            // DELETE
            isDeleteButtonEnabled={selectionModel.length > 0}
            handleDeleteButtonClick={() => setDialogDeleteForms({id: selectionModel})}
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

      {/* SIDE CONTENT */}
      <FormFlyout 
        rows={tableData.filter(item => selectionModel.includes(item.id))} 
        reloadData={fetchingFormsList}
        setGroupData={setGroupData}
      />

      {/* DIALOG GROUP */}
      <DialogChangeGroup
        dataChecked={groupData}
        page='form-template'
        selectedItemId={selectionModel[0]}
        reloadData={fetchingFormsList}
      />

      {/* DIALOG SHARE LINK */}
      <DialogShareLink id={Number(selectionModel[0])}/>

      {/* DIALOG QR CODE */}
      <DialogQrCode id={Number(selectionModel[0])}/>

      {/* DIALOG DELETE FORMS */}
      <DialogConfirmation
        title={`Delete ${selectionModel.length >= 2 ? 'Forms' : 'Form'}`}
        caption={`Are you sure you want to delete ${selectionModel.length >= 2 ? 'these forms' : 'this form'}?`}
        dialogConfirmationObject={dialogDeleteForms}
        setDialogConfirmationObject={setDialogDeleteForms}
        cancelButtonText='Cancel'
        continueButtonText='Delete'
        onContinueButtonClick={() => handleDeleteFormTemplate()}
        onCancelButtonClick={() => setDialogDeleteForms({})}
      />
    </>
  )
}

export default Forms