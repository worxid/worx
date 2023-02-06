import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

// COMPONENTS
import BoxAnswer from '../BoxAnswer'
import CircularProgress from '@mui/material/CircularProgress'
import DialogConfirmation from 'components/DialogConfirmation/DialogConfirmation'
import Flyout from 'components/Flyout/Flyout'
import FlyoutContent from 'components/Flyout/FlyoutContent'
import FlyoutHeader from 'components/Flyout/FlyoutHeader'

// CONTEXTS
import { PrivateLayoutContext } from 'contexts/PrivateLayoutContext'
import { AllPagesContext } from 'contexts/AllPagesContext'

// HOOK
import useAxiosPrivate from 'hooks/useAxiosPrivate'

// MUIS
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

// MUI ICONS
import IconCalendarToday from '@mui/icons-material/CalendarToday'
import IconDelete from '@mui/icons-material/Delete'
import IconDownload from '@mui/icons-material/Download'
import IconFileCopy from '@mui/icons-material/FileCopy'
import IconPictureAsPdf from '@mui/icons-material/PictureAsPdf'
import IconRoom from '@mui/icons-material/Room'

// SERVICES
import { getSubmissionListDetail, postExportSubmissionDetail } from 'services/worx/form'
import { deleteFormTemplate } from 'services/worx/formTemplate'

// STYLES
import useStyles from './useStylesSubmissionDetailFlyout'

// UTILS
import { didSuccessfullyCallTheApi, wasAccessTokenExpired, wasRequestCanceled } from 'utilities/validation'
import { getDefaultErrorMessage } from 'utilities/object'
import { convertDate } from 'utilities/date'
import { downloadFileFromFileObject } from 'utilities/file'

const SubmissionDetailFlyout = (props) => {
  const { submissionId } = props
  const axiosPrivate = useAxiosPrivate()
  const classes = useStyles()
  const navigate = useNavigate()

  // CONTEXT
  const { setSnackbarObject } = useContext(AllPagesContext)
  const { setIsFlyoutOpen } = useContext(PrivateLayoutContext)

  const [anchorEl, setAnchorEl] = useState(null)
  const [isLoadingDownload, setIsLoadingDownload] = useState(false)
  const [submissionDetail, setSubmissionDetail] = useState({})
  const [dialogDeleteForm, setDialogDeleteForm] = useState({})

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

  const handleDownloadMenuClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleDownloadMenuClose = () => {
    setAnchorEl(null)
  }

  const handleDownloadIconButtonClick = async (format = 'pdf') => {
    handleDownloadMenuClose()
    setIsLoadingDownload(true)
    const abortController = new AbortController()

    const resultDownload = await postExportSubmissionDetail(
      abortController.signal,
      { form_id: submissionDetail.id },
      axiosPrivate,
    )

    if (didSuccessfullyCallTheApi(resultDownload.status)) {
      downloadFileFromFileObject(
        new Blob([ resultDownload.data ]),
        `Submission Detail_${submissionDetail?.label}_${submissionDetail.id}.${format}`,
      )
    }
    else if (!wasRequestCanceled(resultDownload?.status) && !wasAccessTokenExpired(resultDownload.status)) {
      setSnackbarObject(getDefaultErrorMessage(resultDownload))
    }

    setIsLoadingDownload(false)
  }

  const handleDeleteForm = async () => {
    setDialogDeleteForm({})
    const abortController = new AbortController()

    const response = await deleteFormTemplate(
      abortController.signal, 
      axiosPrivate,
      { ids: [submissionDetail.template_id] }, 
    )

    if (didSuccessfullyCallTheApi(response?.status)) {
      setSnackbarObject({
        open: true,
        severity:'success',
        title:'',
        message:'Form deleted successfully'
      })

      navigate('/forms')
    } 
    else if (!wasRequestCanceled(response?.status) && !wasAccessTokenExpired(response.status)) {
      setSnackbarObject(getDefaultErrorMessage(response))
    }
  }

  useEffect(() => {
    const abortController = new AbortController()
    getSubmissionDetail(abortController, submissionId)

    return () => abortController.abort()
  }, [submissionId])

  return (
    <>
      <Flyout onCloseButtonClick={() => setIsFlyoutOpen(false)}>
        {/* TITLE */}
        <FlyoutHeader>
          {/* TEXT */}
          <Typography 
            variant='h5' 
            className='fontWeight500'
            noWrap
          >
            {submissionDetail?.label}
          </Typography>

          <Stack direction='row' alignItems='center'>
            {!isLoadingDownload && (<IconButton
              id='menu-download-button'
              aria-controls={Boolean(anchorEl) ? 'menu-download' : undefined}
              aria-haspopup='true'
              aria-expanded={Boolean(anchorEl) ? 'true' : undefined}
              onClick={handleDownloadMenuClick}
              className='no-zoom'
            >
              <IconDownload className='zoom'/>
            </IconButton>)}

            {isLoadingDownload && <CircularProgress color='primary' size={20} />}

            <IconButton color='primary' onClick={() => setDialogDeleteForm(true)}>
              <IconDelete />
            </IconButton>

            {/* CUSTOMIZE COLUMNS MENU */}
            <Menu
              id='menu-download'
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleDownloadMenuClose}
              MenuListProps={{
                'aria-labelledby': 'menu-download-button',
              }}
              className={`${classes.menuDownload} neutralize-zoom-menu`}
            >
              <MenuItem onClick={() => handleDownloadIconButtonClick('pdf')}>
                <ListItemIcon>
                  <IconPictureAsPdf fontSize='small' className={classes.iconDownloadItem}/>
                </ListItemIcon>
                <Typography variant='subtitle2'>
                  PDF
                </Typography>
              </MenuItem>

              <MenuItem onClick={() => handleDownloadIconButtonClick('docx')}>
                <ListItemIcon>
                  <IconFileCopy fontSize='small' className={classes.iconDownloadItem}/>
                </ListItemIcon>
                <Typography variant='subtitle2'>
                  DOCX
                </Typography>
              </MenuItem>
            </Menu>
          </Stack>
        </FlyoutHeader>

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
          <Typography variant='h6' fontWeight={400}>Submission Result</Typography>

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

      {/* DELETE CONFIRMATION */}
      <DialogConfirmation
        title='Delete Form'
        caption='The data in the form will also be deleted, are you sure you want to delete the form?'
        dialogConfirmationObject={dialogDeleteForm}
        setDialogConfirmationObject={setDialogDeleteForm}
        cancelButtonText='Cancel'
        continueButtonText='Delete'
        onContinueButtonClick={() => handleDeleteForm()}
        onCancelButtonClick={() => setDialogDeleteForm({})}
      />
    </>
  )
}

export default SubmissionDetailFlyout