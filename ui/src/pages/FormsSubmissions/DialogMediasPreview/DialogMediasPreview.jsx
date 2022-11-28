import { useState, useEffect } from 'react'

// HOOKS
import useAxiosPrivate from 'hooks/useAxiosPrivate'

// MUIS
import AppBar from '@mui/material/AppBar'
import Dialog from '@mui/material/Dialog'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'

// MUI ICONS
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

  const loadMediaFilesData = async (inputAbortController, inputIsMounted) => {
    const resultMediaFilesData = await postDetailMediaFiles(
      inputAbortController.signal,
      { file_ids: mediasPreviewObject.file_ids },
      axiosPrivate,
    )

    if (resultMediaFilesData.status === 200 && inputIsMounted) {
      setMediaList(resultMediaFilesData.data.list)
    }
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
      onClose={() => setMediasPreviewObject(null)}
    >
      {/* HEADER */}
      <AppBar className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          {/* FILES COUNT */}
          <Typography 
            variant='subtitle1'
            
          >
            {`${mediaList.length} ${mediasPreviewObject?.type}${mediaList.length > 1 ? 's' : ''} (${activeStep + 1}/${mediaList.length})`}
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
            <IconButton onClick={() => setMediasPreviewObject(null)}>
              <IconClose/>
            </IconButton>
          </Stack>
        </Toolbar>
      </AppBar>
    </Dialog>
  )
}

export default DialogMediasPreview