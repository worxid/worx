// TO DO: DELETE THIS COMPONENT
import { useState, useContext, useEffect } from 'react'

// COMPONENTS
import DialogAddOrEdit from 'components/DialogAddOrEdit/DialogAddOrEdit'

// CONTEXTS
import { AllPagesContext } from 'contexts/AllPagesContext'
import { PrivateLayoutContext } from 'contexts/PrivateLayoutContext'

// CUSTOM COMPONENTS
import FlyoutActions from 'components/Flyout/FlyoutActions'
import CustomDialogActionButton from 'components/Customs/CustomDialogActionButton'
import FlyoutContent from 'components/Flyout/FlyoutContent'
import FlyoutTitle from 'components/Flyout/FlyoutTitle'

// HOOKS
import useAxiosPrivate from 'hooks/useAxiosPrivate'

// MUIS
import Input from '@mui/material/Input'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

// MUI ICONS
import IconClose from '@mui/icons-material/Close'
import IconFormatColorText from '@mui/icons-material/FormatColorText'

// SERVICES
import { putUpdateLabelDevices } from 'services/worx/devices'

// STYLES
import useLayoutStyles from 'styles/layoutPrivate'

// UTILITIES
import { getDefaultErrorMessage } from 'utilities/object'
import { 
  didSuccessfullyCallTheApi, 
  wasAccessTokenExpired,
  wasRequestCanceled,
} from 'utilities/validation'

const DialogAddOrEditDevice = (props) => {
  const layoutClasses = useLayoutStyles()
  
  const { dataDialogEdit, setDataDialogEdit, reloadData } = props
  const { setIsDialogAddOrEditOpen } = useContext(PrivateLayoutContext)

  const { setSnackbarObject } = useContext(AllPagesContext)

  const axiosPrivate = useAxiosPrivate()

  const [ label, setLabel ] = useState('')

  const handleActionButtonClick = async (inputType) => {
    const abortController = new AbortController()

    if (inputType === 'save') {
      if (label.length) {
        const response = await putUpdateLabelDevices(
          dataDialogEdit?.id,
          abortController.signal,
          {
            label,
          },
          axiosPrivate,
        )
  
        if (didSuccessfullyCallTheApi(response?.status)) {
          setSnackbarObject({
            open: true,
            severity:'success',
            title: '',
            message: 'Successfully change device',
          })
          reloadData(abortController.signal, true)
          handleClose()
        } 
        else if (!wasRequestCanceled(response?.status) && !wasAccessTokenExpired(response.status)) {
          setSnackbarObject(getDefaultErrorMessage(response))
        }
      } 
      else {
        setSnackbarObject({
          open: true,
          severity:'error',
          title: '',
          message: 'Label field must be filled',
        })
      }
    } 
    else {
      handleClose()
    }
  }
  
  const handleClose = () => {
    setLabel('')
    setDataDialogEdit(null)
    setIsDialogAddOrEditOpen(false)
  }

  useEffect(() => {
    setLabel(dataDialogEdit?.label ?? '')
  }, [dataDialogEdit])

  return (
    <DialogAddOrEdit>
      {/* DIALOG TITLE */}
      <FlyoutTitle>
        <Stack direction='row' alignItems='center'>
          {/* CLOSE ICON */}
          <IconClose
            className={layoutClasses.dialogAddOrEditIconClose}
            onClick={handleClose}
          />

          {/* TITLE */}
          <Typography variant='h6' className='fontWeight500'>
            Edit Device
          </Typography>
        </Stack>
      </FlyoutTitle>

      {/* DIALOG CONTENT */}
      <FlyoutContent>
        <Typography variant='subtitle1'>
          Main Information
        </Typography>

        {/* LABEL INPUT */}
        <Stack direction='row' className={layoutClasses.dialogAddOrEditFormControlContainer}>
          <IconFormatColorText className={layoutClasses.dialogAddOrEditFormControlIcon}/>
          <FormControl 
            variant='standard' 
            className='width100'
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
      </FlyoutContent>

      {/* DIALOG ACTIONS */}
      <FlyoutActions>
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
      </FlyoutActions>
    </DialogAddOrEdit>
  )
}

export default DialogAddOrEditDevice