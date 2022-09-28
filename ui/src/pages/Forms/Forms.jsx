import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

// COMPONENTS
import AppBar from 'components/AppBar/AppBar'
import DataGridFilters from 'components/DataGridFilters/DataGridFilters'
import CellGroups from 'components/DataGridRenderCell/CellGroups'
import DataGridTable from 'components/DataGridTable/DataGridTable'
import DialogConfirmation from 'components/DialogConfirmation/DialogConfirmation'
import Flyout from 'components/Flyout/Flyout'
import FormFlyout from './FormsFlyout/FormsFlyout'
import LoadingPaper from 'components/LoadingPaper/LoadingPaper'

// CONSTANTS
import { dummyTableData, paramsCreateForm } from './formsConstants'
import { values } from 'constants/values'

// CONTEXTS
import { AllPagesContext } from 'contexts/AllPagesContext'

// MUIS
import Link from '@mui/material/Link'
import Stack from '@mui/material/Stack'

// SERVICES
import { postCreateFormTemplate } from 'services/formTemplate'

// STYLES
import useLayoutStyles from 'styles/layoutPrivate'

const Forms = () => {
  // CONTEXT
  const { setSnackbarObject } = useContext(AllPagesContext)

  const layoutClasses = useLayoutStyles()

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
      field: 'submissions',
      headerName: 'Submissions',
      flex: 1,
      minWidth: 200,
      hide: false,
      areFilterAndSortShown: true,
      renderCell: (params) =>
        params.value && (
          <Link 
            href={`/forms/${params.row.id}/submissions`} 
            // className={layoutClasses.muiLinks}
            color='primary'
          >
            {params.value}
          </Link>
        )
    },
    {
      field: 'fields',
      headerName: 'Fields',
      flex: 1,
      minWidth: 200,
      hide: false,
      areFilterAndSortShown: true,
    },
  ]

  const initialFilters = {}

  // ABORT CONTROLLER
  const abortController = new AbortController()

  // NAVIGATE
  const navigate = useNavigate()

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

  // HANDLE FAB CLICK
  const handleFabClick = async () => {
    const response = await postCreateFormTemplate(abortController.signal, paramsCreateForm)
    if(response?.data?.success) {
      navigate(`/forms/edit/${response.data.value.id}`)
    } else {
      setSnackbarObject({
        open: true,
        severity:'error',
        title:'',
        message:'Something gone wrong'
      })
    }
  }

  useEffect(() => {
    if (selectionModel.length === 1) {
      setIsFlyoutShown(true)
    }
  }, [selectionModel])

  // SIDE EFFECT ABORT CONTROLLER
  useEffect(() => {
    return () => abortController.abort()
  }, [])

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
          />
        </LoadingPaper>

        {/* SIDE CONTENT */}
        <Flyout
          isFlyoutShown={isFlyoutShown}
          flyoutWidth={values.flyoutWidth}
        >
          <FormFlyout rows={tableData.filter(item => selectionModel.includes(item.id))}/>
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
        onContinueButtonClick={() => {
          setDialogDeleteForms({})
          setSnackbarObject({
            open: true,
            severity:'success',
            title:'',
            message:'Form deleted successfully'
          })
        }}
        onCancelButtonClick={() => setDialogDeleteForms({})}
      />
    </>
  )
}

export default Forms