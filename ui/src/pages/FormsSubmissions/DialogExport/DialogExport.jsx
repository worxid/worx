import { useContext, useState } from 'react'

// COMPONENTS
import DialogForm from 'components/DialogForm/DialogForm'

// CONTEXTS
import { PrivateLayoutContext } from 'contexts/PrivateLayoutContext'

// HOOKS
import useAxiosPrivate from 'hooks/useAxiosPrivate'

// MUIS
import CircularProgress from '@mui/material/CircularProgress'
import Divider from '@mui/material/Divider'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import IconButton from '@mui/material/IconButton'
import LoadingButton from '@mui/lab/LoadingButton'
import Stack from '@mui/material/Stack'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import Typography from '@mui/material/Typography'

// MUI ICONS
import IconClose from '@mui/icons-material/Close'

// SERVICES
import { postExportFormSubmission } from 'services/worx/formTemplate'

// STYLES
import useStyles from './dialogExportUseStyles'

// UTILITIES
import { downloadFileFromFileObject } from 'utilities/file'

const DialogExport = (props) => {
  const { id, title } = props
  const axiosPrivate = useAxiosPrivate()

  // STYLES
  const classes = useStyles()

  // CONTEXTS
  const { setIsDialogFormOpen } = useContext(PrivateLayoutContext)

  // STATES
  const [isLoading, setIsLoading] = useState(false)
  const [fileFormat, setFileFormat] = useState('')

  // HANDLE BUTTON SEND CLICK
  const handleButtonSendClick = async () => {
    const abortController = new AbortController()
    setIsLoading(true)

    // TO-DO: CHANGE PROMISE THEN CATCH WITH ASYNC AWAIT
    if(fileFormat || fileFormat !== '') {
      postExportFormSubmission(abortController.signal, {
        templateId: id,
        option: fileFormat
      }, axiosPrivate)
        .then((response) => {
          downloadFileFromFileObject(
            new Blob([response]),
            `Form_Submissions${title ? `_${title}` : ''}.${fileFormat.toLowerCase()}`,
          )

          setIsLoading(false)
          abortController.abort()
          setTimeout(() => {
            setFileFormat('')
            setIsDialogFormOpen(false)
          }, 1000)      
        })
        .catch(err => console.log(err))
    }
  }

  return (
    <DialogForm
      // isLoading={isLoading}
      dialogName='dialogExport'
      title={<Stack direction='row' alignItems='center'>
        <Typography variant='subtitle1' fontWeight={500} flex={1}>Export</Typography>

        <IconButton onClick={() => {
          setFileFormat('')
          setIsDialogFormOpen(false)
        }}>
          <IconClose fontSize='small'/>
        </IconButton>
      </Stack>}
      areActionsAvailable={false}
      classNames={classes.dialogExport}
    >
      <Divider />
      <Stack className={classes.content}>
        <Typography variant='subtitle2' className='fontWeight500'>File Format</Typography>
        <FormControl className={classes.formControl}>
          <RadioGroup
            row
            value={fileFormat}
            onChange={(event) => setFileFormat(event.target.value)}>
            <FormControlLabel
              value={'CSV'}
              control={<Radio size='small'/>}
              label={(
                <Typography variant='caption' className='displayBlock'>CSV</Typography>
              )}
            />
            <FormControlLabel
              value={'EXCEL'}
              control={<Radio size='small'/>}
              label={(
                <Typography variant='caption' className='displayBlock'>XLS</Typography>
              )}
            />
          </RadioGroup>
        </FormControl>
      </Stack>
      <Divider className={classes.dividerContent}/>

      {/* FOOTER */}
      <Stack alignItems='center' direction='row' justifyContent={'flex-end'} className={classes.footer} flexWrap='nowrap'>
        {
          isLoading ? (
            <Stack direction={'row'}>
              <Typography className={classes.exportLoadingText}>Exporting Data... </Typography>
              <CircularProgress className={classes.loading}/>
            </Stack>
          ) : (
            <LoadingButton
              size='small'
              variant='contained'
              className={`${classes.buttonRedPrimary} heightFitContent`}
              onClick={handleButtonSendClick}
              loading={isLoading}
              disabled={!fileFormat || fileFormat === ''}
            >
              Export
            </LoadingButton>
          )
        }
      </Stack>
    </DialogForm>
  )
}

export default DialogExport