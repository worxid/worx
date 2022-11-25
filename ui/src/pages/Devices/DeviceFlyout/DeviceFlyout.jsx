import { useState, useContext } from 'react'

// COMPONENTS
import CellGroups from 'components/DataGridRenderCell/CellGroups'

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
import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

// SERVICES
import { putApprovedDevices } from 'services/devices'

// STYLES
import useLayoutStyles from 'styles/layoutPrivate'

// UTILITIES
import { getExpandOrCollapseIcon } from 'utilities/component'
import { 
  didSuccessfullyCallTheApi, 
  wasRequestCanceled,
} from 'utilities/validation'

const DevicesFlyout = (props) => {
  const { rows, setGroupData, reloadData } = props

  const layoutClasses = useLayoutStyles()

  const { setIsDialogFormOpen } = useContext(PrivateLayoutContext)
  const { setSnackbarObject } = useContext(AllPagesContext)

  const axiosPrivate = useAxiosPrivate()

  let mainMenuList = []

  if (rows.length === 1) {
    mainMenuList = mainMenuTitleList.map(((item, index) => {
      return {
        title: item,
        value: rows[0][mainMenuKeyList[index]],
        icon: mainMenuIconList[index],
      }
    }))
  }

  const [ isMainMenuExpanded, setIsMainMenuExpanded ] = useState(true)

  const handleChangeGroup = () => {
    setGroupData(rows[0].groups)
    setIsDialogFormOpen('dialogChangeGroup')
  }

  const handleApprovedDevices = async (type) => {
    let message
    const abortController = new AbortController()
    const response = await putApprovedDevices(
      rows[0].id,
      abortController.signal,
      {
        is_approved: type === 'approved' ? true : false
      },
      axiosPrivate,
    )

    if (didSuccessfullyCallTheApi(response?.status)) {
      if (response?.data?.value?.device_status === 'APPROVED') {
        message = {
          severity:'success',
          title: '',
          message: `Device ${rows[0].label} has been approved`,
        }
      } else if (response?.data?.value?.device_status === 'DENIED') {
        message = {
          severity:'error',
          title: '',
          message: `Device ${rows[0].label} has been rejected`,
        }
      }

      reloadData(abortController.signal, true)
    } 
    else if (!wasRequestCanceled(response?.status)) {
      message = {
        severity:'error',
        title: response?.data?.error?.status?.replaceAll('_', ' ') || '',
        message: response?.data?.error?.message || 'Something went wrong',
      }
    }

    setSnackbarObject({
      open: true,
      ...message,
    })
  }

  return (
    <>
      {/* HEADER */}
      <Stack 
        direction='row'
        justifyContent='space-between'
        alignItems='center'
        marginBottom='8px'
      >
        {/* TITLE */}
        <Typography variant='subtitle1' className='fontWeight500' >
          Device Info
        </Typography>

        {/* EXPAND/COLLAPSE ICON  */}
        <IconButton 
          size='small'
          onClick={() => setIsMainMenuExpanded(current => !current)}
        >
          {getExpandOrCollapseIcon(isMainMenuExpanded, 'small')}
        </IconButton>
      </Stack>

      {/* LIST */}
      <Collapse in={isMainMenuExpanded} timeout='auto' unmountOnExit>
        {rows.length === 1 &&
        <List>
          {mainMenuList.map((item, index) => (
            <ListItem key={index} disablePadding>
              {/* ICON */}
              <ListItemIcon className={layoutClasses.flyoutListItemIcon}>
                <item.icon/>
              </ListItemIcon>

              {/* TEXT */}
              <ListItemText
                primary={
                  <Typography 
                    variant='caption'
                    className='colorTextSecondary'
                    fontWeight={600}
                  >
                    {item.title}
                  </Typography>
                }
                secondary={
                  item.title === 'Groups'
                    ? <Stack className='colorTextPrimary'>
                      <CellGroups
                        dataValue={item.value.map(item => ({ name: item }))}
                        limitShowGroup={false}
                      />
                    </Stack>
                    : <Typography variant='body2'>
                      {item.value}
                    </Typography>
                }
              />

              {/* ACTION */}
              {item.title === 'Status' &&
                <>
                  {
                    item.value === 'PENDING' &&
                  (<Stack direction='row' spacing='8px'>
                    <Button
                      variant='contained'
                      className={`${layoutClasses.flyoutListItemActionButton} ${layoutClasses.flyoutListItemRejectButton}`}
                      onClick={() => handleApprovedDevices('reject')}
                    >
                      Reject
                    </Button>
                    <Button
                      variant='contained'
                      className={`${layoutClasses.flyoutListItemActionButton} ${layoutClasses.flyoutListItemApproveButton}`}
                      onClick={() => handleApprovedDevices('approved')}
                    >
                      Approve
                    </Button>
                  </Stack>)
                  }
                  {
                    (item.value === 'APPROVED' || item.value === 'ONLINE') && (
                      <Button
                        variant='contained'
                        className={layoutClasses.flyoutListItemActionButton}
                        onClick={handleChangeGroup}
                      >
                        Change Group
                      </Button>
                    )
                  }
                </>
              }
            </ListItem>
          ))}
        </List>}
      </Collapse>
    </>
  )
}

export default DevicesFlyout