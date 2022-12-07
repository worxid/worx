import { useContext, useState } from 'react'

// COMPONENTS
import DialogForm from 'components/DialogForm/DialogForm'

// CONTEXTS
import { AllPagesContext } from 'contexts/AllPagesContext'
import { PrivateLayoutContext } from 'contexts/PrivateLayoutContext'

// CUSTOM COMPONENTS
import CustomDialogActionButton from 'components/Customs/CustomDialogActionButton'

// HOOKS
import useAxiosPrivate from 'hooks/useAxiosPrivate'

// MUIS
import Divider from '@mui/material/Divider'
import FormControl from '@mui/material/FormControl'
import Input from '@mui/material/Input'
import InputLabel from '@mui/material/InputLabel'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

// SERVICES
import { postDeviceInvite } from 'services/devices'

// STYLES
import useStyles from './dialogInviteUseStyles'
import useLayoutStyles from 'styles/layoutPrivate'

// UTILITIES
import { getDefaultErrorMessage } from 'utilities/object'
import { 
  didSuccessfullyCallTheApi, 
  wasAccessTokenExpired,
  wasRequestCanceled,
} from 'utilities/validation'

const DialogInvite = () => {
  // STYLES
  const classes = useStyles()
  const layoutClasses = useLayoutStyles()

  const axiosPrivate = useAxiosPrivate()

  // CONTEXTS
  const { setIsDialogFormOpen } = useContext(PrivateLayoutContext)
  const { setSnackbarObject } = useContext(AllPagesContext)

  // STATES
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState('')

  // HANDLE BUTTON CLOSE CLICK
  const handleCloseDialog = () => {
    setEmail('')
    setIsDialogFormOpen(false)
  }

  // HANDLE BUTTON SEND CLICK
  const handleButtonInviteClick = async () => {
    const abortController = new AbortController()
    setIsLoading(true)

    let requestBody = {
      send_to: [email]
    }
    const response = await postDeviceInvite(
      abortController.signal,
      requestBody,
      axiosPrivate,
    )

    if (didSuccessfullyCallTheApi(response?.status)) {
      setIsLoading(false)
      abortController.abort()
      setSnackbarObject({
        open: true,
        severity:'success',
        title:'',
        message: `Invite sent to ${email} successfully`
      })
      handleCloseDialog()
    }
    else if (!wasRequestCanceled(response?.status) && !wasAccessTokenExpired(response.status)) {
      setIsLoading(false)
      setSnackbarObject(getDefaultErrorMessage(response))
    }
  }

  return (
    <DialogForm
      // isLoading={isLoading}
      dialogName='dialogInvite'
      title={<Stack direction='row' alignItems='center'>
        <Typography variant='subtitle1' fontWeight={500} flex={1}>Invite a device</Typography>
      </Stack>}
      areActionsAvailable={false}
      classNames={classes.root}
    >
      <Divider />
      <Stack className={classes.content}>
        <Typography variant='subtitle2' className='fontWeight500'>Choose how you want to send the invite:</Typography>
        
        <Stack direction='row' className={layoutClasses.dialogAddOrEditFormControlContainer}>
          <FormControl 
            variant='standard' 
            className='width100'
          >
            <InputLabel>
              E-mail address
            </InputLabel>
            <Input
              placeholder='E-mail address'
              type='text'
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </FormControl>
        </Stack>
      </Stack>

      {/* FOOTER */}
      <Stack alignItems='center' direction='row' justifyContent={'flex-end'} className={classes.footer} flexWrap='nowrap'>
        {/* CANCEL BUTTON */}
        <CustomDialogActionButton 
          className={`${layoutClasses.dialogButton} ${layoutClasses.greyButton} fontWeight600`}
          sx={{
            marginRight: '20px'
          }}
          onClick={handleCloseDialog}
          disabled={isLoading}
        >
          Close
        </CustomDialogActionButton>

        {/* SAVE BUTTON */}
        <CustomDialogActionButton
          className={`${layoutClasses.dialogButton} ${layoutClasses.redButton} fontWeight600`}
          onClick={handleButtonInviteClick}
          disabled={!email || email === ''}
        >
          Invite
        </CustomDialogActionButton>
      </Stack>
    </DialogForm>
  )
}

export default DialogInvite