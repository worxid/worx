import { useState, useEffect, useContext } from 'react'

// COMPONENTS
import AppBar from 'components/AppBar/AppBar'
import DataGridFilters from 'components/DataGridFilters/DataGridFilters'
import DataGridTable from 'components/DataGridTable/DataGridTable'
import CellGroups from 'components/DataGridRenderCell/CellGroups'
import DialogAddOrEditDevice from './DialogAddOrEditDevice/DialogAddOrEditDevice'
import DialogChangeGroup from 'components/DialogChangeGroup/DialogChangeGroup'
import DialogConfirmation from 'components/DialogConfirmation/DialogConfirmation'
import Flyout from 'components/Flyout/Flyout'
import DeviceFlyout from './DevicesFlyout/DevicesFlyout'
import LoadingPaper from 'components/LoadingPaper/LoadingPaper'

// CONSTANTS
import { values } from 'constants/values'

// CONTEXTS
import { AllPagesContext } from 'contexts/AllPagesContext'
import { PrivateLayoutContext } from 'contexts/PrivateLayoutContext'

// HOOKS
import useAxiosPrivate from 'hooks/useAxiosPrivate'

// MUIS
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

// MUI ICONS
import IconClear from '@mui/icons-material/Clear'
import IconWarning from '@mui/icons-material/Warning'
import IconVerified from '@mui/icons-material/Verified'

// SERVICES
import { deleteDevices, postGetListDevices } from 'services/devices'

// STYLES
import useLayoutStyles from './devicesUseStyles'

// UTILITIES
import { didSuccessfullyCallTheApi } from 'utilities/validation'
import { getDeviceStatusColor } from 'utilities/component'

