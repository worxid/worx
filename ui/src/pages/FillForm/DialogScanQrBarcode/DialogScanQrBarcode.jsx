import React, { useState, useRef, useEffect } from 'react'

// COMPONENTS
import DialogForm from 'components/DialogForm/DialogForm'

// LIBRARY
import UAParser from 'ua-parser-js'
import { Html5Qrcode } from 'html5-qrcode'

// MUIS
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Stack from '@mui/material/Stack'

// STYLES
import useStyles from './dialogScanQrBarcodeUseStyles'
import { scanQrCodeType } from '../fillFormConstants'

const qrcodeRegionId = 'worx-cam-scan-id'

const DialogScanQrBarcode = (props) => {
  const { isOnlyD1Type, handleSuccess, handleCancel, handleBackdropClick } = props

  const uaParserRef = useRef(new UAParser())
  const scanCamRef = useRef()
  const currentCameraRef = useRef()

  const classes = useStyles()

  // STATES
  const [isMounted, setIsMounted] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // DEVICE DETECTION
  const detectDeviceType = () => {
    const currentOs = uaParserRef.current.getResult().os.name
    // IS DEKSTOP
    if(currentOs === 'Windows' || currentOs === 'Mac OS') return true
    else return false
  }

  const setupScanCamera = async () => {
    console.log(scanQrCodeType(true, isOnlyD1Type ? false : true))
    console.log({ isOnlyD1Type })
    scanCamRef.current = new Html5Qrcode(qrcodeRegionId, {
      formatsToSupport: scanQrCodeType(true, isOnlyD1Type ? false : true),
      verbose: false,
    })
    const listCamera = await Html5Qrcode.getCameras()
    currentCameraRef.current = listCamera[0]

    await scanCamRef.current.start(
      currentCameraRef.current.id,
      {
        fps: 20,
        aspectRatio: 1.0
      },
      handleSuccess,
      (errorMessage) => {
        //console.log({ errorMessage })
      }
    )

    setIsLoading(false)
  }

  const clearCam = async () => {
    await scanCamRef.current?.stop()
    await scanCamRef.current?.clear()
  }

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if(isMounted) {
      setupScanCamera()
    }

    // CLEAR HTML5 QRCODE WHEN UNMOUNT COMPONENT
    return () => {
      clearCam()
    }
  }, [isMounted])

  return (
    <DialogForm
      dialogName='dialogScanQrBarcode'
      classNames={`${classes.dialogCamera} neutralize-dialog-form`}
      areActionsAvailable={false}
      onBackdropClick={handleBackdropClick}
    >
      <Stack width='100%' height='100%' alignItems='center'>
        <Stack justifyContent='center' alignItems='center' width='100%' flex={1} className={classes.scanCamWrapper}>
          <Box
            className={classes.scanCam}
            id={qrcodeRegionId}
          />

          {isLoading && <Box className={classes.loadingWrapper}>
            <CircularProgress />
          </Box>}
        </Stack>

        {/* ACTION TAKE CAMERA */}
        <Stack
          width='100%'
          flex={0}
          className={`${classes.actionWrapper} ${!detectDeviceType() && 'mobile'}`}
          alignItems='center'
          justifyContent='center'
        >
          <Button
            className={classes.buttonCancel}
            variant='text'
            disableRipple
            onClick={handleCancel}
          >
            Cancel
          </Button>
        </Stack>
      </Stack>
    </DialogForm>
  )
}

export default DialogScanQrBarcode