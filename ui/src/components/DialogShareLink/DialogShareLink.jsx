import { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'

// COMPONENTS
import DialogForm from 'components/DialogForm/DialogForm'

// CONTEXTS
import { AllPagesContext } from 'contexts/AllPagesContext'
import { PrivateLayoutContext } from 'contexts/PrivateLayoutContext'

// HOOKS
import useAxiosPrivate from 'hooks/useAxiosPrivate'

// MUIS
import Autocomplete from '@mui/material/Autocomplete'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import LoadingButton from '@mui/lab/LoadingButton'
import Stack from '@mui/material/Stack'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

// MUI ICONS
import IconClose from '@mui/icons-material/Close'
import IconLink from '@mui/icons-material/Link'
import IconMailOutline from '@mui/icons-material/MailOutline'
import IconQrCode2 from '@mui/icons-material/QrCode2'

// REACT SHARE
import {
  FacebookShareButton, FacebookIcon,
  LinkedinShareButton, LinkedinIcon,
  TwitterShareButton, TwitterIcon,
} from 'react-share'

// SERVICES
import { getGuestShareLinkFormTemplate } from 'services/guest'
import { postShareFormTemplate, postShareLinkFormTemplate } from 'services/formTemplate'

// STYLES
import useStyles from './dialogShareLinkUseStyles'

// UTILITIES
import { 
  didSuccessfullyCallTheApi, 
  isEmailFormatValid, 
  wasRequestCanceled,
} from 'utilities/validation'

const a11yProps = (index) => ({
  id: `simple-tab-${index}`,
  'aria-controls': `simple-tabpanel-${index}`,
})

const DialogShareLink = (props) => {
  const {
    id, code, isShowTabEmail, isShowTabLink,
    isAuth, defaultSelectedTab, hideTabHeader
  } = props

  // STYLES
  const classes = useStyles()

  // CONTEXTS
  const { breakpointType, setSnackbarObject } = useContext(AllPagesContext)
  const { setIsDialogFormOpen } = useContext(PrivateLayoutContext)

  // STATES
  const [currentTab, setCurrentTab] = useState(defaultSelectedTab || 0)
  const [isLoading, setIsLoading] = useState(false)
  const [receivers, setReceivers] = useState([])
  const [formLink, setFormLink] = useState('')

  const axiosPrivate = useAxiosPrivate()

  // HANDLE BUTTON SEND CLICK
  const handleButtonSendClick = async () => {
    const abortController = new AbortController()
    setIsLoading(true)
    let message = {}
    let isValidEmail

    if (receivers.length) {
      // VALIDATE EMAIL EVERY ITEM
      for (let item of receivers) {
        if (isEmailFormatValid(item)) {
          isValidEmail = true
        } 
        else {
          isValidEmail = false
          break
        }
      }

      if(isValidEmail) {
        const response = await postShareFormTemplate(id, abortController.signal,
          { recipients: receivers },
          axiosPrivate,
        )
  
        if (didSuccessfullyCallTheApi(response?.status)) {
          message = {
            severity: 'success',
            title: '',
            message: 'Successfully sent the form via email'
          }

          setReceivers([])
          setIsDialogFormOpen(false)
        } 
        else if (!wasRequestCanceled(response?.status)) {
          message = {
            severity: 'error',
            title: response?.data?.error?.status?.replaceAll('_', ' ') || '',
            message: response?.data?.error?.message || 'Something went wrong',
          }
        }
      } 
      else {
        message = {
          severity: 'error',
          title: '',
          message: 'Email format must be valid',
        }
      }
    } 
    else {
      message = {
        severity:'error',
        title:'',
        message:'Email field must be filled'
      }
    }

    setSnackbarObject({
      open: true,
      ...message,
    })

    setIsLoading(false)
    abortController.abort()
  }

  // HANDLE BUTTON COPY CLICK
  const handleButtonCopyClick = (event, text) => {
    navigator.clipboard.writeText(text)
    setSnackbarObject({
      open: true,
      severity:'success',
      title:'',
      message:'Copied to clipboard'
    })
  }

  // FETCH SHARE LINK
  const fetchShareLink = async (abortController) => {
    const response = isAuth
      ? await postShareLinkFormTemplate(id, abortController.signal, axiosPrivate)
      : await getGuestShareLinkFormTemplate(abortController.signal, {
        code,
      })

    if (didSuccessfullyCallTheApi(response?.status)) {
      setFormLink(response.data.value.link)
    } else if (!wasRequestCanceled(response?.status)) {
      setFormLink('')
      setSnackbarObject({
        open: true,
        severity:'error',
        title: response?.data?.error?.status?.replaceAll('_', ' ') || '',
        message: response?.data?.error?.message || 'Something went wrong',
      })
    }
  }

  useEffect(() => {
    const abortController = new AbortController()
    if (id || code) fetchShareLink(abortController)

    return () => abortController.abort()
  }, [id, code])

  return (
    <DialogForm
      isLoading={isLoading}
      dialogName='dialogShareLink'
      title={<Stack direction='row' alignItems='center'>
        <Typography variant='subtitle1' fontWeight={500} flex={1}>Share Form</Typography>

        <IconButton onClick={() => {
          setReceivers([])
          setIsDialogFormOpen(false)
        }}>
          <IconClose fontSize='small'/>
        </IconButton>
      </Stack>}
      areActionsAvailable={false}
      classNames={classes.dialogShareLink}
    >
      {!hideTabHeader
        ? (
          <Tabs className={classes.tabs} value={currentTab} onChange={(event, newValue) => setCurrentTab(newValue)}>
            {isShowTabEmail && <Tab icon={breakpointType !== 'xs' && <IconMailOutline fontSize='small'/>} iconPosition='start' label='Email' {...a11yProps(0)} />}
            {isShowTabLink && <Tab icon={breakpointType !== 'xs' && <IconLink fontSize='small'/>} iconPosition='start' label='Link' {...a11yProps(1)} />}
          </Tabs>
        )
        : <Divider />
      }

      {/* CONTENT SHARE EMAIL */}
      {(currentTab === 0 && isShowTabEmail) && (
        <Stack className={classes.content}>
          <Typography variant='subtitle2' className='fontWeight400'>Share on email</Typography>
          <Typography variant='caption' color='text.secondary'>Share a direct link to your form via email</Typography>

          <Stack direction='row' alignItems='center' marginTop={'20px'} className={classes.inputWrap}>
            {/* RECEVIVERS EMAIL */}
            <Autocomplete
              className={classes.inputEmailAutocomplete}
              fullWidth
              disableClearable
              multiple
              options={[]}
              defaultValue={[]}
              freeSolo
              onChange={(event, value) => setReceivers((state) => value)}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => {
                  return (
                    <Chip
                      className={`${classes.chipCustom} heightFitContent`}
                      size='small'
                      key={index}
                      label={option}
                      {...getTagProps({ index })}
                    />
                  )
                })
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label='Add email'
                  color='secondary'
                />
              )}
            />
      
            {/* BUTTON SEND FORM */}
            <Stack className={classes.actionWrap}>
              <LoadingButton
                size='small'
                variant='contained'
                className={`${classes.buttonRedPrimary} heightFitContent`}
                onClick={() => handleButtonSendClick()}
                loading={isLoading}
              >
                Send Form
              </LoadingButton>
            </Stack>
          </Stack>
        </Stack>
      )}

      {/* CONTENT DIRECT LINK */}
      {(currentTab === 1 && isShowTabLink) && (<Stack className={classes.content}>
        <Typography variant='subtitle2' className='fontWeight400'>Direct Link</Typography>
        <Typography variant='caption' color='text.secondary'>You can share the direct link to your form</Typography>

        <Stack direction='row' alignItems='center' marginTop={'20px'} className={classes.inputWrap}>
          <Stack direction='row' alignItems='center' className={classes.boxLink}>
            <IconLink className={classes.iconLink} fontSize='small'/>

            <Typography variant='caption' color='text.secondary' noWrap>
              {formLink}
            </Typography>
          </Stack>

          <Stack className={classes.actionWrap} width='100%'>
            <Button
              size='small'
              variant='contained'
              className={`${classes.buttonRedPrimary} heightFitContent`}
              onClick={(event) => handleButtonCopyClick(event, formLink)}
            >
              Copy Link
            </Button>
          </Stack>
        </Stack>
      </Stack>)}

      <Divider className={classes.dividerContent}/>

      {/* FOOTER */}
      <Stack alignItems='center' direction='row' className={classes.footer} flexWrap='nowrap'>
        <Stack direction='row' flex={1}>
          <FacebookShareButton className={classes.buttonSocialMedia} url={formLink}>
            <FacebookIcon round={true} size={18}/>
          </FacebookShareButton>

          <TwitterShareButton className={classes.buttonSocialMedia} url={formLink}>
            <TwitterIcon round={true} size={18}/>
          </TwitterShareButton>

          <LinkedinShareButton className={classes.buttonSocialMedia} url={formLink}>
            <LinkedinIcon round={true} size={18}/>
          </LinkedinShareButton>
        </Stack>

        <Stack flex={0}>
          <Button
            disableRipple
            className={classes.buttonQrCode}
            startIcon={<IconQrCode2 />}
            onClick={() => setIsDialogFormOpen('dialogQrCode')}
          >QR Code</Button>
        </Stack>
      </Stack>
    </DialogForm>
  )
}

DialogShareLink.defaultProps = {
  isShowTabEmail: true,
  isShowTabLink: true,
  isAuth: true,
  defaultSelectedTab: 0,
  hideTabHeader: false
}

DialogShareLink.propTypes = {
  id: PropTypes.number,
  code: PropTypes.string,
  isShowTabEmail: PropTypes.bool,
  isShowTabLink: PropTypes.bool,
  isAuth: PropTypes.bool,
  defaultSelectedTab: PropTypes.number,
  hideTabHeader: PropTypes.bool
}

export default DialogShareLink