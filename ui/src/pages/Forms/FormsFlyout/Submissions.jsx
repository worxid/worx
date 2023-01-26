import { useState, useEffect, useContext } from 'react'

// CONTEXTS
import { AllPagesContext } from 'contexts/AllPagesContext'

// HOOKS
import useAxiosPrivate from 'hooks/useAxiosPrivate'

// MUIS
import Button from '@mui/material/Button'
import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'
import Link from '@mui/material/Link'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

// MUI ICONS
import IconAssignment from '@mui/icons-material/Assignment'
import IconPhoneIphone from '@mui/icons-material/PhoneIphone'

// SERVICES
import { postSearchFormSubmissionList } from 'services/worx/form'

// STYLES
import useLayoutStyles from 'styles/layoutPrivate'
import useStyles from './formsFlyoutUseStyles'

// UTILITIES
import { getExpandOrCollapseIcon } from 'utilities/component'
import { convertDate } from 'utilities/date'
import { getDefaultErrorMessage } from 'utilities/object'
import { 
  didSuccessfullyCallTheApi, 
  wasAccessTokenExpired,
  wasRequestCanceled,
} from 'utilities/validation'

const Submissions = (props) => {
  const { rows } = props

  const classes = useStyles()
  const layoutClasses = useLayoutStyles()
  const axiosPrivate = useAxiosPrivate()

  const { setSnackbarObject } = useContext(AllPagesContext)

  // STATES
  const [ currentForm, setCurrentForm ] = useState(0)
  const [ currentPage, setCurrentPage ] = useState(1)
  const [ isSubmissionsExpanded, setIsSubmissionsExpanded ] = useState(true)
  const [ submissionData, setSubmissionData ] = useState([])

  // GET SUBMISSIONS VIEW ALL URL
  const getSubmissionsViewAllUrl = () => {
    if(rows.length === 1) return `/forms/submissions/${rows[0].id}`
    else return '#'
  }

  // GET SUBMISSION LIST
  const getSubmissionList = async (inputSignal, inputIsMounted) => {
    const response = await postSearchFormSubmissionList(
      inputSignal.signal, 
      {
        page: currentPage - 1,
        size: 10,
        sort: 'submit_date,desc',
      },
      {
        template_id: rows[0].id,
      }, 
      axiosPrivate,
    )

    if (didSuccessfullyCallTheApi(response?.status) && inputIsMounted) {
      setSubmissionData(response?.data)
    }
    else if (!wasRequestCanceled(response?.status) && !wasAccessTokenExpired(response.status)) {
      setSnackbarObject(getDefaultErrorMessage(response))
    }
  }

  useEffect(() => {
    let isMounted = true
    const abortController = new AbortController()

    if(currentForm !== rows[0]?.id) {
      setCurrentForm(rows[0]?.id)
      setCurrentPage(1)
    }

    rows.length === 1 && getSubmissionList(abortController, isMounted)

    return () => {
      isMounted = false
      abortController.abort()
    }
  }, [rows, currentPage])

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
                fontWeight={600}
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
          {submissionData?.content?.map((item, index) => (
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
                    className='textCapitalize colorTextSecondary' 
                    fontWeight={600}
                  >
                    {item?.source?.label ? item?.source?.label?.replace(/_/g, ' ') : '[No Label]'}
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
                href={`/forms/submission-detail?formTemplateId=${rows[0]?.id}&submissionId=${item.id}`}
                underline='none'
                className={layoutClasses.flyoutListItemActionLink}
              >
                View
              </Link>
            </ListItem>
          ))}
        </List>

        {/* PAGINATION */}
        {submissionData?.content?.length ? (
          <Pagination
            className={classes.pagination}
            count={submissionData?.totalPages}
            defaultPage={1}
            siblingCount={0}
            onChange={(event, page) => setCurrentPage(page)}
            shape='rounded'
          />
        ) : ''}
      </Collapse>
    </>
  )
}

export default Submissions