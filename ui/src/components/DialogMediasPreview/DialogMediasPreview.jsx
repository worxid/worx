import { useState, useEffect, useContext, useRef } from 'react'

// CONTEXTS
import { AllPagesContext } from 'contexts/AllPagesContext'

// HOOKS
import useAxiosPrivate from 'hooks/useAxiosPrivate'

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

// SERVICES
import { postDetailMediaFiles } from 'services/worx/media'
import { downloadFileFromUrl } from 'services/worx/others'

// STYLES
import useStyles from './dialogMediasPreviewUseStyles'

// UTILITIES
import { getDefaultErrorMessage } from 'utilities/object'
import { 
  didSuccessfullyCallTheApi, 
  wasAccessTokenExpired,
  wasRequestCanceled,
} from 'utilities/validation'

const DialogMediasPreview = (props) => {
  const { mediasPreviewObject, setMediasPreviewObject } = props

  const classes = useStyles()

  const axiosPrivate = useAxiosPrivate()

  const { setSnackbarObject } = useContext(AllPagesContext)
  const refreshIntervalRef = useRef(null)

  const [ mediaList, setMediaList ] = useState([])
  const [ activeStep, setActiveStep ] = useState(0)
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

  const loadMediaFilesData = async (inputAbortController, inputIsMounted) => {
    const resultMediaFilesData = await postDetailMediaFiles(
      inputAbortController.signal,
      { media_ids: mediasPreviewObject?.fileList?.map(item => item.media_id) },
      axiosPrivate,
    )

    if (didSuccessfullyCallTheApi(resultMediaFilesData.status) && inputIsMounted) {
      setMediaList(resultMediaFilesData.data.list)

      refreshIntervalRef.current = setInterval(() => {
        setRefreshKey(current => current+1)
      }, 4000)
    }
    else if (!wasRequestCanceled(resultMediaFilesData?.status) && !wasAccessTokenExpired(resultMediaFilesData.status)) {
      setSnackbarObject(getDefaultErrorMessage(resultMediaFilesData))
    }
  }

  const handleDialogClose = () => {
    setMediasPreviewObject(null)
    setMediaList([])
    setActiveStep(0)
  }

  const handleDownloadButtonClick = async () => {
    const resultDownloadFile = await downloadFileFromUrl(
      mediaList[activeStep].url,
      mediaList[activeStep].name,
    )

    if (
      !didSuccessfullyCallTheApi(resultDownloadFile?.status) && 
      !wasAccessTokenExpired(resultDownloadFile.status) && 
      resultDownloadFile.status !== 0
    ) {
      setSnackbarObject(getDefaultErrorMessage(resultDownloadFile))
    }
  }

  const handleCancelRefreshInterval = () => {
    refreshIntervalRef.current && clearInterval(refreshIntervalRef.current)
  }

  useEffect(() => {
    let isMounted = true
    const abortController = new AbortController()

    if(!isLoadingPreview) setIsLoadingPreview(true)
    if (Boolean(mediasPreviewObject)) loadMediaFilesData(abortController, isMounted)

    return () => {
      isMounted = false
      abortController.abort()
      handleCancelRefreshInterval()
    }
  }, [mediasPreviewObject])

  return (
    <Dialog
      fullScreen
      open={Boolean(mediasPreviewObject)}
      onClose={handleDialogClose}
      className='no-zoom'
    >
      {/* HEADER */}
      <AppBar className={`${classes.appBar} zoom`}>
        <Toolbar className={classes.toolbar}>
          {/* FILES COUNT */}
          <Typography variant='subtitle1'>
            {`${mediaList.length} ${mediasPreviewObject?.type}${mediaList.length > 1 ? 's' : ''} (${mediaList.length > 0 ? activeStep + 1 : 0}/${mediaList.length})`}
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