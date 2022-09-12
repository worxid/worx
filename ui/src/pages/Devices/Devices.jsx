import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

// COMPONENTS
import AppBar from 'components/AppBar/AppBar'
import DataGridFilters from 'components/DataGridFilters/DataGridFilters'
import DataGridTable from 'components/DataGridTable/DataGridTable'
import DialogAddOrEditDevice from './DialogAddOrEditDevice/DialogAddOrEditDevice'
import DialogChangeGroup from './DialogChangeGroup/DialogChangeGroup'
import DialogConfirmation from 'components/DialogConfirmation/DialogConfirmation'
import Flyout from 'components/Flyout/Flyout'
import DeviceFlyout from './DevicesFlyout/DevicesFlyout'
import LoadingPaper from 'components/LoadingPaper/LoadingPaper'

// CONSTANTS
import { dummyTableData } from './devicesConstants'
import { values } from 'constants/values'

// CONTEXTS
import { PrivateLayoutContext } from 'contexts/PrivateLayoutContext'

// MUIS
import Stack from '@mui/material/Stack'

const Devices = () => {  
  const initialColumns = [
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      minWidth: 125,
      hide: false,
      areFilterAndSortShown: true,
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
      field: 'identifier',
      headerName: 'Identifier',
      flex: 1,
      minWidth: 200,
      hide: false,
      areFilterAndSortShown: true,
    },
    {
      field: 'deviceModel',
      headerName: 'Device Model',
      flex: 1,
      minWidth: 150,
      hide: false,
      areFilterAndSortShown: true,
    },
    {
      field: 'deviceVersion',
      headerName: 'Device Version',
      flex: 1,
      minWidth: 125,
      hide: false,
      areFilterAndSortShown: true,
    },
    {
      field: 'deviceAppVersion',
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
      minWidth: 200,
      hide: false,
      areFilterAndSortShown: true,
    }
  ]

  const { setIsDialogAddOrEditOpen } = useContext(PrivateLayoutContext)

  const initialFilters = {}

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
  // FLYOUT
  const [ isFlyoutShown, setIsFlyoutShown ] = useState(false)

  // SELECTED GROUP DATA
  const [ groupData, setGroupData ] = useState([])

  // DELETE DIALOG
  const [ dialogDeleteDevice, setDialogDeleteDevice ] = useState({})

  // DATA EDIT DEVICE
  const [ dataDialogEdit, setDataDialogEdit ] = useState(null)

  useEffect(() => {
    if (selectionModel.length === 1) {
      setIsFlyoutShown(true)
    }
  }, [selectionModel])

  // HANDLE EDIT BUTTON CLICKED
  const handleEditButtonClick = () => {
    const editData = tableData.filter(item => item.id === selectionModel[0])
    setDataDialogEdit(...editData)
    setIsDialogAddOrEditOpen(true)
  }

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
          <DeviceFlyout rows={tableData.filter(item => selectionModel.includes(item.id))} setGroupData={setGroupData} />
        </Flyout>
      </Stack>

      {/* DIALOG CHANGE GROUP */}
      <DialogChangeGroup data={groupData} />
      
      {/* DIALOG EDIT DEVICES */}
      <DialogAddOrEditDevice 
        dataDialogEdit={dataDialogEdit}
        setDataDialogEdit={setDataDialogEdit} 
      />

      {/* DIALOG DELETE DEVICES */}
      <DialogConfirmation
        title='Delete Device'
        caption='Are you sure you want to delete this device?'
        dialogConfirmationObject={dialogDeleteDevice}
        setDialogConfirmationObject={setDialogDeleteDevice}
        cancelButtonText='Cancel'
        continueButtonText='Delete'
        onContinueButtonClick={() => setDialogDeleteDevice({})}
        onCancelButtonClick={() => setDialogDeleteDevice({})}
      />
    </>
  )
}

export default Devices