import { useState } from 'react'

// MUIS
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

// MUI ICONS
import IconAdjust from '@mui/icons-material/Adjust'
import IconAssignmentInd from '@mui/icons-material/AssignmentInd'
import IconReceipt from '@mui/icons-material/Receipt'
import IconPhoneIphone from '@mui/icons-material/PhoneIphone'
import IconSecurityUpdate from '@mui/icons-material/SecurityUpdate'
import IconSmartphone from '@mui/icons-material/Smartphone'
import IconGroups from '@mui/icons-material/Groups'

// STYLES
import useLayoutStyles from 'styles/layoutPrivate'

// UTILITIES
import { getExpandOrCollapseIcon } from 'utilities/component'

const DevicesFlyout = (props) => {
  const { rows } = props

  const layoutClasses = useLayoutStyles()

  const mainMenuIconList = [
    IconAdjust,
    IconAssignmentInd,
    IconReceipt,
    IconPhoneIphone,
    IconSecurityUpdate,
    IconSmartphone,
    IconGroups,
  ]

  let mainMenuList = []
  if (rows.length === 1) {
    mainMenuList = Object.keys(rows[0])
      .filter(key => key !== 'id')
      .map((key, index) => {
        return {
          title: key,
          value: rows[0][key],
          icon: mainMenuIconList[index],
        }
      })
  }

  const [ isMainMenuExpanded, setIsMainMenuExpanded ] = useState(true)

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
        <Typography
          variant='subtitle1'
          className='fontWeight500'
        >
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
      <Collapse 
        in={isMainMenuExpanded} 
        timeout='auto' 
        unmountOnExit
      >
        {rows.length === 1 &&
        <List>
          {mainMenuList.map((item, index) => (
            <ListItem
              key={index}
              disablePadding
            >
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
                    sx={{
                      textTransform: 'capitalize'
                    }}
                  >
                    {item.title}
                  </Typography>
                }
                secondary={
                  <Typography variant='body2'>
                    {item.value}
                  </Typography>
                }
              />

              {/* ACTION */}
              {item.title === 'status' ?
                item.value === 'Pending' ?
                  <Box className={layoutClasses.flyoutRowActionButtons}>
                    <Button
                      variant='contained'
                      className={[layoutClasses.flyoutListItemActionButton, layoutClasses.flyoutListItemRejectButton]}
                    >
                      Reject
                    </Button>
                    <Button
                      variant='contained'
                      className={[layoutClasses.flyoutListItemActionButton, layoutClasses.flyoutListItemApproveButton]}
                    >
                      Approve
                    </Button>
                  </Box>
                  : item.value === 'Approved' || item.value === 'Rejected' ? <Box>
                    <Button
                      variant='contained'
                      className={layoutClasses.flyoutListItemActionButton}
                    >
                      Change Group
                    </Button></Box>
                    : <Box></Box>
                : <Box></Box>
              }
            </ListItem>
          ))}
        </List>}
      </Collapse>
    </>
  )
}

export default DevicesFlyout