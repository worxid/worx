import { useState, useEffect, useContext } from 'react'

// COMPONENTS
import FlyoutActionableItem from 'components/FlyoutActionableItem/FlyoutActionableItem'

// CONTEXTS
import { AllPagesContext } from 'contexts/AllPagesContext'

// HOOKS
import useAxiosPrivate from 'hooks/useAxiosPrivate'

// MUIS
import Button from '@mui/material/Button'
import List from '@mui/material/List'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

// MUI ICONS
import IconArrowForwardIos from '@mui/icons-material/ArrowForwardIos'
import IconPhoneIphone from '@mui/icons-material/PhoneIphone'
import IconWeb from '@mui/icons-material/Web'

// SERVICES
import { postSearchFormSubmissionList } from 'services/worx/form'

// STYLES
import useStyles from './formsFlyoutUseStyles'

// UTILITIES
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
  const axiosPrivate = useAxiosPrivate()

  const { setSnackbarObject } = useContext(AllPagesContext)

  // STATES
  const [ currentForm, setCurrentForm ] = useState(0)
  const [ currentPage, setCurrentPage ] = useState(1)
  const [ submissionData, setSubmissionData ] = useState([])

  // GET SUBMISSIONS VIEW ALL URL
  const getSubmissionsViewAllUrl = () => {
    if(rows.length === 1) return `/forms/submissions?formTemplateId=${rows[0].id}`
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
        <Stack>
          <Typography variant='h6' fontWeight={400}>Submissions</Typography>
          <Typography variant='body2' color='text.secondary'>
            {rows[0]?.submission_count} Responses
          </Typography>
        </Stack>

        {/* ACTION */}
        <Button
          variant='text'
          className={classes.actionViewAll}
          href={getSubmissionsViewAllUrl()}
        >
          View All
        </Button>
      </Stack>

      {/* LIST */}
      <List className={classes.submissionList}>
        {submissionData?.content?.map((item, index) => (
          <FlyoutActionableItem
            key={index}
            icon={item?.source?.label === 'web_browser' ? IconWeb : IconPhoneIphone}
            primaryText={item?.source?.label ? item?.source?.label?.replace(/_/g, ' ') : '[No Label]'}
            secondaryText={convertDate(item.submit_date)}
            actionTooltip='View Submission'
            actionIcon={IconArrowForwardIos}
            actionIconHref={`${getSubmissionsViewAllUrl()}&submissionId=${item.id}`}
          />
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
    </>
  )
}

export default Submissions