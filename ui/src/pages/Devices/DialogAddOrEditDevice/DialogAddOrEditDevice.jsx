import { useState, useContext, useEffect } from 'react'

// COMPONENTS
import DialogAddOrEdit from 'components/DialogAddOrEdit/DialogAddOrEdit'

// CONTEXTS
import { PrivateLayoutContext } from 'contexts/PrivateLayoutContext'

// CUSTOM COMPONENTS
import CustomDialogActions from 'components/DialogAddOrEdit/Customs/CustomDialogActions'
import CustomDialogActionButton from 'components/Customs/CustomDialogActionButton'
import CustomDialogContent from 'components/DialogAddOrEdit/Customs/CustomDialogContent'
import CustomDialogTitle from 'components/DialogAddOrEdit/Customs/CustomDialogTitle'

// MUIS
import Input from '@mui/material/Input'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

// MUI ICONS
import IconClose from '@mui/icons-material/Close'
import IconFormatColorText from '@mui/icons-material/FormatColorText'

// STYLES
import useStyles from './devicesUseStyles'
import useLayoutStyles from 'styles/layoutPrivate'

const DialogAddOrEditDevice = () => {
  const classes = useStyles()
  const layoutClasses = useLayoutStyles()

  const { isDialogAddOrEditOpen, setIsDialogAddOrEditOpen } = useContext(PrivateLayoutContext)

  const [ label, setLabel ] = useState('')

  useEffect(() => {
    setLabel(isDialogAddOrEditOpen?.label ?? '')
  }, [isDialogAddOrEditOpen])

  const handleActionButtonClick = async (inputType) => {
    setIsDialogAddOrEditOpen(false)
    if (inputType === 'save') {
    }
    setLabel('')
  }

  return (
    <DialogAddOrEdit>
      {/* DIALOG TITLE */}
      <CustomDialogTitle>
        <Stack direction='row' alignItems='center'>
          {/* CLOSE ICON */}
          <IconClose
            className={layoutClasses.dialogAddOrEditIconClose}
            onClick={() => setIsDialogAddOrEditOpen(false)}
          />

          {/* TITLE */}
          <Typography className='fontWeight500 fontSize22'>
            Edit Device
          </Typography>
        </Stack>
      </CustomDialogTitle>

      {/* DIALOG CONTENT */}
      <CustomDialogContent>
        <Typography variant='h6'>
          Main Information
        </Typography>

        {/* LABEL INPUT */}
        <Stack direction='row' className={classes.iconAndFormControlContainer}>
          <IconFormatColorText className={classes.iconFormControl}/>
          <FormControl 
            variant='standard' 
            className={classes.formControl}
          >
            <InputLabel>
              Label
            </InputLabel>
            <Input
              placeholder='Label'
              type='text'
              value={label}
              onChange={(event) => setLabel(event.target.value)}
            />
          </FormControl>
        </Stack>
      </CustomDialogContent>

      {/* DIALOG ACTIONS */}
      <CustomDialogActions>
        {/* CANCEL BUTTON */}
        <CustomDialogActionButton 
          className={`${layoutClasses.dialogButton} ${layoutClasses.greyButton}`}
          onClick={() => handleActionButtonClick('cancel')}
        >
          Cancel
        </CustomDialogActionButton>

        {/* SAVE BUTTON */}
        <CustomDialogActionButton
          className={`${layoutClasses.dialogButton} ${layoutClasses.redButton}`} 
          onClick={() => handleActionButtonClick('save')}
        >
          Save
        </CustomDialogActionButton>
      </CustomDialogActions>
    </DialogAddOrEdit>
  )
}

export default DialogAddOrEditDevice