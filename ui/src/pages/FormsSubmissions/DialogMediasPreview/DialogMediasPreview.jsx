import { useEffect } from 'react'

// HOOKS
import useAxiosPrivate from 'hooks/useAxiosPrivate'

// MUIS
import Dialog from '@mui/material/Dialog'

// SERVICES
import { postDetailMediaFiles } from 'services/media'

const DialogMediasPreview = (props) => {
  const { mediasPreviewObject, setMediasPreviewObject } = props

  const axiosPrivate = useAxiosPrivate()

  const loadMediaFilesData = async (inputAbortController, inputIsMounted) => {
    const resultMediaFilesData = await postDetailMediaFiles(
      inputAbortController.signal,
      { file_ids: mediasPreviewObject.file_ids },
      axiosPrivate,
    )
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
      DialogMediasPreview
    </Dialog>
  )
}

export default DialogMediasPreview