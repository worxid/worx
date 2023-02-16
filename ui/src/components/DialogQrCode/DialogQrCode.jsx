import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'

// COMPONENTS
import DialogForm from 'components/DialogForm/DialogForm'

// CONTEXTS
import { AllPagesContext } from 'contexts/AllPagesContext'
import { PrivateLayoutContext } from 'contexts/PrivateLayoutContext'

// HOOKS
import useAxiosPrivate from 'hooks/useAxiosPrivate'

// MUIS
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

// MUI ICONS
import IconClose from '@mui/icons-material/Close'

// SERVICES
import { getGuestShareLinkFormTemplate } from 'services/worx/guest'
import { postShareLinkFormTemplate } from 'services/worx/formTemplate'

// STYLES
import useStyles from './dialogQrCodeUseStyles'

// QR CODE
import QRCode from 'qrcode'

// UTILITIES
import { getDefaultErrorMessage } from 'utilities/object'
import { 
  didSuccessfullyCallTheApi,
  wasAccessTokenExpired,
  wasRequestCanceled,
  wasRequestNotFound,
} from 'utilities/validation'

const DialogQrCode = (props) => {
  const { id, code, isAuth } = props
  const axiosPrivate = useAxiosPrivate()

  // STYLES
  const classes = useStyles()

  // CONTEXTS
  const { setSnackbarObject } = useContext(AllPagesContext)
  const { setIsDialogFormOpen } = useContext(PrivateLayoutContext)

  const navigate = useNavigate()

  // STATES
  const [qrCode, setqrCode] = useState('')

  // GENERATE QR
  const generateQR = async text => {
    if(!text) return
    try {
      const result = await QRCode.toDataURL(text)
      setqrCode(result)
    } catch (err) {
      setqrCode(err)
    }
  }

  // FETCH SHARE LINK
  const fetchShareLink = async (abortController) => {
    const response = isAuth
      ? await postShareLinkFormTemplate(id, abortController.signal, axiosPrivate)
      : await getGuestShareLinkFormTemplate(abortController.signal, {
        code,
      })

    if (didSuccessfullyCallTheApi(response?.status)) {
      generateQR(response.data.value.link)
    }
    else if (!wasRequestCanceled(response?.status) && !wasAccessTokenExpired(response?.status) && !wasRequestNotFound(response?.status)) {
      setSnackbarObject(getDefaultErrorMessage(response))
    }
  }

  useEffect(() => {
    const abortController = new AbortController()
    if (id || code) fetchShareLink(abortController)

    return () => abortController.abort()
  }, [id, code])

  return (
    <DialogForm
      dialogName='dialogQrCode'
      title={<Stack direction='row' alignItems='center'>
        <Stack flex={1}>
          <Typography variant='h6' fontWeight={500} flex={1}>Share Form</Typography>
          <Typography variant='caption'>Scan the code to lunch your form.</Typography>
        </Stack>
        
        <IconButton onClick={() => {
          setIsDialogFormOpen('dialogShareLink')
        }}>
          <IconClose fontSize='small'/>
        </IconButton>
      </Stack>}
      areActionsAvailable={false}
      classNames={classes.dialogQrCode}
    >
      <Divider />

      <Stack className={classes.content}>
        <Box component='img' src={qrCode} className={classes.imgQrCode} />

        <Button
          variant='contained'
          color='primary'
          className={classes.buttonRedPrimary}
          href={qrCode}
          download='qrcode.png'
        >Download</Button>
      </Stack>
    </DialogForm>
  )
}

DialogQrCode.defaultProps = {
  isAuth: true,
}

DialogQrCode.propTypes = {
  id: PropTypes.number,
  code: PropTypes.string,
  isAuth: PropTypes.bool,
}

export default DialogQrCode