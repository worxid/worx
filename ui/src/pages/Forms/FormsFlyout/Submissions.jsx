import { useState, useEffect } from 'react'

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
import IconPhoneIphone from '@mui/icons-material/PhoneIphone'

// SERVICES
import { postSearchFormSubmissionList } from 'services/form'

// STYLES
import useLayoutStyles from 'styles/layoutPrivate'

// UTILITIES
import { getExpandOrCollapseIcon } from 'utilities/component'
import { convertDate } from 'utilities/date'

const Submissions = (props) => {
  const { rows } = props

  const layoutClasses = useLayoutStyles()

  // STATES
  const [ isSubmissionsExpanded, setIsSubmissionsExpanded ] = useState(true)
  const [ submissionList, setSubmissionList ] = useState([])

  // GET SUBMISSIONS VIEW ALL URL
  const getSubmissionsViewAllUrl = () => {
    if(rows.length === 1) return `/forms/${rows[0].id}/submissions`
    else return '#'
  }

  // GET SUBMISSION LIST
  const getSubmissionList = async (inputSignal) => {
    const response = await postSearchFormSubmissionList(inputSignal.signal, {
      page: 0,
      size: 10
    }, {
      template_id: rows[0].id,
    })

    setSubmissionList(response?.data?.content)
  }

  console.log({ submissionList })

  useEffect(() => {
    const abortController = new AbortController()
    rows.length === 1 && getSubmissionList(abortController)

    return () => abortController.abort()
  }, [rows])

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
        <Typography variant='subtitle1' className='fontWeight500'>
          Submissions
        </Typography>

        {/*EXPAND/COLLAPSE ICON  */}
        <IconButton 
          size='small'
          onClick={() => setIsSubmissionsExpanded(current => !current)}
        >
          {getExpandOrCollapseIcon(isSubmissionsExpanded, 'small')}
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
                {rows[0]?.submission_count}
              </Typography>
            }
          />

          {/* ACTION */}
          <Button
            variant='contained'
            className={layoutClasses.flyoutListItemActionButton}
            href={getSubmissionsViewAllUrl()}
          >
            View All
          </Button>
        </ListItem>

        {/* LIST */}
        <List>
          {submissionList?.map((item, index) => (
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
                  <Typography variant='caption' className='colorTextSecondary'>
                    Device X*
                  </Typography>
                }
                secondary={
                  <Typography variant='body2'>
                    {convertDate(item.submit_date)}
                  </Typography>
                }
              />

              {/* ACTION */}
              <Link
                href={`/forms/${item.id}/view`}
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