const Devices = () => { 
  const classes = useLayoutStyles()

  const axiosPrivate = useAxiosPrivate()

  const initialColumns = [
    {
      field: 'device_status',
      headerName: 'Status',
      flex: 1,
      minWidth: 125,
      hide: false,
      areFilterAndSortShown: true,
      renderCell: (params) =>
        params.value && (
          <Stack direction={'row'} alignItems='center'>
            {params.value === 'PENDING' && <IconWarning className={classes.iconStatusSize} color='warning' />}
            {params.value === 'APPROVED' && <IconVerified className={classes.iconStatusSize} color='success' />}
            {params.value === 'DENIED' && <IconClear className={classes.iconStatusSize} color='error' />}
            &nbsp;
            <Typography 
              variant='inherit'
              color={getDeviceStatusColor(params.value)}
              className='textCapitalize'
            >
              {params.value}
            </Typography>
          </Stack>
        ),
    },
    {
      field: 'label',
      headerName: 'Label',
      flex: 1,
      minWidth: 200,
      hide: false,
      areFilterAndSortShown: true,
    },
    {
      field: 'device_code',
      headerName: 'Identifier',
      flex: 1,
      minWidth: 200,
      hide: false,
      areFilterAndSortShown: true,
    },
    {
      field: 'device_model',
      headerName: 'Device Model',
      flex: 1,
      minWidth: 150,
      hide: false,
      areFilterAndSortShown: true,
    },
    {
      field: 'device_os_version',
      headerName: 'Device Version',
      flex: 1,
      minWidth: 125,
      hide: false,
      areFilterAndSortShown: true,
    },
    {
      field: 'device_app_version',
      headerName: 'Device App Version',
      flex: 1,
      minWidth: 150,
      hide: false,
      areFilterAndSortShown: true,
    },
    {
      field: 'groups',
      headerName: 'Groups',
      flex: 1,
      minWidth: 380,
      hide: false,
      areFilterAndSortShown: true,
      renderCell: (params) =>
        params.value && (
          <CellGroups dataValue={params.value.map(item => ({ name: item }))} />
        ),
    }
  ]

  const { setIsDialogAddOrEditOpen } = useContext(PrivateLayoutContext)
  const { setSnackbarObject } = useContext(AllPagesContext)

  const initialFilters = {}

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
  // FLYOUT
  const [ isFlyoutShown, setIsFlyoutShown ] = useState(false)
  // SELECTED GROUP DATA
  const [ groupData, setGroupData ] = useState([])
  // DELETE DIALOG
  const [ dialogDeleteDevice, setDialogDeleteDevice ] = useState({})
  // DATA EDIT DEVICE
  const [ dataDialogEdit, setDataDialogEdit ] = useState(null)

  // HANDLE EDIT BUTTON CLICKED
  const handleEditButtonClick = () => {
    const editData = tableData.filter(item => item.id === selectionModel[0])
    setDataDialogEdit(...editData)
    setIsDialogAddOrEditOpen(true)
  }

  // FETCHING DATA TABLE DEVICES
  const fetchingDevicesList = async (abortController, isMounted) => {
    const response = await postGetListDevices(
      abortController.signal,
      {
        request: {
          label: '',
          groups: null,
          device_code: '',
          device_model: '',
          device_language: '',
          device_os_version: '',
          device_app_version: '',
          global_search: '',
          joined_time: null
        },
        pageable: {
          page: pageNumber,
          size: pageSize,
          sort: null
        }
      },
      axiosPrivate,
    )

    if(didSuccessfullyCallTheApi(response?.status) && isMounted) {
      setTableData(response.data.rows)
      setTotalRow(response.data.totalElements)
    } else {
      setSnackbarObject({
        open: true,
        severity:'error',
        title: response?.data?.error?.status?.replaceAll('_', ' ') || '',
        message: response?.data?.error?.message || 'Something went wrong',
      })
    }

    isDataGridLoading && setIsDataGridLoading(false)
  }

  // HANDLE DELETE BUTTON CLICKED
  const handleDeleteDevicesClick = async () => {
    setIsDataGridLoading(true)
    const abortController = new AbortController()

    setDialogDeleteDevice({})
    setIsFlyoutShown(false)

    if(selectionModel.length >= 1) {
      // CURRENTLY JUST CAN DELETE 1 ITEM
      const response = await deleteDevices(
        selectionModel[0], 
        abortController.signal, 
        axiosPrivate,
      )

      if(didSuccessfullyCallTheApi(response?.status)) {
        fetchingDevicesList(abortController.signal, true)
        setSnackbarObject({
          open: true,
          severity:'success',
          title:'',
          message:'Device deleted successfully'
        })
        setSelectionModel([])
      } else {
        setSnackbarObject({
          open: true,
          severity:'error',
          title: response?.data?.error?.status?.replaceAll('_', ' ') || '',
          message: response?.data?.error?.message || 'Something went wrong',
        })
      }
    }

    setIsDataGridLoading(false)
  }

  // SIDE EFFECT FETCHING DATA
  useEffect(() => {
    let isMounted = true
    const abortController = new AbortController()
    fetchingDevicesList(abortController, isMounted)

    return () => {
      isMounted = false
      abortController.abort()
    }
  }, [filters, pageNumber, pageSize])

  useEffect(() => {
    if (selectionModel.length === 1) {
      setIsFlyoutShown(true)
    } else {
      setIsFlyoutShown(false)
    }
  }, [selectionModel])

  return (
    <>
      {/* APP BAR */}
      <AppBar
        hasFab={false}
        pageTitle='Devices'
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
            contentTitle='Device List'
            // EDIT
            isEditButtonEnabled={selectionModel.length === 1}
            handleEditButtonClick={handleEditButtonClick}
            // DELETE
            isDeleteButtonEnabled={selectionModel.length > 0}
            handleDeleteButtonClick={() => setDialogDeleteDevice({id: selectionModel})}
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
          <DeviceFlyout
            rows={tableData.filter(item => selectionModel.includes(item.id))}
            reloadData={fetchingDevicesList}
            setGroupData={setGroupData}
          />
        </Flyout>
      </Stack>

      {/* DIALOG CHANGE GROUP */}
      <DialogChangeGroup
        dataChecked={groupData.map(item => ({ name: item }))}
        page='devices'
        selectedItemId={selectionModel[0]}
        reloadData={fetchingDevicesList}
      />
      
      {/* DIALOG EDIT DEVICES */}
      <DialogAddOrEditDevice 
        dataDialogEdit={dataDialogEdit}
        setDataDialogEdit={setDataDialogEdit} 
        reloadData={fetchingDevicesList}
      />

      {/* DIALOG DELETE DEVICES */}
      <DialogConfirmation
        title='Delete Device'
        caption='Are you sure you want to delete this device?'
        dialogConfirmationObject={dialogDeleteDevice}
        setDialogConfirmationObject={setDialogDeleteDevice}
        cancelButtonText='Cancel'
        continueButtonText='Delete'
        onContinueButtonClick={() => handleDeleteDevicesClick()}
        onCancelButtonClick={() => setDialogDeleteDevice({})}
      />
    </>
  )
}

export default Devices