import { useContext, useState } from 'react'

// COMPONENTS
import DialogForm from 'components/DialogForm/DialogForm'

// CONTEXTS
import { AllPagesContext } from 'contexts/AllPagesContext'
import { PrivateLayoutContext } from 'contexts/PrivateLayoutContext'

// MUIS
import Autocomplete from '@mui/material/Autocomplete'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import LoadingButton from '@mui/lab/LoadingButton'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

// MUI ICONS
import IconClose from '@mui/icons-material/Close'
import IconLink from '@mui/icons-material/Link'

// SERVICES
import { postShareFormTemplate } from 'services/formTemplate'

// STYLES
import useStyles from './dialogShareLinkUseStyles'

// UTILITIES
import { didSuccessfullyCallTheApi, isEmailFormatValid } from 'utilities/validation'

const DialogShareLink = (props) => {
  const { id } = props

  // STYLES
  const classes = useStyles()

  // CONTEXTS
  const { setSnackbarObject, auth } = useContext(AllPagesContext)
  const { setIsDialogFormOpen } = useContext(PrivateLayoutContext)

  // STATES
  const [isLoading, setIsLoading] = useState(false)
  const [receivers, setReceivers] = useState([])

  // HANDLE BUTTON SEND CLICK
  const handleButtonSendClick = async () => {
    const abortController = new AbortController()
    setIsLoading(true)
    let message = {}
    let isValidEmail

    if(receivers.length) {
      // VALIDATE EMAIL EVERY ITEM
      for(let item of receivers) {
        if(isEmailFormatValid(item)) {
          isValidEmail = true
        } else {
          isValidEmail = false
          break
        }
      }

      if(isValidEmail) {
        const response = await postShareFormTemplate(id, abortController.signal,
          {
            recipients: receivers
          },
          auth.accessToken,
        )
  
        if(didSuccessfullyCallTheApi(response?.status)) {
          message = {
            severity: 'success',
            title: '',
            message: 'Successfully sent the form via email'
          }
          setReceivers([])
          setIsDialogFormOpen(false)
        } else {
          message = {
            severity: 'error',
            title: response?.data?.error?.status?.replaceAll('_', ' ') || '',
            message: response?.data?.error?.message || 'Something gone wrong',
          }
        }
      } else {
        message = {
          severity: 'error',
          title: '',
          message: 'Invalid email found',
        }
      }
    } else {
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
      title={<Stack direction='row' alignItems='center'>
        <Typography variant='subtitle1' flex={1}>Share Form</Typography>

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
      <Divider />

      {/* CONTENT SHARE EMAIL */}
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

      <Divider className={classes.dividerContent}/>

      {/* CONTENT DIRECT LINK */}
      <Stack className={classes.content}>
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
              className={`${classes.buttonRedLight} heightFitContent`}
              onClick={(event) => handleButtonCopyClick(event, 'http://ww.worx.id//validformsid12345hajsdsddsds')}
            >
              Copy Link
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </DialogForm>
  )
}

export default DialogShareLink