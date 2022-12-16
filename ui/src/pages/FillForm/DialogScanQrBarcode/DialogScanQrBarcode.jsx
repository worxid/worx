import React from 'react'

// COMPONENTS
import DialogForm from 'components/DialogForm/DialogForm'

// MUIS
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'

// MUI ICONS
import IconCameraAlt from '@mui/icons-material/CameraAlt'
import IconCameraswitch from '@mui/icons-material/Cameraswitch'
import IconCheck from '@mui/icons-material/Check'
import IconFlashOn from '@mui/icons-material/FlashOn'
import IconFlashOff from '@mui/icons-material/FlashOff'
import IconReplay from '@mui/icons-material/Replay'

// STYLES
import useStyles from './dialogScanQrBarcodeUseStyles'

const DialogScanQrBarcode = (props) => {
  const { handleBackdropClick } = props

  const classes = useStyles()

  return (
    <DialogForm
      dialogName='dialogScanQrBarcode'
      classNames={`${classes.dialogCamera} neutralize-dialog-form`}
      areActionsAvailable={false}
      onBackdropClick={handleBackdropClick}
    >

    </DialogForm>
  )
}

export default DialogScanQrBarcode