import { useContext, useState, useRef, useCallback, useMemo, useEffect } from 'react'

// COMPONENTS
import DialogForm from 'components/DialogForm/DialogForm'

// CONTEXTS
import { AllPagesContext } from 'contexts/AllPagesContext'

// LIBRARY
import Webcam from 'react-webcam'

// MUIS
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'

// MUI ICONS
import IconCameraAlt from '@mui/icons-material/CameraAlt'
import IconCameraswitch from '@mui/icons-material/Cameraswitch'
import IconCheck from '@mui/icons-material/Check'
import IconReplay from '@mui/icons-material/Replay'

// STYLES
import useStyles from './dialogCameraUseStyles'

const DialogCamera = (props) => {
  const { handleUsePhoto, handleCancel, handleBackdropClick } = props

  // STYLES
  const classes = useStyles()

  // REFS
  const webcamRef = useRef()

  // CONTEXT
  const { breakpointType } = useContext(AllPagesContext)

  // STATES
  const [resultPhoto, setResultPhoto] = useState('') // BASE64 IMAGE
  const [cameraPosition, setCameraPosition] = useState('user')
  const [isLoading, setIsLoading] = useState(true)

  // CONSTRAINT SETTING
  const constraintsSetting = useMemo(() => {
    return {
      facingMode: cameraPosition === 'user' ? cameraPosition : {exact: 'environment' },
    }
  }, [breakpointType, cameraPosition])

  // HANDLE CAPTURE
  const handleCaptureClick = useCallback(async () => {
    const getMediaCamera = await navigator.mediaDevices.getUserMedia({
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

    // GET ACTUAL RESOLUTION OF CAMERA
    const cameraSettings = getMediaCamera.getVideoTracks()[0].getSettings()
    const resolutionWidth = cameraSettings.width
    const resolutionHeight = cameraSettings.height

    const imageInBase64 = webcamRef.current.getScreenshot({
      width: resolutionWidth,
      height: resolutionHeight
    })

    setResultPhoto(imageInBase64)

    // DESTROY MEDIA AFTER TAKE PHOTO
    getMediaCamera.getTracks().forEach(track => track.stop())
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
    if(cameraPosition === 'user') setCameraPosition('environtment')
    else if(cameraPosition === 'environtment') setCameraPosition('user')
  }

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 3000)
  }, [cameraPosition])

  return (
    <DialogForm
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
              //className={classes.webcam}
              //width='100%'
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
        <Stack width='100%' flex={0} flexWrap='nowrap' className={classes.actionWrapper} direction='row' alignItems='center'>
          <Stack alignItems='flex-end' className={classes.actionLeft}>
            {/* BUTTON SWITCH */}
            {(!resultPhoto && breakpointType !== 'lg' && breakpointType !== 'xl') && (
              <IconButton className={classes.buttonSwitchCamera} onClick={handleSwitchCamera}>
                <IconCameraswitch fontSize='medium'/>
              </IconButton>
            )}

            {/* BUTTON RETAKE */}
            {resultPhoto && (
              <IconButton className={classes.buttonRetake} onClick={handleRetakeClick}>
                <IconReplay fontSize='medium'/>
              </IconButton>
            )}
          </Stack>

          <Stack className={classes.actionCenter} alignItems='center'>
            {/* BUTTON TAKE CAMERA */}
            {!resultPhoto && (
              <IconButton className={classes.buttonTakePhoto} onClick={handleCaptureClick}>
                <IconCameraAlt fontSize='medium'/>
              </IconButton>
            )}
          </Stack>

          <Stack alignItems='flex-start' className={classes.actionRight}>
            {/* BUTTON CANCEL */}
            {!resultPhoto && (<Button
              className={classes.buttonCancel}
              variant='text'
              disableRipple
              onClick={handleCancel}
            >
              Cancel
            </Button>)}

            {/* BUTTON USE PHOTO */}
            {resultPhoto && (
              <IconButton className={classes.buttonUsePhoto} onClick={() => handleUsePhoto(resultPhoto)}>
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