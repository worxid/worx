import { useState, useContext, useEffect } from 'react'

// COMPONENTS
import DialogAddOrEdit from 'components/DialogAddOrEdit/DialogAddOrEdit'

// CONTEXTS
import { AllPagesContext } from 'contexts/AllPagesContext'
import { PrivateLayoutContext } from 'contexts/PrivateLayoutContext'

// CUSTOM COMPONENTS
import CustomDialogActions from 'components/DialogAddOrEdit/Customs/CustomDialogActions'
import CustomDialogActionButton from 'components/Customs/CustomDialogActionButton'
import CustomDialogContent from 'components/DialogAddOrEdit/Customs/CustomDialogContent'
import CustomDialogTitle from 'components/DialogAddOrEdit/Customs/CustomDialogTitle'

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
import { putUpdateLabelDevices } from 'services/devices'

// STYLES
import useLayoutStyles from 'styles/layoutPrivate'

// UTILITIES
import { didSuccessfullyCallTheApi } from 'utilities/validation'

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
      if(label.length) {
        const response = await putUpdateLabelDevices(
          dataDialogEdit?.id,
          abortController.signal,
          {
            label,
          },
          axiosPrivate,
        )
  
        if(didSuccessfullyCallTheApi(response?.status)) {
          setSnackbarObject({
            open: true,
            severity:'success',
            title: '',
            message: 'Successfully change device',
          })
          reloadData(abortController.signal, true)
          handleClose()
        } else {
          setSnackbarObject({
            open: true,
            severity:'error',
            title: response?.data?.error?.status?.replaceAll('_', ' ') || '',
            message: response?.data?.error?.message || 'Something went wrong',
          })
        }
      } else {
        setSnackbarObject({
          open: true,
          severity:'error',
          title: '',
          message: 'Label field must be filled',
        })
      }
    } else {
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
      <CustomDialogTitle>
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
      </CustomDialogTitle>

      {/* DIALOG CONTENT */}
      <CustomDialogContent>
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