import { useState, useEffect, useContext, useRef } from 'react'

// AXIOS
import axios from 'axios'

// CONTEXTS
import { AllPagesContext } from 'contexts/AllPagesContext'

// MUIS
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import Dialog from '@mui/material/Dialog'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'

// MUI ICONS
import IconArrowBackIos from '@mui/icons-material/ArrowBackIos'
import IconArrowForwardIos from '@mui/icons-material/ArrowForwardIos'
import IconClose from '@mui/icons-material/Close'
import IconFileDownload from '@mui/icons-material/FileDownload'

// STYLES
import useStyles from './dialogMediasPreviewUseStyles'

// UTILITIES
import { downloadFileFromFileObject } from 'utilities/file'
import { getDefaultErrorMessage } from 'utilities/object'
import { 
  didSuccessfullyCallTheApi, 
  wasAccessTokenExpired,
} from 'utilities/validation'

const DialogMediasPreview = (props) => {
  const { 
    isDialogOpen, setIsDialogOpen,
    mediaList, setMediaList,
    activeStep, setActiveStep,
    mediaPreviewType,
  } = props

  const classes = useStyles()

  const { setSnackbarObject } = useContext(AllPagesContext)
  const refreshIntervalRef = useRef(null)

  const [ refreshKey, setRefreshKey ] = useState(1)
  const [ isLoadingPreview, setIsLoadingPreview ] = useState(true)
  
  const getContentPropertyFromMediaObject = (inputMediaObject) => {
    let output = {}

    // SOURCE: https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types
    // IMAGE TYPE MEDIA
    if (inputMediaObject?.mimeType?.includes('image/')) output = {
      component: 'img',
      src: inputMediaObject.url,
      className: classes.mediaPreviewImage,
    }
    // EXCEL TYPE MEDIA
    else if (
      inputMediaObject?.mimeType === 'application/vnd.ms-excel' ||
      inputMediaObject?.mimeType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' 
    ) output = {
      component: 'iframe',
      src: `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(inputMediaObject.url)}&embedded=true`,
      className: classes.mediaPreviewDocument,
    }
    // OTHER DOCUMENT TYPE MEDIA
    else if (
      inputMediaObject?.mimeType?.includes('application/') || 
      inputMediaObject?.mimeType?.includes('text/')
    ) output = {
      component: 'iframe',
      src: `https://docs.google.com/gview?url=${encodeURIComponent(inputMediaObject.url)}&embedded=true`,
      className: classes.mediaPreviewDocument,
    }

    return output
  }

  const handleDialogClose = () => {
    setIsDialogOpen(false)
    setMediaList([])
    setActiveStep(0)
  }

  const handleDownloadButtonClick = async () => {
    const responseFile = await axios({
      url: mediaList[activeStep].url,
      method: 'GET',
      responseType: 'blob',
    })

    if (responseFile.status === 200) {
      const resultDownloadFile = downloadFileFromFileObject(
        responseFile.data,
        mediaList[activeStep].name,
      )

      if (
        !didSuccessfullyCallTheApi(resultDownloadFile?.status) && 
        !wasAccessTokenExpired(resultDownloadFile.status) && 
        resultDownloadFile.status !== 0
      ) setSnackbarObject(getDefaultErrorMessage(resultDownloadFile))
    }
  }

  const handleCancelRefreshInterval = () => {
    refreshIntervalRef.current && clearInterval(refreshIntervalRef.current)
  }

  useEffect(() => {
    if(!isLoadingPreview) setIsLoadingPreview(true)

    refreshIntervalRef.current = setInterval(() => {
      setRefreshKey(current => current + 1)
    }, 3000)

    return () => {
      handleCancelRefreshInterval()
    }
  }, [mediaList])

  return (
    <Dialog
      fullScreen
      open={isDialogOpen}
      onClose={handleDialogClose}
      className='no-zoom'
    >
      {/* HEADER */}
      <AppBar className={`${classes.appBar} zoom`}>
        <Toolbar className={classes.toolbar}>
          {/* FILES COUNT */}
          <Typography variant='subtitle1'>
            {`${mediaList.length} ${mediaPreviewType}${mediaList.length > 1 ? 's' : ''} (${mediaList.length > 0 ? activeStep + 1 : 0}/${mediaList.length})`}
          </Typography>

          {/* MENU */}
          <Stack 
            direction='row'
            spacing='8px'
          >
            {/* DOWNLOAD ICON */}
            <IconButton onClick={() => handleDownloadButtonClick()}>
              <IconFileDownload/>
            </IconButton>

            {/* CLOSE ICON */}
            <IconButton onClick={handleDialogClose}>
              <IconClose/>
            </IconButton>
          </Stack>
        </Toolbar>
      </AppBar>
      
      {/* CONTENT */}
      <Stack 
        flex='1'
        justifyContent='center'
        alignItems='center'
        className={`${classes.content} zoom`}
      >
        {mediaList.length > 0 &&
        <Box
          component={getContentPropertyFromMediaObject(mediaList[activeStep]).component}
          src={getContentPropertyFromMediaObject(mediaList[activeStep]).src}
          alt=''
          className={getContentPropertyFromMediaObject(mediaList[activeStep]).className}
          onLoad={() => {
            handleCancelRefreshInterval()
            setIsLoadingPreview(false)
          }}
          key={refreshKey}
        />}

        {/* LOADING */}
        {isLoadingPreview &&
        <Box className={classes.loadingContainer}>
          <CircularProgress className={classes.loading}/>
        </Box>}
      </Stack>

      {/* BOTTOM MENU */}
      <AppBar className={`${classes.appBar} zoom`}>
        <Toolbar className={classes.toolbar}>
          {/* BACK BUTTON */}
          <Button
            className={classes.actionButton}
            startIcon={<IconArrowBackIos/>}
            disabled={activeStep === 0}
            onClick={() => {
              setIsLoadingPreview(true)
              setActiveStep((prevActiveStep) => prevActiveStep - 1)
            }}
          >
            BACK
          </Button>

          {/* NEXT BUTTON */}
          <Button
            className={classes.actionButton}
            endIcon={<IconArrowForwardIos/>}
            disabled={activeStep === mediaList.length - 1}
            onClick={() => {
              setIsLoadingPreview(true)
              setActiveStep((prevActiveStep) => prevActiveStep + 1)
            }}
          >
            NEXT
          </Button>
        </Toolbar>
      </AppBar>
    </Dialog>
  )
}

export default DialogMediasPreview