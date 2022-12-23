import { useContext, useState } from 'react'

// CONTEXTS
import { AllPagesContext } from 'contexts/AllPagesContext'

// HOOKS
import useAxiosPrivate from 'hooks/useAxiosPrivate'

// MUIS
import CircularProgress from '@mui/material/CircularProgress'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

// MUI ICONS
import IconDownload from '@mui/icons-material/Download'

// SERVICES
import { postExportSubmissionDetail } from 'services/worx/form'

// STYLES
import useStyles from './formsSubmissionsDetailUseStyles'

// UTILITIES
import { downloadFileFromFileObject } from 'utilities/file'
import { getDefaultErrorMessage } from 'utilities/object'
import { 
  didSuccessfullyCallTheApi, 
  wasAccessTokenExpired,
  wasRequestCanceled, 
} from 'utilities/validation'

const Header = (props) => {
  const { title, id } = props

  const classes = useStyles()

  const { setSnackbarObject } = useContext(AllPagesContext)

  const axiosPrivate = useAxiosPrivate()

  // STATES
  const [isLoadingDownload, setIsLoadingDownload] = useState(false)
  
  const handleDownloadIconButtonClick = async () => {
    setIsLoadingDownload(true)
    const abortController = new AbortController()

    const resultDownload = await postExportSubmissionDetail(
      abortController.signal,
      { form_id: id },
      axiosPrivate,
    )

    if (didSuccessfullyCallTheApi(resultDownload.status)) {
      downloadFileFromFileObject(
        new Blob([ resultDownload.data ]),
        `Submission Detail_${title}_${id}.docx`,
      )
    }
    else if (!wasRequestCanceled(resultDownload?.status) && !wasAccessTokenExpired(resultDownload.status)) {
      setSnackbarObject(getDefaultErrorMessage(resultDownload))
    }

    setIsLoadingDownload(false)
  }

  return (
    <Stack
      className={classes.header}
      direction='row'
      alignItems='center'
    >
      {/* TITLE */}
      <Typography
        className={classes.headerTitle}
        variant='subtitle1'
      >
        {title}
      </Typography>

      {isLoadingDownload && <CircularProgress color='primary' size={20} />}

      {/* BUTTON DOWNLOAD */}
      {!isLoadingDownload && (<IconButton onClick={handleDownloadIconButtonClick}>
        <IconDownload/>
      </IconButton>)}
    </Stack>
  )
}

export default Header