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
import IconKeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown'
import IconKeyboardArrowUp from '@mui/icons-material/KeyboardArrowUp'
import IconPhoneIphone from '@mui/icons-material/PhoneIphone'

// STYLES
import useLayoutStyles from 'styles/layoutPrivate'

const Submissions = () => {
  const layoutClasses = useLayoutStyles()

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

  const [ isSubmissionsExpanded, setIsSubmissionsExpanded ] = useState(true)

  const getExpandOrCollapseIcon = (inputState) => {
    if (inputState) return <IconKeyboardArrowUp fontSize='small'/>
    else return <IconKeyboardArrowDown fontSize='small'/>
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

      {/* LIST */}
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

        {/* LIST */}
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

export default Submissions