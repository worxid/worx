import React, { useState, useRef, useEffect, useContext } from 'react'

// COMPONENTS
import DialogForm from 'components/DialogForm/DialogForm'

// CONSTANTS
import { scanQrCodeType } from '../fillFormConstants'

// LIBRARY
import UAParser from 'ua-parser-js'
import { Html5Qrcode } from 'html5-qrcode'

// MUIS
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'

// MUIS ICON
import IconCameraswitch from '@mui/icons-material/Cameraswitch'
import IconFlashOn from '@mui/icons-material/FlashOn'
import IconFlashOff from '@mui/icons-material/FlashOff'

// STYLES
import useStyles from './dialogScanQrBarcodeUseStyles'

const qrcodeRegionId = 'worx-cam-scan-id'

const DialogScanQrBarcode = (props) => {
  const { isOnlyD1Type, handleSuccess, handleCancel, handleBackdropClick } = props

  const uaParserRef = useRef(new UAParser())
  const scanCamRef = useRef()

  const classes = useStyles()

  // STATES
  const [isMounted, setIsMounted] = useState(false)
  const [isCamRefReady, setIsCamRefReady] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isFlashligtOn, setIsFlashLightOn] = useState(false)
  const [cameraPosition, setCameraPosition] = useState('environment')

  // DEVICE DETECTION
  const detectDeviceType = () => {
    const currentOs = uaParserRef.current.getResult().os.name
    // IS DEKSTOP
    if(currentOs === 'Windows' || currentOs === 'Mac OS') return true
    else return false
  }

  const stopCam = async () => {
    await scanCamRef.current?.stop()
  }

  const switchFlashlight = async () => {
    await scanCamRef.current?.applyVideoConstraints({
      advanced: [{torch: isFlashligtOn}]
    })
  }

  // INIT QR SCAN CAM REF
  const setupScanCamera = async () => {
    scanCamRef.current = new Html5Qrcode(qrcodeRegionId, {
      formatsToSupport: scanQrCodeType(true, isOnlyD1Type ? false : true),
      verbose: false,
    })

    setIsCamRefReady(true)
  }

  // SET CONFIG TO SCAN CAM REF
  const configCurrentCam = async (inputCamPosition) => {
    setIsLoading(true)
  
    await scanCamRef.current.start(
      { facingMode: inputCamPosition },
      {
        fps: 20,
        aspectRatio: 1.0,
        showTorchButtonIfSupported: true,
      },
      handleSuccess,
    )

    switchFlashlight()
    setIsLoading(false)
  }

  const handleSwitchCamera = () => {
    // BEFORE SWITCH A CAM, THE SCAN MUST BE STOPPED
    stopCam()

    // USER = FRONT CAM, ENVIRONMENT = BACK CAMERA
    setCameraPosition(cameraPosition === 'user' ? 'environment' : 'user')
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
      stopCam()
    }
  }, [isMounted])

  useEffect(() => {
    if(isCamRefReady && isMounted && scanCamRef.current) {
      configCurrentCam(cameraPosition)
    }
  }, [isCamRefReady, cameraPosition])

  useEffect(() => {
    if(isCamRefReady && isMounted) {
      switchFlashlight()
    }
  }, [isFlashligtOn])

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
          flexWrap='nowrap'
          className={`${classes.actionWrapper} ${!detectDeviceType() && 'mobile'}`}
          direction='row'
          alignItems='center'
        >
          <Stack width='100%' direction='row' alignItems='center' justifyContent='center'>
            {/* BUTTON FLASHLIGHT */}
            {(!isLoading && !detectDeviceType()) && (
              <IconButton
                className={classes.buttonSwitchCamera}
                onClick={() => setIsFlashLightOn(!isFlashligtOn)}
              >
                {!isFlashligtOn && (<IconFlashOn fontSize='medium'/>)}
                {isFlashligtOn && (<IconFlashOff fontSize='medium'/>)}
              </IconButton>
            )}

            {/* BUTTON SWITCH */}
            {(!isLoading && !detectDeviceType()) && (
              <IconButton
                className={`${classes.buttonSwitchCamera} ${!detectDeviceType() && 'mobile'}`}
                onClick={handleSwitchCamera}
              >
                <IconCameraswitch fontSize='medium'/>
              </IconButton>
            )}

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
      </Stack>
    </DialogForm>
  )
}

export default DialogScanQrBarcode