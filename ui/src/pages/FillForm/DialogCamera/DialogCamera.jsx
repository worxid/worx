import { useContext, useState, useRef, useCallback, useMemo, useEffect } from 'react'

// COMPONENTS
import DialogForm from 'components/DialogForm/DialogForm'

// CONTEXTS
import { AllPagesContext } from 'contexts/AllPagesContext'

// LIBRARY
import UAParser from 'ua-parser-js'
import Webcam from 'react-webcam'

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
import useStyles from './dialogCameraUseStyles'

const DialogCamera = (props) => {
  const { handleUsePhoto, handleCancel, handleBackdropClick } = props

  // STYLES
  const classes = useStyles()

  // REFS
  const uaParserRef = useRef(new UAParser())
  const webcamRef = useRef()

  // CONTEXT
  const { breakpointType } = useContext(AllPagesContext)

  // STATES
  const [resultPhoto, setResultPhoto] = useState('') // BASE64 IMAGE
  const [cameraPosition, setCameraPosition] = useState('user')
  const [isLoading, setIsLoading] = useState(true)
  const [isFlashligtOn, setIsFlashLightOn] = useState(false)
  const [realResolution, setRealResolution] = useState({})

  // CONSTRAINT SETTING
  const constraintsSetting = useMemo(() => {
    return {
      facingMode: cameraPosition === 'user' ? cameraPosition : {exact: 'environment' },
    }
  }, [breakpointType, cameraPosition])

  const fetchCameraResolution = async () => {
    const cameraDevice = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: {
        width: {
          ideal: 1028
        },
        height: {
          ideal: 720,
        }
      }
    })

    const cameraSettings = cameraDevice.getVideoTracks()[0]?.getSettings()
    setRealResolution({
      width: cameraSettings.width,
      height: cameraSettings.height
    })

    cameraDevice?.getTracks().forEach(track => track.stop())
  }

  // HANDLE CAPTURE
  const handleCaptureClick = useCallback(async () => {
    const imageInBase64 = webcamRef.current?.getScreenshot({
      width: realResolution.width,
      height: realResolution.height,
    })

    setResultPhoto(imageInBase64)
  }, [webcamRef])

  // HANDLE RETAKE
  const handleRetakeClick = () => {
    setResultPhoto('')
  }

  // HANDLE SWITCH CAMERA
  const handleSwitchCamera = () => {
    /**
     * user: is selfie/forward/webcam camera
     * environtment: is front camera
     */
    setIsLoading(true)

    // WHEN SWITCH TURN OFF FLASHLIGHT
    setIsFlashLightOn(false)

    if(cameraPosition === 'user') setCameraPosition('environtment')
    else if(cameraPosition === 'environtment') setCameraPosition('user')
  }

  // DEVICE DETECTION
  const detectDeviceType = () => {
    const currentOs = uaParserRef.current.getResult().os.name
    // IS DEKSTOP
    if(currentOs === 'Windows' || currentOs === 'Mac OS') return true
    else return false
  }

  useEffect(() => {
    fetchCameraResolution()
  }, [])

  useEffect(() => {
    if(isFlashligtOn) {
      webcamRef.current?.stream?.getVideoTracks()[0].applyConstraints({
        advanced: [{torch: true}]
      })
    } else {
      webcamRef.current?.stream?.getVideoTracks()[0].applyConstraints({
        advanced: [{torch: false}]
      })
    }
  }, [isFlashligtOn])

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 3000)
  }, [cameraPosition])

  return (
    <DialogForm
      dialogName='dialogCamera'
      classNames={`${classes.dialogCamera} neutralize-dialog-form`}
      areActionsAvailable={false}
      onBackdropClick={handleBackdropClick}
    >
      <Stack width='100%' height='100%' alignItems='center'>
        {/* CAMERA */}
        <Stack justifyContent='center' alignItems='center' width='100%' flex={1} className={classes.webcamWrapper}>
          {isLoading && (<CircularProgress />)}
          {/* CAMERA PREVIEW */}
          {(!resultPhoto && !isLoading) && (
            <Webcam
              ref={webcamRef}
              audio={false}
              className={classes.webcam}
              width='100%'
              screenshotFormat='image/jpeg'
              mirrored={cameraPosition === 'user' ? true : false}
              videoConstraints={constraintsSetting}
            ></Webcam>
          )}

          {/* RESULT PHOTO */}
          {resultPhoto && (
            <Box
              className={classes.resultPhoto}
              component='img'
              src={resultPhoto}
            />
          )}
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
          <Stack direction='row' alignItems='center' className={`${classes.actionLeft} ${!detectDeviceType() && 'mobile'}`}>
            {/* BUTTON FLASHLIGHT */}
            {(!isLoading && !resultPhoto && !detectDeviceType()) && (
              <IconButton className={classes.buttonSwitchCamera} onClick={() => setIsFlashLightOn(!isFlashligtOn)}>
                {!isFlashligtOn && (<IconFlashOn fontSize='medium'/>)}
                {isFlashligtOn && (<IconFlashOff fontSize='medium'/>)}
              </IconButton>
            )}

            {/* BUTTON SWITCH */}
            {(!isLoading && !resultPhoto && !detectDeviceType()) && (
              <IconButton className={`${classes.buttonSwitchCamera} ${!detectDeviceType() && 'mobile'}`} onClick={handleSwitchCamera}>
                <IconCameraswitch fontSize='medium'/>
              </IconButton>
            )}

            {/* BUTTON RETAKE */}
            {resultPhoto && (
              <IconButton className={`${classes.buttonRetake} ${!detectDeviceType() && 'mobile'}`} onClick={handleRetakeClick}>
                <IconReplay fontSize='medium'/>
              </IconButton>
            )}
          </Stack>

          <Stack className={classes.actionCenter} alignItems='center'>
            {/* BUTTON TAKE CAMERA */}
            {(!resultPhoto && !isLoading) && (
              <IconButton className={`${classes.buttonTakePhoto} ${!detectDeviceType() && 'mobile'}`} onClick={handleCaptureClick}>
                {detectDeviceType() && (<IconCameraAlt fontSize='medium'/>)}
                {!detectDeviceType() && (
                  <Box className={classes.iconCaptureMobile}>
                    <Box className='iconCaptureMobile-inside'></Box>
                  </Box>
                )}
              </IconButton>
            )}
          </Stack>

          <Stack className={`${classes.actionRight} ${!detectDeviceType() && 'mobile'}`}>
            {/* BUTTON CANCEL */}
            {!resultPhoto && (<Button
              className={`${classes.buttonCancel} ${!detectDeviceType() && 'mobile'}`}
              variant='text'
              disableRipple
              onClick={handleCancel}
            >
              Cancel
            </Button>)}

            {/* BUTTON USE PHOTO */}
            {resultPhoto && (
              <IconButton className={`${classes.buttonUsePhoto} ${!detectDeviceType() && 'mobile'}`} onClick={() => handleUsePhoto(resultPhoto)}>
                <IconCheck fontSize='medium'/>
              </IconButton>
            )}
          </Stack>
        </Stack>
      </Stack>
    </DialogForm>
  )
}

export default DialogCamera