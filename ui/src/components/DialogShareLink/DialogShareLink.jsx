import { useContext, useState } from 'react'

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
import IconCode from '@mui/icons-material/Code'
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
import { postShareFormTemplate } from 'services/formTemplate'

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
  const { id } = props

  // STYLES
  const classes = useStyles()

  // CONTEXTS
  const { setSnackbarObject } = useContext(AllPagesContext)
  const { setIsDialogFormOpen } = useContext(PrivateLayoutContext)

  // STATES
  const [currentTab, setCurrentTab] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [receivers, setReceivers] = useState([])

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
  const handleButtonCopyClick = (event, url) => {
    navigator.clipboard.writeText(url)
    setSnackbarObject({
      open: true,
      severity:'success',
      title:'',
      message:'Successfully copied the link'
    })
  }

  return (
    <DialogForm
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
      <Tabs className={classes.tabs} value={currentTab} onChange={(event, newValue) => setCurrentTab(newValue)}>
        <Tab icon={<IconMailOutline fontSize='small'/>} iconPosition='start' label='Email' {...a11yProps(0)} />
        <Tab icon={<IconLink fontSize='small'/>} iconPosition='start' label='Link' {...a11yProps(1)} />
        <Tab icon={<IconCode fontSize='small'/>} iconPosition='start' label='Embed' {...a11yProps(2)} />
      </Tabs>

      {/* CONTENT SHARE EMAIL */}
      {currentTab === 0 && (
        <Stack className={classes.content}>
          <Typography variant='subtitle2' className='fontWeight400'>Share on email</Typography>
          <Typography variant='caption' color='text.secondary'>Share a direct link to your form via email</Typography>

          <Stack direction='row' alignItems='center' marginTop={'20px'}>
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
            <Stack paddingLeft={'12px'}>
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
      {currentTab === 1 && (<Stack className={classes.content}>
        <Typography variant='subtitle2' className='fontWeight400'>Direct Link</Typography>
        <Typography variant='caption' color='text.secondary'>You can share the direct link to your form</Typography>

        <Stack direction='row' alignItems='center' marginTop={'20px'}>
          <Stack direction='row' alignItems='center' className={classes.boxLink}>
            <IconLink className={classes.iconLink} fontSize='small'/>

            <Typography
              variant='caption'
              color='text.secondary'
              noWrap
            >
              http://ww.worx.id//validformsid12345hajsdsddsds
            </Typography>
          </Stack>

          <Stack paddingLeft={'12px'}>
            <Button
              size='small'
              variant='contained'
              className={`${classes.buttonRedPrimary} heightFitContent`}
              onClick={(event) => handleButtonCopyClick(event, 'http://ww.worx.id//validformsid12345hajsdsddsds')}
            >
              Copy Link
            </Button>
          </Stack>
        </Stack>
      </Stack>)}

      {/* CONTENT EMBED */}
      {currentTab === 2 && (<Stack className={classes.content}>
        <Typography variant='subtitle2' className='fontWeight400'>Embed</Typography>
        <Typography variant='caption' color='text.secondary'>Copy and paste this snippet into your code</Typography>

        <Stack direction='row' alignItems='center' marginTop={'20px'}>
          <Stack direction='row' alignItems='center' className={classes.boxLink}>

            <Typography variant='caption' color='text.secondary' noWrap>
              {'<script src="https://dev.worx.id/fill-form?code=Fz9dZvxo9Twyi8unPisrM"></script>'}
            </Typography>
          </Stack>

          <Stack paddingLeft={'12px'}>
            <Button
              size='small'
              variant='contained'
              className={`${classes.buttonRedPrimary} heightFitContent`}
              onClick={(event) => handleButtonCopyClick(event, 'https://dev.worx.id/fill-form?code=dummy')}
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
          <FacebookShareButton className={classes.buttonSocialMedia} url='http://ww.worx.id//validformsid12345hajsdsddsds'>
            <FacebookIcon round={true} size={18}/>
          </FacebookShareButton>

          <TwitterShareButton className={classes.buttonSocialMedia} url='http://ww.worx.id//validformsid12345hajsdsddsds'>
            <TwitterIcon round={true} size={18}/>
          </TwitterShareButton>

          <LinkedinShareButton className={classes.buttonSocialMedia} url='http://ww.worx.id//validformsid12345hajsdsddsds'>
            <LinkedinIcon round={true} size={18}/>
          </LinkedinShareButton>
        </Stack>

        <Stack flex={0}>
          <Button
            disableRipple
            className={classes.buttonQrCode}
            startIcon={<IconQrCode2 />}
          >QR Code</Button>
        </Stack>
      </Stack>
    </DialogForm>
  )
}

export default DialogShareLink