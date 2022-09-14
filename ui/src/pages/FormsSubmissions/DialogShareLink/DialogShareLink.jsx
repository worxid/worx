import { useContext, useState } from 'react'

// COMPONENTS
import DialogForm from 'components/DialogForm/DialogForm'

// CONTEXTS
import { AllPagesContext } from 'contexts/AllPagesContext'
import { PrivateLayoutContext } from 'contexts/PrivateLayoutContext'

// MUIS
import Autocomplete from '@mui/material/Autocomplete'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

// MUI ICONS
import IconClose from '@mui/icons-material/Close'
import IconLink from '@mui/icons-material/Link'

// STYLES
import useStyles from './dialogShareLinkUseStyles'

const DialogShareLink = () => {
  // STYLES
  const classes = useStyles()

  // CONTEXTS
  const { setSnackbarObject } = useContext(AllPagesContext)
  const { setIsDialogFormOpen } = useContext(PrivateLayoutContext)

  // RECEIVERS
  const [receivers, setReceivers] = useState([])

  // HANDLE BUTTON SEND CLICK
  const handleButtonSendClick = () => {
    setIsDialogFormOpen(false)
    setSnackbarObject({
      open: true,
      severity:'success',
      title:'',
      message:'Successfully sent the form via email'
    })
  }

  // HANDLE BUTTON COPY CLICK
  const handleButtonCopyClick = (event, url) => {
    navigator.clipboard.writeText(url)
    setSnackbarObject({
      open: true,
      severity:'success',
      title:'',
      message:'Successfully copied the link'
    })
  }

  return (
    <DialogForm
      title={<Stack direction='row' alignItems='center'>
        <Typography variant='subtitle1' flex={1}>Share Form</Typography>

        <IconButton onClick={() => setIsDialogFormOpen(false)}>
          <IconClose fontSize='small'/>
        </IconButton>
      </Stack>}
      areActionsAvailable={false}
      classNames={classes.dialogShareLink}
    >
      <Divider />

      {/* CONTENT SHARE EMAIL */}
      <Stack className={classes.content}>
        <Typography variant='subtitle2' className='fontWeight400'>Share on email</Typography>
        <Typography variant='caption' color='text.secondary'>Share a direct link to your form via email</Typography>

        <Stack direction='row' alignItems='center' marginTop={'20px'}>
          {/* RECEVIVERS EMAIL */}
          <Autocomplete
            className={classes.inputEmailAutocomplete}
            fullWidth
            disableClearable
            multiple
            options={[]}
            defaultValue={[]}
            freeSolo
            onChange={(event, value) => setReceivers((state) => value)}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => {
                return (
                  <Chip
                    className={`${classes.chipCustom} heightFitContent`}
                    size='small'
                    key={index}
                    label={option}
                    {...getTagProps({ index })}
                  />
                )
              })
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label='Add email'
                color='secondary'
              />
            )}
          />
          
          {/* BUTTON SEND FORM */}
          <Stack paddingLeft={'12px'}>
            <Button
              size='small'
              variant='contained'
              className={`${classes.buttonRedPrimary} heightFitContent`}
              onClick={handleButtonSendClick}
            >
              Send Form
            </Button>
          </Stack>
        </Stack>
      </Stack>

      <Divider className={classes.dividerContent}/>

      {/* CONTENT DIRECT LINK */}
      <Stack className={classes.content}>
        <Typography variant='subtitle2' className='fontWeight400'>Direct Link</Typography>
        <Typography variant='caption' color='text.secondary'>You can share the direct link to your form</Typography>

        <Stack direction='row' alignItems='center' marginTop={'20px'}>
          <Stack direction='row' alignItems='center' className={classes.boxLink}>
            <IconLink className={classes.iconLink} fontSize='small'/>

            <Typography
              variant='caption'
              color='text.secondary'
              noWrap
            >
              http://ww.worx.id//validformsid12345hajsdsddsds
            </Typography>
          </Stack>

          <Stack paddingLeft={'12px'}>
            <Button
              size='small'
              variant='contained'
              className={`${classes.buttonRedLight} heightFitContent`}
              onClick={(event) => handleButtonCopyClick(event, 'http://ww.worx.id//validformsid12345hajsdsddsds')}
            >
              Copy Link
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </DialogForm>
  )
}

export default DialogShareLink