import { useContext, useEffect, useState } from 'react'

// COMPONENTS
import DialogForm from 'components/DialogForm/DialogForm'

// CONTEXTS
import { PrivateLayoutContext } from 'contexts/PrivateLayoutContext'

// MUIS
import Backdrop from '@mui/material/Backdrop'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

// MUI ICONS
import IconClose from '@mui/icons-material/Close'

// STYLES
import useStyles from './dialogQrCodeUseStyles'

// QR CODE
import QRCode from 'qrcode'

const DialogQrCode = (props) => {
  const { id } = props

  // STYLES
  const classes = useStyles()

  // CONTEXTS
  const { setIsDialogFormOpen } = useContext(PrivateLayoutContext)

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

  useEffect(() => {
    generateQR('https://dev.worx.id/fill-form?code=dummy')
  }, [])

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
        <Box
          component='img'
          src={qrCode}
          className={classes.imgQrCode}
        />

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

export default DialogQrCode