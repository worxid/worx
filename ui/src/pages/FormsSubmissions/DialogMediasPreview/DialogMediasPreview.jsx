import { useState, useEffect } from 'react'

// HOOKS
import useAxiosPrivate from 'hooks/useAxiosPrivate'

// MUIS
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
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
import { postDetailMediaFiles } from 'services/media'

// STYLES
import useStyles from './dialogMediasPreviewUseStyles'

const DialogMediasPreview = (props) => {
  const { mediasPreviewObject, setMediasPreviewObject } = props

  const classes = useStyles()

  const axiosPrivate = useAxiosPrivate()

  const [ mediaList, setMediaList ] = useState([])
  const [ activeStep, setActiveStep ] = useState(0)
  
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
    else if (inputMediaObject?.mimeType?.includes('application/')) output = {
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

    if (resultMediaFilesData.status === 200 && inputIsMounted) {
      setMediaList(resultMediaFilesData.data.list)
    }
  }

  const handleDialogClose = () => {
    setMediasPreviewObject(null)
    setMediaList([])
    setActiveStep(0)
  }

  useEffect(() => {
    let isMounted = true
    const abortController = new AbortController()

    if (Boolean(mediasPreviewObject)) loadMediaFilesData(abortController, isMounted)

    return () => {
      isMounted = false
      abortController.abort()
    }
  }, [mediasPreviewObject])

  return (
    <Dialog
      fullScreen
      open={Boolean(mediasPreviewObject)}
      onClose={handleDialogClose}
    >
      {/* HEADER */}
      <AppBar className={classes.appBar}>
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
            <IconButton>
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
        className={classes.content}
      >
        {mediaList.length > 0 &&
        <Box
          component={getContentPropertyFromMediaObject(mediaList[activeStep]).component}
          src={getContentPropertyFromMediaObject(mediaList[activeStep]).src}
          alt=''
          className={getContentPropertyFromMediaObject(mediaList[activeStep]).className}
        />}
      </Stack>

      {/* BOTTOM MENU */}
      <AppBar className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          {/* BACK BUTTON */}
          <Button
            className={classes.actionButton}
            startIcon={<IconArrowBackIos/>}
            disabled={activeStep === 0}
            onClick={() => setActiveStep((prevActiveStep) => prevActiveStep - 1)}
          >
            BACK
          </Button>

          {/* NEXT BUTTON */}
          <Button
            className={classes.actionButton}
            endIcon={<IconArrowForwardIos/>}
            disabled={activeStep === mediaList.length - 1}
            onClick={() => setActiveStep((prevActiveStep) => prevActiveStep + 1)}
          >
            NEXT
          </Button>
        </Toolbar>
      </AppBar>
    </Dialog>
  )
}

export default DialogMediasPreview