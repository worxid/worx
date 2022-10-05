import { useState, useContext, useEffect } from 'react'

// COMPONENTS
import DialogAddOrEdit from 'components/DialogAddOrEdit/DialogAddOrEdit'

// CONSTANTS
import { values } from 'constants/values'

// CONTEXTS
import { AllPagesContext } from 'contexts/AllPagesContext'
import { PrivateLayoutContext } from 'contexts/PrivateLayoutContext'

// CUSTOM COMPONENTS
import CustomDialogActions from 'components/DialogAddOrEdit/Customs/CustomDialogActions'
import CustomDialogActionButton from 'components/Customs/CustomDialogActionButton'
import CustomDialogContent from 'components/DialogAddOrEdit/Customs/CustomDialogContent'
import CustomDialogTitle from 'components/DialogAddOrEdit/Customs/CustomDialogTitle'

// MUIS
import Box from '@mui/material/Box'
import Input from '@mui/material/Input'
import InputAdornment from '@mui/material/InputAdornment'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import Popover from '@mui/material/Popover'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

// MUI ICONS
import IconClose from '@mui/icons-material/Close'
import IconFormatColorText from '@mui/icons-material/FormatColorText'

// SERVICES
import { 
  postCreateGroup, 
  putEditGroup,
} from 'services/group'

// STYLES
import useLayoutStyles from 'styles/layoutPrivate'
import useStyles from './dialogAddOrEditGroupUseStyles'

// UTILITIES
import { didSuccessfullyCallTheApi } from 'utilities/validation'

const DialogAddOrEditGroup = (props) => {
  const { 
    dialogType, 
    dataDialogEdit, 
    setDataDialogEdit, 
    setMustReloadDataGrid,
  } = props

  const layoutClasses = useLayoutStyles()
  const classes = useStyles()

  const { setIsDialogAddOrEditOpen } = useContext(PrivateLayoutContext)

  const { setSnackbarObject } = useContext(AllPagesContext)

  const [ groupName, setGroupName ] = useState('')
  const [ groupColor, setGroupColor ] = useState('#000000')

  const [ anchorEl, setAnchorEl ] = useState(null)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  
  const handleClosePopOver = () => {
    setAnchorEl(null)
  }

  const openPicker = Boolean(anchorEl)
  const id = openPicker ? 'simple-popover' : undefined

  const onSelectColor = (color) => {
    setGroupColor(color)
    setAnchorEl(null)
    handleClosePopOver()
  }

  const handleActionButtonClick = async (inputType) => {
    if (inputType === 'save') {
      const abortController = new AbortController()
      
      // CREATE A NEW GROUP ITEM
      if (dialogType === 'Add New') {
        const resultCreateGroup = await postCreateGroup(
          abortController.signal,
          {
            name: groupName,
            color: groupColor,
          },
        )

        if (didSuccessfullyCallTheApi(resultCreateGroup.status)) {
          handleClose()
          setMustReloadDataGrid(true)

          setSnackbarObject({
            open: true,
            severity: 'success',
            title: '',
            message: 'Successful in creating a new group'
          })
        }

      }
      // EDIT AN EXISTING GROUP ITEM
      else if (dialogType === 'Edit') {
        const resultEditGroup = await putEditGroup(
          abortController.signal,
          dataDialogEdit.id,
          {
            name: groupName,
            color: groupColor,
          },
        )

        if (didSuccessfullyCallTheApi(resultEditGroup.status)) {
          handleClose()
          setMustReloadDataGrid(true)

          setSnackbarObject({
            open: true,
            severity: 'success',
            title: '',
            message: 'Success changing group properties'
          })
        }
      }

      abortController.abort()
    }

    // handleClose()
  }
  
  const handleClose = () => {
    setAnchorEl(null)
    setGroupName('')
    setGroupColor('#000')
    setDataDialogEdit(null)
    setIsDialogAddOrEditOpen(false)
  }

  useEffect(() => {
    if (dialogType === 'Edit' && dataDialogEdit) {
      setGroupName(dataDialogEdit?.name ?? '')
      setGroupColor(dataDialogEdit?.color ?? '#000000')
    }
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
            {dialogType} Group
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
              Group Name
            </InputLabel>
            <Input
              placeholder='Group Name'
              type='text'
              value={groupName}
              onChange={(event) => setGroupName(event.target.value)}
              endAdornment={
                <InputAdornment position='end'>
                  <Stack
                    className={classes.pickerStyle}
                    style={{ backgroundColor: groupColor }}
                    onClick={handleClick}
                  />
                </InputAdornment>
              }
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

      <Popover
        id={id}
        open={openPicker}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        className={classes.popOverDialog}
      >
        <Box className={classes.colorWrap}>
          {values?.colorsCst?.map((item, index) => {
            return (
              <Stack
                key={index}
                className={classes.itemColor}
                onClick={() => onSelectColor(item)}
                sx={{ backgroundColor: item }}
              />
            )
          })}
        </Box>
      </Popover>
    </DialogAddOrEdit>
  )
}

export default DialogAddOrEditGroup