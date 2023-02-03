import { useState, useEffect, useContext } from 'react'

// COMPONENTS
import AppBar from 'components/AppBar/AppBar'
import DataGridFilters from 'components/DataGridFilters/DataGridFilters'
import DataGridTable from 'components/DataGridTable/DataGridTable'
import CellGroups from 'components/DataGridRenderCell/CellGroups'
import DeviceFlyout from './DeviceFlyout/DeviceFlyout'
import DialogConfirmation from 'components/DialogConfirmation/DialogConfirmation'
import DialogInvite from './DialogInvite/DialogInvite'
import LoadingPaper from 'components/LoadingPaper/LoadingPaper'
import MenuChangeGroup from 'components/MenuChangeGroup/MenuChangeGroup'

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
import { 
  deleteDevices, 
  postGetDeviceList, 
} from 'services/worx/devices'

// STYLES
import useLayoutStyles from './devicesUseStyles'

// UTILITIES
import { getDeviceStatusColor } from 'utilities/component'
import { getDefaultErrorMessage } from 'utilities/object'
import { 
  didSuccessfullyCallTheApi, 
  wasAccessTokenExpired,
  wasRequestCanceled,
} from 'utilities/validation'

const Devices = () => {
  const classes = useLayoutStyles()

  const axiosPrivate = useAxiosPrivate()

  // CONTEXT
  const { setSnackbarObject } = useContext(AllPagesContext)
  const { 
    setIsDialogFormOpen, 
    setIsFlyoutOpen,
  } = useContext(PrivateLayoutContext)

  const initialFilters = {
    label: '',
    device_code: '',
    device_model: '',
    device_os_version: '',
    device_app_version: '',
    groups: [],
  }

  const initialColumns = [
    {
      field: 'device_status',
      headerName: 'Status',
      flex: 1,
      minWidth: 125,
      hide: false,
      isFilterShown: true,
      isSortShown: true,
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
      isFilterShown: true,
      isSortShown: true,
    },
    {
      field: 'device_code',
      headerName: 'Identifier',
      flex: 1,
      minWidth: 200,
      hide: false,
      isFilterShown: true,
      isSortShown: true,
    },
    {
      field: 'device_model',
      headerName: 'Device Model',
      flex: 1,
      minWidth: 150,
      hide: false,
      isFilterShown: true,
      isSortShown: true,
    },
    {
      field: 'device_os_version',
      headerName: 'Device Version',
      flex: 1,
      minWidth: 125,
      hide: false,
      isFilterShown: true,
      isSortShown: true,
    },
    {
      field: 'device_app_version',
      headerName: 'Device App Version',
      flex: 1,
      minWidth: 150,
      hide: false,
      isFilterShown: true,
      isSortShown: true,
    },
    {
      field: 'groups',
      headerName: 'Groups',
      flex: 1,
      minWidth: 380,
      hide: false,
      isFilterShown: true,
      isSortShown: true,
      renderCell: (params) =>
        params.value && (
          <CellGroups dataValue={params.value.map(item => ({ name: item }))} />
        ),
    }
  ]

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
  const [ dialogDeleteDevice, setDialogDeleteDevice ] = useState({})

  // FETCH TABLE DATA
  const fetchDeviceList = async (abortController, isMounted) => {
    let requestParams = {
      page: pageNumber,
      size: pageSize,
    }

    if (orderBy && order) requestParams.sort = `${orderBy},${order}`

    const response = await postGetDeviceList(
      abortController.signal,
      requestParams,
      {
        ...filters,
        global_search: pageSearch,
      },
      axiosPrivate,
    )

    if (didSuccessfullyCallTheApi(response?.status) && isMounted) {
      setTableData(response.data.content)
      setTotalRow(response.data.totalElements)
    }
    else if (!wasRequestCanceled(response?.status) && !wasAccessTokenExpired(response.status)) {
      setSnackbarObject(getDefaultErrorMessage(response))
    }

    isDataGridLoading && setIsDataGridLoading(false)
  }

  // HANDLE DELETE BUTTON CLICKED
  const handleDeleteDevicesClick = async () => {
    setIsDataGridLoading(true)

    const abortController = new AbortController()

    setDialogDeleteDevice({})
    setIsFlyoutOpen(false)

    if(selectionModel.length >= 1) {
      // CURRENTLY JUST CAN DELETE 1 ITEM
      const response = await deleteDevices(
        abortController.signal, 
        axiosPrivate,
        {
          ids: selectionModel
        }
      )

      if (didSuccessfullyCallTheApi(response?.status)) {
        fetchDeviceList(abortController.signal, true)

        setSnackbarObject({
          open: true,
          severity: 'success',
          title: '',
          message: 'Device deleted successfully'
        })

        setSelectionModel([])
      }
      else if (!wasRequestCanceled(response?.status) && !wasAccessTokenExpired(response.status)) {
        setSnackbarObject(getDefaultErrorMessage(response))
      }
    }

    setIsDataGridLoading(false)
  }

  // SIDE EFFECT FETCHING DATA
  useEffect(() => {
    let isMounted = true
    const abortController = new AbortController()

    fetchDeviceList(abortController, isMounted)

    return () => {
      isMounted = false
      abortController.abort()
    }
  }, [filters, pageNumber, pageSize, pageSearch, order, orderBy])

  useEffect(() => {
    if (selectionModel.length === 1) setIsFlyoutOpen(true)
    else setIsFlyoutOpen(false)
  }, [selectionModel])

  return (
    <>
      {/* APP BAR */}
      <AppBar
        hasFab={true}
        onFabClick={() => setIsDialogFormOpen('dialogInvite')}
        pageTitle='Devices'
        hasSearch={true}
        search={pageSearch}
        setSearch={setPageSearch}
      />

      {/* CONTENTS */}
      <Stack 
        direction='row'
        position='relative'
        flex='1'
        height='100%'
        className='contentContainer'
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
        <DeviceFlyout
          rows={tableData.filter(item => selectionModel.includes(item.id))}
          reloadData={fetchDeviceList}
          setGroupData={setGroupData}
          handleDeleteDevicesClick={handleDeleteDevicesClick}
        />
      </Stack>

      {/* MENU CHANGE GROUP */}
      <MenuChangeGroup
        selectedGroupList={groupData.map(item => ({ name: item }))}
        page='devices'
        selectedItemId={selectionModel[0]}
        reloadData={fetchDeviceList}
      />

      {/* DIALOG DELETE DEVICES */}
      <DialogConfirmation
        title={`Delete ${selectionModel.length >= 2 ? 'Devices' : 'Device'}`}
        caption={`Are you sure you want to delete ${selectionModel.length >= 2 ? 'these devices' : 'this device'}?`}
        dialogConfirmationObject={dialogDeleteDevice}
        setDialogConfirmationObject={setDialogDeleteDevice}
        cancelButtonText='Cancel'
        continueButtonText='Delete'
        onContinueButtonClick={() => handleDeleteDevicesClick()}
        onCancelButtonClick={() => setDialogDeleteDevice({})}
      />

      {/* DIALOG INVITE */}
      <DialogInvite />
    </>
  )
}

export default Devices