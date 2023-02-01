import { useState, useEffect, useContext } from 'react'

// COMPONENTS
import CellGroups from 'components/DataGridRenderCell/CellGroups'
import Flyout from 'components/Flyout/Flyout'
import FlyoutContent from 'components/Flyout/FlyoutContent'
import FlyoutEditableTitle from 'components/FlyoutEditableTitle/FlyoutEditableTitle'
import FlyoutHeader from 'components/Flyout/FlyoutHeader'
import FlyoutInformationItem from 'components/FlyoutInformationItem/FlyoutInformationItem'

// CONSTANTS
import { 
  mainMenuIconList,
  mainMenuKeyList,
  mainMenuTitleList,
} from './deviceFlyoutConstants'

// CONTEXTS
import { AllPagesContext } from 'contexts/AllPagesContext'
import { PrivateLayoutContext } from 'contexts/PrivateLayoutContext'

// HOOKS
import useAxiosPrivate from 'hooks/useAxiosPrivate'

// MUIS
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'

// MUI ICONS
import IconDelete from '@mui/icons-material/Delete'
import IconGroups from '@mui/icons-material/Groups'

// SERVICES
import { 
  putApprovedDevices, 
  putUpdateLabelDevices,
} from 'services/worx/devices'

// STYLES
import useLayoutStyles from 'styles/layoutPrivate'

// UTILITIES
import { getDefaultErrorMessage } from 'utilities/object'
import { 
  didSuccessfullyCallTheApi, 
  wasAccessTokenExpired,
  wasRequestCanceled,
} from 'utilities/validation'

const DevicesFlyout = (props) => {
  const { 
    rows, 
    setGroupData, 
    reloadData, 
    handleDeleteDevicesClick,
  } = props

  const layoutClasses = useLayoutStyles()

  const { 
    setIsDialogFormOpen, 
    setIsFlyoutOpen,
  } = useContext(PrivateLayoutContext)
  const { setSnackbarObject } = useContext(AllPagesContext)

  const axiosPrivate = useAxiosPrivate()

  const selectedDevice = rows[0]

  const [ deviceName, setDeviceName ] = useState('')
  const [ isEditMode, setIsEditMode ] = useState(false)

  let mainMenuList = []

  if (rows.length === 1) {
    mainMenuList = mainMenuTitleList.map(((item, index) => {
      return {
        title: item,
        value: selectedDevice[mainMenuKeyList[index]],
        icon: mainMenuIconList[index],
      }
    }))
  }

  const handleChangeGroup = () => {
    setGroupData(selectedDevice.groups)
    setIsDialogFormOpen('dialogChangeGroup')
  }

  const handleApprovedDevices = async (type) => {
    let message

    const abortController = new AbortController()

    const response = await putApprovedDevices(
      selectedDevice.id,
      abortController.signal,
      { is_approved: type === 'approved' ? true : false },
      axiosPrivate,
    )

    if (didSuccessfullyCallTheApi(response?.status)) {
      if (response?.data?.value?.device_status === 'APPROVED') {
        message = {
          severity: 'success',
          title: '',
          message: `Device ${selectedDevice.label} has been approved`,
        }
      } else if (response?.data?.value?.device_status === 'DENIED') {
        message = {
          severity: 'success',
          title: '',
          message: `Device ${selectedDevice.label} has been rejected`,
        }
      }

      reloadData(abortController.signal, true)
    } 
    else if (!wasRequestCanceled(response?.status) && !wasAccessTokenExpired(response.status)) {
      message = getDefaultErrorMessage(response)
    }

    setSnackbarObject({
      open: true,
      ...message,
    })
  }

  const handleSaveDevice = async () => {
    const abortController = new AbortController()

    if (deviceName.length) {
      const response = await putUpdateLabelDevices(
        selectedDevice?.id,
        abortController.signal,
        { label: deviceName },
        axiosPrivate,
      )

      if (didSuccessfullyCallTheApi(response?.status)) {
        setSnackbarObject({
          open: true,
          severity: 'success',
          title: '',
          message: 'Successfully change device',
        })

        reloadData(abortController.signal, true)
      }
      else if (!wasRequestCanceled(response?.status) && !wasAccessTokenExpired(response.status)) {
        setDeviceName(selectedDevice.label)
        setSnackbarObject(getDefaultErrorMessage(response))
      }
    } 
    else {
      setDeviceName(selectedDevice.label)
      setSnackbarObject({
        open: true,
        severity: 'error',
        title: '',
        message: 'Label field must be filled',
      })
    }

    setIsEditMode(false)
  }

  useEffect(() => {
    selectedDevice && setDeviceName(selectedDevice.label)
  }, [selectedDevice])

  return (
    <Flyout 
      position='right'
      onCloseButtonClick={() => setIsFlyoutOpen(false)}
    >
      {/* HEADER */}
      <FlyoutHeader>
        {/* EDITABLE TITLE */}
        <FlyoutEditableTitle
          dialogType='edit'
          titlePlaceholder='Device Name'
          titleValue={deviceName}
          setTitleValue={(event) => setDeviceName(event.target.value)}
          onInputBlur={handleSaveDevice}
          isEditMode={isEditMode}
          setIsEditMode={setIsEditMode}
        />

        {/* ACTIONS */}
        <Stack
          direction='row'
          alignItems='center'
          spacing='8px'
        >
          {/* APPROVE/REJECT BUTTON */}
          {(selectedDevice && selectedDevice.device_status === 'PENDING') &&
          <>
            {/* REJECT */}
            <Button
              variant='contained'
              className={`${layoutClasses.flyoutListItemActionButton} ${layoutClasses.flyoutListItemRejectButton}`}
              onClick={() => handleApprovedDevices('reject')}
            >
              Reject
            </Button>

            {/* APPROVE */}
            <Button
              variant='contained'
              className={`${layoutClasses.flyoutListItemActionButton} ${layoutClasses.flyoutListItemApproveButton}`}
              onClick={() => handleApprovedDevices('approved')}
            >
              Approve
            </Button>
          </>}

          {/* ACTIONS */}
          <Stack
            direction='row'
            alignItems='center'
            spacing='4px'
          >
            {/* CHANGE GROUP ICON */}
            <IconButton 
              size='small'
              onClick={handleChangeGroup}
            >
              <IconGroups/>
            </IconButton>

            {/* DELETE ICON */}
            <IconButton 
              size='small'
              onClick={handleDeleteDevicesClick}
            >
              <IconDelete color='primary'/>
            </IconButton>
          </Stack>

        </Stack>
      </FlyoutHeader>

      {/* LIST */}
      {rows.length === 1 &&
      <FlyoutContent>
        <Stack spacing='12px'>
          {/* GROUP INFORMATION */}
          <FlyoutInformationItem
            icon={IconGroups} 
            title='Group Name'
            value={<CellGroups dataValue={selectedDevice.groups.map(item => ({ name: item }))}/>}
          />

          {/* NON-GROUP INFORMATION */}
          {mainMenuList.map((item, index) => (
            <FlyoutInformationItem
              key={index}
              icon={item.icon} 
              title={item.title}
              value={item.value}
            />
          ))}
        </Stack>
      </FlyoutContent>}
    </Flyout>
  )
}

export default DevicesFlyout