import { useContext, useEffect, useState } from 'react'

// COMPONENTS
import BoxAnswer from '../BoxAnswer'
import Flyout from 'components/Flyout/Flyout'
import FlyoutContent from 'components/Flyout/FlyoutContent'
import FlyoutTitle from 'components/Flyout/FlyoutTitle'

// CONTEXTS
import { PrivateLayoutContext } from 'contexts/PrivateLayoutContext'
import { AllPagesContext } from 'contexts/AllPagesContext'

// HOOK
import useAxiosPrivate from 'hooks/useAxiosPrivate'

// MUIS
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import MenuItem from '@mui/material/MenuItem'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

// MUI ICONS
import IconCalendarToday from '@mui/icons-material/CalendarToday'
import IconDelete from '@mui/icons-material/Delete'
import IconDownload from '@mui/icons-material/Download'
import IconRoom from '@mui/icons-material/Room'

// SERVICES
import { getSubmissionListDetail } from 'services/worx/form'

// STYLES
import useStyles from '../formsSubmissionsUseStyles'

// UTILS
import { didSuccessfullyCallTheApi, wasAccessTokenExpired, wasRequestCanceled } from 'utilities/validation'
import { getDefaultErrorMessage } from 'utilities/object'
import { convertDate } from 'utilities/date'
import { Menu } from '@mui/material'

const SubmissionDetailFlyout = (props) => {
  const { submissionId } = props
  const axiosPrivate = useAxiosPrivate()
  const classes = useStyles()

  // CONTEXT
  const { setSnackbarObject } = useContext(AllPagesContext)
  const { setIsFlyoutOpen } = useContext(PrivateLayoutContext)

  const [anchorEl, setAnchorEl] = useState(null)
  const [isDownloadMenuOpen, setIsDownloadMenuOpen] = useState(false)
  const [submissionDetail, setSubmissionDetail] = useState({})

  // HANDLE GET SUBMISSION DETAIL
  const getSubmissionDetail = async (inputSignal, inputSubmissionId) => {
    if(!inputSubmissionId) return
    const response = await getSubmissionListDetail(
      inputSignal.signal,
      inputSubmissionId,
      axiosPrivate
    )

    if (didSuccessfullyCallTheApi(response?.status)) {
      setSubmissionDetail(response?.data?.value)
    } 
    else if (!wasRequestCanceled(response?.status) && !wasAccessTokenExpired(response.status)) {
      setSnackbarObject(getDefaultErrorMessage(response))
    }
  }

  // FIND VALUES BY FIELD ID
  const findValuesByFieldId = (inputValues, inputFieldId) => {
    const findValues = inputValues[inputFieldId]
    if(Boolean(findValues)) {
      return findValues
    } else {
      return {}
    }
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  useEffect(() => {
    const abortController = new AbortController()
    getSubmissionDetail(abortController, submissionId)

    return () => abortController.abort()
  }, [submissionId])

  console.log({ submissionDetail })

  return (
    <Flyout 
      position='right'
      onCloseButtonClick={() => setIsFlyoutOpen(false)}
    >
      {/* TITLE */}
      <FlyoutTitle>
        {/* TEXT */}
        <Typography 
          variant='h5' 
          className='fontWeight500'
          noWrap
        >
          {submissionDetail?.label}
        </Typography>

        <Stack direction='row'>
          <IconButton
            id='menu-download-button'
            aria-controls={Boolean(anchorEl) ? 'menu-download' : undefined}
            aria-haspopup='true'
            aria-expanded={Boolean(anchorEl) ? 'true' : undefined}
            onClick={handleClick}
          >
            <IconDownload />
          </IconButton>

          <IconButton color='primary'>
            <IconDelete />
          </IconButton>

          {/* CUSTOMIZE COLUMNS MENU */}
          <Menu
            id='menu-download'
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'menu-download-button',
            }}
            className='neutralize-zoom-menu'
          >
            <MenuItem>
              <Typography
                variant='subtitle2'
                className={classes.columnsMenuText}
              >
                PDF
              </Typography>
            </MenuItem>
          </Menu>
        </Stack>
      </FlyoutTitle>

      {/* CONTENT */}
      <FlyoutContent>
        {/* INFO */}
        <Stack className={classes.flyoutBoxInfo}>
          <List>
            {/* ITEM DETAIL */}
            <ListItem className={classes.flyoutInfoItem}>
              <Stack direction='row' alignItems='center'>
                <IconCalendarToday className={classes.flyoutIconInfo}/>
                <Typography variant='body2' className={classes.flyoutTitleInfo}>
                  Submission Date
                </Typography>
              </Stack>

              <Typography variant='body1' className={classes.flyoutDescInfo}>
                {convertDate(submissionDetail?.submit_date)}
              </Typography>
            </ListItem>

            {/* ITEM DETAIL */}
            <ListItem className={classes.flyoutInfoItem}>
              <Stack direction='row' alignItems='center'>
                <IconRoom className={classes.flyoutIconInfo} />
                <Typography variant='body2' className={classes.flyoutTitleInfo}>
                  Submission Address
                </Typography>
              </Stack>

              <Typography variant='body1' className={classes.flyoutDescInfo}>
                {submissionDetail?.submit_location?.address || '-'}
              </Typography>
            </ListItem>
          </List>
        </Stack>

        {/* SUBMISSION ANSWER */}
        <Typography variant='h6'>Submission Result</Typography>

        <List>
          {submissionDetail?.fields?.map(item => (
            <BoxAnswer
              key={item.id}
              label={item.label}
              values={findValuesByFieldId(submissionDetail.values, item.id)}
              itemFields={submissionDetail.fields.find(itemFind => itemFind.id === item.id)}
              type={item.type}
              attachments={submissionDetail.attachments}
            />
          ))}
        </List>
      </FlyoutContent>
    </Flyout>
  )
}

export default SubmissionDetailFlyout