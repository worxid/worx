import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

// COMPONENTS
import AppBar from 'components/AppBar/AppBar'
import CellGroups from 'components/DataGridRenderCell/CellGroups'
import DataGridFilters from 'components/DataGridFilters/DataGridFilters'
import DataGridTable from 'components/DataGridTable/DataGridTable'
import DialogConfirmation from 'components/DialogConfirmation/DialogConfirmation'
import DialogChangeGroup from 'components/DialogChangeGroup/DialogChangeGroup'
import DialogShareLink from 'components/DialogShareLink/DialogShareLink'
import DialogQrCode from 'components/DialogQrCode/DialogQrCode'
import Flyout from 'components/Flyout/Flyout'
import FormFlyout from './FormsFlyout/FormsFlyout'
import LoadingPaper from 'components/LoadingPaper/LoadingPaper'

// CONSTANTS
import { paramsCreateForm } from './formsConstants'
import { values } from 'constants/values'

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
} from 'services/formTemplate'

// UTILITIES
import { 
  didSuccessfullyCallTheApi, 
  isFormatDateSearchValid, 
  wasRequestCanceled,
} from 'utilities/validation'
import { convertDate } from 'utilities/date'

const Forms = () => {
  // CONTEXT
  const { setSnackbarObject } = useContext(AllPagesContext)
  const { setIsDialogFormOpen } = useContext(PrivateLayoutContext)

  const axiosPrivate = useAxiosPrivate()

  const initialColumns = [
    {
      field: 'label',
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
      field: 'created_on',
      headerName: 'Created',
      flex: 1,
      minWidth: 200,
      hide: false,
      areFilterAndSortShown: true,
      valueGetter: params => convertDate(params.value)
    },
    {
      field: 'modified_on',
      headerName: 'Updated',
      flex: 1,
      minWidth: 200,
      hide: false,
      areFilterAndSortShown: true,
      valueGetter: params => convertDate(params.value)
    },
    {
      field: 'assigned_groups',
      headerName: 'Groups',
      flex: 1,
      minWidth: 315,
      hide: false,
      areFilterAndSortShown: true,
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
      areFilterAndSortShown: true,
    },
    {
      field: 'fields_size',
      headerName: 'Fields',
      flex: 1,
      minWidth: 200,
      hide: false,
      areFilterAndSortShown: true,
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
  // DELETE DIALOG
  const [ dialogDeleteForms, setDialogDeleteForms ] = useState({})
  // FLYOUT
  const [ isFlyoutShown, setIsFlyoutShown ] = useState(false)
  // SELECTED GROUP DATA
  const [ groupData, setGroupData ] = useState([])

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
    else if (!wasRequestCanceled(response?.status)) {
      setSnackbarObject({
        open: true,
        severity:'error',
        title: response?.data?.error?.status?.replaceAll('_', ' ') || '',
        message: response?.data?.error?.message || 'Something went wrong',
      })
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
        submission_count: filters?.submission_count || null
      },
      axiosPrivate,
    )

    if(didSuccessfullyCallTheApi(response?.status) && inputIsMounted) {
      setTableData(response.data.content)
      setTotalRow(response.data.totalElements)
    }

    isDataGridLoading && setIsDataGridLoading(false)
  }

  // HANLDE DELETE FORM TEMPLATE
  const handleDeleteFormTemplate = async () => {
    setIsDataGridLoading(true)
    const abortController = new AbortController()

    setDialogDeleteForms({})
    setIsFlyoutShown(false)

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
      else if (!wasRequestCanceled(response?.status)) {
        setSnackbarObject({
          open: true,
          severity:'error',
          title: response?.data?.error?.status?.replaceAll('_', ' ') || '',
          message: response?.data?.error?.message || 'Something went wrong',
        })
      }
    }

    setIsDataGridLoading(false)
    abortController.abort()
  }

  useEffect(() => {
    if (selectionModel.length === 1) {
      setIsFlyoutShown(true)
    } else {
      setIsFlyoutShown(false)
    }
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
        hasFlyout={true}
        isFlyoutShown={isFlyoutShown}
        flyoutTitle='Information'
        flyoutTitleMargin={232}
        onToggleFlyoutClick={() => setIsFlyoutShown((current) => !current)}
      />

      {/* CONTENTS */}
      <Stack 
        direction='row'
        position='relative'
        flex='1'
        height='100%'
        className='contentContainer'
        sx={{ paddingRight: isFlyoutShown ? `${values.flyoutWidth + 24}px` : 0 }}
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
            contentTitle='Form List'
            // SHARE
            isShareButtonEnabled={selectionModel.length === 1}
            handleShareButtonClick={() => setIsDialogFormOpen('dialogShareLink')}
            // EDIT
            isEditButtonEnabled={selectionModel.length === 1}
            handleEditButtonClick={() => navigate(`/forms/edit/${selectionModel[0]}`)}
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
            // ACTIONS
            onRowDoubleClick={(params, event, details) => navigate(`/forms/${params.row.id}/submissions`)}
          />
        </LoadingPaper>

        {/* SIDE CONTENT */}
        <Flyout
          isFlyoutShown={isFlyoutShown}
          flyoutWidth={values.flyoutWidth}
        >
          <FormFlyout rows={tableData.filter(item => selectionModel.includes(item.id))} setGroupData={setGroupData}/>
        </Flyout>
      </Stack>

      {/* DIALOG DELETE FORMS */}
      <DialogConfirmation
        title='Delete Form'
        caption='Are you sure you want to delete this form?'
        dialogConfirmationObject={dialogDeleteForms}
        setDialogConfirmationObject={setDialogDeleteForms}
        cancelButtonText='Cancel'
        continueButtonText='Delete'
        onContinueButtonClick={() => handleDeleteFormTemplate()}
        onCancelButtonClick={() => setDialogDeleteForms({})}
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
    </>
  )
}

export default Forms