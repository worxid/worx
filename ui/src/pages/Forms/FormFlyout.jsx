import { useState } from 'react'

// MUIS
import Button from '@mui/material/Button'
import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'
import Link from '@mui/material/Link'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

// MUI ICONS
import IconAssignment from '@mui/icons-material/Assignment'
import IconCheckCircle from '@mui/icons-material/CheckCircle'
import IconDateRange from '@mui/icons-material/DateRange'
import IconEventNote from '@mui/icons-material/EventNote'
import IconGroups from '@mui/icons-material/Groups'
import IconKeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown'
import IconKeyboardArrowUp from '@mui/icons-material/KeyboardArrowUp'
import IconNotes from '@mui/icons-material/Notes'
import IconPhoneIphone from '@mui/icons-material/PhoneIphone'
import IconTextSnippet from '@mui/icons-material/TextSnippet'
import IconViewHeadline from '@mui/icons-material/ViewHeadline'

// STYLES
import useLayoutStyles from 'styles/layoutPrivate'

const FormFlyout = (props) => {
  const { rows } = props

  const layoutClasses = useLayoutStyles()

  const mainMenuIconList = [
    IconTextSnippet,
    IconNotes,
    IconEventNote,
    IconDateRange,
    IconGroups,
    IconCheckCircle,
    IconViewHeadline,
    IconTextSnippet,
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

  const dummySubmissionList = [
    {
      title: 'Identifier',
      value: 'Device 1 20-07-2022, 10:10 PM',
    },
    {
      title: 'Identifier',
      value: 'Device 1 20-07-2022, 10:10 PM',
    },
  ]

  const [ isMainMenuExpanded, setIsMainMenuExpanded ] = useState(true)
  const [ isSubmissionsExpanded, setIsSubmissionsExpanded ] = useState(true)

  const getExpandOrCollapseIcon = (inputState) => {
    if (inputState) return <IconKeyboardArrowUp fontSize='small'/>
    else return <IconKeyboardArrowDown fontSize='small'/>
  }

  return (
    <>
      {/* MAIN MENU HEADER */}
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
          Main Menu
        </Typography>

        {/*EXPAND/COLLAPSE ICON  */}
        <IconButton 
          size='small'
          onClick={() => setIsMainMenuExpanded(current => !current)}
        >
          {getExpandOrCollapseIcon(isMainMenuExpanded)}
        </IconButton>
      </Stack>

      {/* MAIN MENU LIST */}
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
              {item.title === 'formTitle' &&
              <Button
                variant='contained'
                className={layoutClasses.flyoutListItemActionButton}
              >
                View All
              </Button>}
            </ListItem>
          ))}
        </List>}
      </Collapse>

      {/* SUBMISSIONS HEADER */}
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
          Submissions
        </Typography>

        {/*EXPAND/COLLAPSE ICON  */}
        <IconButton 
          size='small'
          onClick={() => setIsSubmissionsExpanded(current => !current)}
        >
          {getExpandOrCollapseIcon(isSubmissionsExpanded)}
        </IconButton>
      </Stack>

      {/* SUBMISSIONS LIST */}
      <Collapse 
        in={isSubmissionsExpanded} 
        timeout='auto' 
        unmountOnExit
      >
        {/* TOTAL SUBMISSIONS */}
        <ListItem disablePadding>
          {/* ICON */}
          <ListItemIcon className={layoutClasses.flyoutListItemIcon}>
            <IconAssignment/>
          </ListItemIcon>

          {/* TEXT */}
          <ListItemText
            primary={
              <Typography 
                variant='caption'
                className='colorTextSecondary'
              >
                Total
              </Typography>
            }
            secondary={
              <Typography variant='body2'>
                10
              </Typography>
            }
          />

          {/* ACTION */}
          <Button
            variant='contained'
            className={layoutClasses.flyoutListItemActionButton}
          >
            View All
          </Button>
        </ListItem>

        {/* SUBMISSIONS LIST */}
        <List>
          {dummySubmissionList.map((item, index) => (
            <ListItem 
              key={index}
              disablePadding
            >
              {/* ICON */}
              <ListItemIcon className={layoutClasses.flyoutListItemIcon}>
                <IconPhoneIphone/>
              </ListItemIcon>

              {/* TEXT */}
              <ListItemText
                primary={
                  <Typography 
                    variant='caption'
                    className='colorTextSecondary'
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
              <Link
                href=''
                underline='none'
                className={layoutClasses.flyoutListItemActionLink}
              >
                View
              </Link>
            </ListItem>
          ))}
        </List>
      </Collapse>
    </>
  )
}

export default FormFlyout