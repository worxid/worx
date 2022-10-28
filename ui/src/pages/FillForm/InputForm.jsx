import { useContext, useState } from 'react'
import { v4 as uuid } from 'uuid'

// COMPONENTS
import DialogCamera from './DialogCamera/DialogCamera'
import DialogForm from 'components/DialogForm/DialogForm'

// CONTEXT
import { AllPagesContext } from 'contexts/AllPagesContext'
import { PrivateLayoutContext } from 'contexts/PrivateLayoutContext'

// CONSTANTS
import { anyFormatFile, anyFormatImage, checkboxErrorMessage, dataURLtoFileObject, formatBytes, formatFileValidation, getKeyValue, sizeFileValidation } from './fillFormConstants'

// LIBRARY
import SignatureCanvas from 'react-signature-canvas'

// MUIS
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Checkbox from '@mui/material/Checkbox'
import Divider from '@mui/material/Divider'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import FormHelperText from '@mui/material/FormHelperText'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import InputLabel from '@mui/material/InputLabel'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemText from '@mui/material/ListItemText'
import MenuItem from '@mui/material/MenuItem'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import Rating from '@mui/material/Rating'
import Select from '@mui/material/Select'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

// MUI ICONS
import IconAttachFile from '@mui/icons-material/AttachFile'
import IconCameraAlt from '@mui/icons-material/CameraAlt'
import IconCancel from '@mui/icons-material/Cancel'
import IconCreate from '@mui/icons-material/Create'
import IconDateRange from '@mui/icons-material/DateRange'
import IconImage from '@mui/icons-material/Image'
import IconInsertDriveFile from '@mui/icons-material/InsertDriveFile'
import IconStar from '@mui/icons-material/Star'


// MUI X
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker'

// SERVICES
import { getMediaPresignedUrl } from 'services/media'

// STYLES
import useStyles from './fillFormUseStyles'

// UTILITIES
import { convertDate } from 'utilities/date'
import { didSuccessfullyCallTheApi } from 'utilities/validation'

const InputForm = (props) => {
  const { item, handleInputChange, formObject, formObjectError, setFormObjectError } = props

  // CONTEXT
  const { setSnackbarObject, breakpointType } = useContext(AllPagesContext)
  const { setIsDialogFormOpen } = useContext(PrivateLayoutContext)

  // STATES
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)
  const [signatureRef, setSignatureRef] = useState()
  const [selectedDialog, setSelectedDialog] = useState('')

  // STYLES
  const classes = useStyles()

  // HANDLE ERROR MESSAGE
  const handleErrorMessage = (fieldId, message) => {
    let tempErrorMessage = formObjectError
    tempErrorMessage[fieldId] = message
    setFormObjectError({...tempErrorMessage})
  }

  // HANDLE SIGANTURE ACTION BUTTON CLICK
  const handleSignatureActionButtonClick = async (inputType, fieldId, fieldType) => {
    if (inputType === 'save') {
      const fileObject = dataURLtoFileObject(signatureRef?.toDataURL(), `signature-${uuid()}.png`)

      // UPLOAD MEDIA
      const abortController = new AbortController()
      const response = await getMediaPresignedUrl(abortController.signal, {
        filename: fileObject.name
      })
      if(didSuccessfullyCallTheApi(response?.status)) {
        setSnackbarObject({
          open: true,
          severity:'success',
          title: '',
          message: 'Success upload a signature',
        })

        handleInputChange(
          fieldId,
          fieldType,
          getKeyValue(fieldType),
          { file: fileObject, idFile: response.data.fileId }
        )
      } else {
        setSnackbarObject({
          open: true,
          severity:'error',
          title: '',
          message: 'Failed upload a signature',
        })
      }
    }

    setSelectedDialog('')
    setIsDialogFormOpen(false)
  }

  // HANDLE DELETE SIGNATURE
  const handleDeleteSignature = (fieldId, fieldType) => {
    handleInputChange(
      fieldId,
      fieldType,
      getKeyValue(fieldType),
      { file: null }
    )

    setSelectedDialog('')
    setIsDialogFormOpen(false)
  }

  // HANDLE GALLERY CHANGE
  const handleGalleryChange = async (event, fieldId, fieldType) => {
    let temp = formObject[fieldId]?.values || []

    // CHECK MAX FILES
    if(temp.length >= Number(item.max_files)) {
      handleErrorMessage(
        fieldId,
        `Max files is ${item.max_files}`
      )
      return
    }

    // CHECK FILE FORMAT
    if(!formatFileValidation(event.target.files[0], anyFormatImage)) {
      handleErrorMessage(
        fieldId,
        `Only accept format ${anyFormatImage.join(', ').replace(/, ([^,]*)$/, ' and $1')}`
      )
      return
    }

    // CLEAR ERROR MESSAGE
    handleErrorMessage(fieldId, '')

    // UPLOAD MEDIA
    const abortController = new AbortController()
    const response = await getMediaPresignedUrl(abortController.signal, {
      filename: event.target.files[0].name
    })
    if(didSuccessfullyCallTheApi(response?.status)) {
      setSnackbarObject({
        open: true,
        severity:'success',
        title: '',
        message: 'Success upload a image',
      })

      temp.push({ file: event.target.files[0], id: response.data.fileId })
      handleInputChange(fieldId, fieldType, getKeyValue(fieldType), temp)
    } else {
      setSnackbarObject({
        open: true,
        severity:'error',
        title: '',
        message: 'Failed upload a image',
      })
    }
  }

  // HANDLE CAMERA CHANGE
  const handleCamera = async (fieldId, fieldType, resultPhoto) => {
    setSelectedDialog('')
    setIsDialogFormOpen(false)

    let temp = formObject[fieldId]?.values || []
    const imageInObject = dataURLtoFileObject(resultPhoto, `photo-${uuid()}.jpeg`)

    // CHECK MAX FILES
    if(temp.length >= Number(item.max_files)) {
      handleErrorMessage(
        fieldId,
        `Max files is ${item.max_files}`
      )
      return
    }

    // CHECK FILE FORMAT
    if(!formatFileValidation(imageInObject, anyFormatImage)) {
      handleErrorMessage(
        fieldId,
        `Only accept format ${anyFormatImage.join(', ').replace(/, ([^,]*)$/, ' and $1')}`
      )
      return
    }

    // CLEAR ERROR MESSAGE
    handleErrorMessage(fieldId, '')

    // UPLOAD MEDIA
    const abortController = new AbortController()
    const response = await getMediaPresignedUrl(abortController.signal, {
      filename: imageInObject.name
    })
    if(didSuccessfullyCallTheApi(response?.status)) {
      setSnackbarObject({
        open: true,
        severity:'success',
        title: '',
        message: 'Success upload a image',
      })

      temp.push({ file: imageInObject, id: response.data.fileId })
      handleInputChange(fieldId, fieldType, getKeyValue(fieldType), temp)
    } else {
      setSnackbarObject({
        open: true,
        severity:'error',
        title: '',
        message: 'Failed upload a image',
      })
    }
  }

  // HANDLE FILE CHANGE
  const handleFileChange = async (event, fieldId, fieldType, allowedExtensions) => {
    let temp = formObject[fieldId]?.values || []

    const acceptEtensions = allowedExtensions[0] === 'any' ? anyFormatFile : allowedExtensions

    // CHECK MAX FILES
    if(temp.length >= Number(item.max_files)) {
      handleErrorMessage(
        fieldId,
        `Max files is ${item.max_files}`
      )
      return
    }

    // CHECK FILE FORMAT
    if(!formatFileValidation(event.target.files[0], acceptEtensions)) {
      handleErrorMessage(
        fieldId,
        `Only accept format ${acceptEtensions.join(', ').replace(/, ([^,]*)$/, ' and $1')}`
      )
      return
    }

    // CHECK FILE SIZE
    if(!sizeFileValidation(
      event.target.files[0], item.min_file_size, item.file_min_size_type, item.max_file_size, item.file_max_size_type
    )) {
      handleErrorMessage(
        fieldId,
        `Min size is ${item.min_file_size} ${item.file_min_size_type} & max size is ${item.max_file_size} ${item.file_max_size_type}`
      )
      return
    }

    // CLEAR ERROR MESSAGE
    handleErrorMessage(fieldId, '')

    // UPLOAD MEDIA
    const abortController = new AbortController()
    const response = await getMediaPresignedUrl(abortController.signal, {
      filename: event.target.files[0].name
    })
    if(didSuccessfullyCallTheApi(response?.status)) {
      setSnackbarObject({
        open: true,
        severity:'success',
        title: '',
        message: 'Success upload a file',
      })

      temp.push({ file: event.target.files[0], idFile: response.data.fileId })
      handleInputChange(fieldId, fieldType, getKeyValue(fieldType), temp)
    } else {
      setSnackbarObject({
        open: true,
        severity:'error',
        title: '',
        message: 'Failed upload a file',
      })
    }
  }

  // HANDLE CHECKBOX CHANGE
  const handleCheckboxChange = (event, fieldId, fieldType, indexGroup) => {
    let temp = formObject[fieldId][getKeyValue(fieldType)]

    temp[indexGroup] = event.target.checked
    handleInputChange(fieldId, fieldType, getKeyValue(fieldType), temp)
  }

  // HANDLE REMOVE FILE
  const handleRemoveFile = (fieldId, fieldType, indexId) => {
    const remove = formObject[fieldId][getKeyValue(fieldType)].filter((item, index) => index !== indexId)
    handleInputChange(fieldId, fieldType, getKeyValue(fieldType), remove.length > 0 ? remove : null)
  }

  return (
    <Stack
      sx={{
        marginTop: {
          xs: item.type === 'separator' ? 0 : '12px',
          md: item.type === 'separator' ? 0 : '32px'
        },
      }}
    >
      {/* SEPARATOR */}
      {item.type === 'separator' && <Divider className={classes.separatorType}/>}

      {/* LABEL & DESCRIPTION */}
      <Box className={classes.formLabelWrap}>
        <Typography
          variant='subtitle2'
          color={Boolean(formObjectError?.[item.id]) ? 'error.main' : 'text.primary'}
          className='displayBlock fontWeight400'
          noWrap
        >
          {item.label} {item.required && '*'}
        </Typography>
        <Typography
          variant='caption'
          color={Boolean(formObjectError?.[item.id]) ? 'error.main' : 'text.secondary'}
          className='displayBlock'
          noWrap
        >
          {item.description}
        </Typography>
      </Box>

      {/* TEXTFIELD */}
      {item.type === 'text' && (
        <FormControl
          fullWidth
          className={classes.formControl}
          required={item.required}
          error={Boolean(formObjectError?.[item.id])}
        >
          <TextField
            error={Boolean(formObjectError?.[item.id])}
            label='Answer'
            variant='filled'
            size='small'
            className='heightFitContent'
            onChange={(event) => handleInputChange(item.id, item.type, getKeyValue(item.type), event.target.value)}
          />

          {formObjectError?.[item.id] && (
            <FormHelperText variant='error' className={classes.formHelperText}>
              {formObjectError?.[item.id]}
            </FormHelperText>
          )}
        </FormControl>
      )}

      {/* CHECKBOX */}
      {item.type === 'checkbox_group' && (
        <FormControl
          className={classes.formControl}
          required={item.required}
          error={Boolean(formObjectError?.[item.id])}
        >
          <FormGroup>
            {item.group.map((itemOption, index) => (
              <FormControlLabel
                key={index}
                control={<Checkbox
                  size='small'
                  required={item.required}
                  value={itemOption.label}
                  onChange={(event) => handleCheckboxChange(event, item.id, item.type, index)}
                />}
                label={(
                  <Typography variant='caption' className='displayBlock'>{itemOption.label}</Typography>
                )}
              />
            ))}
          </FormGroup>

          {formObjectError?.[item.id] && (
            <FormHelperText variant='error' className={classes.formHelperText}>
              {checkboxErrorMessage(formObjectError?.[item.id], item.min_checked, item.max_checked)}
            </FormHelperText>
          )}
        </FormControl>
      )}

      {/* RADIO */}
      {item.type === 'radio_group' && (
        <FormControl
          className={classes.formControl}
          onChange={(event) => handleInputChange(
            item.id, item.type,
            getKeyValue(item.type),
            Number(event.target.value)
          )}
          required={item.required}
          error={Boolean(formObjectError?.[item.id])}
        >
          <RadioGroup>
            {item.options.map((itemOption, index) => (
              <FormControlLabel
                key={index}
                value={index}
                control={<Radio size='small'/>}
                label={(
                  <Typography variant='caption' className='displayBlock'>{itemOption.label}</Typography>
                )}
              />
            ))}
          </RadioGroup>

          {formObjectError?.[item.id] && (
            <FormHelperText variant='error' className={classes.formHelperText}>
              {formObjectError?.[item.id]}
            </FormHelperText>
          )}
        </FormControl>
      )}

      {/* DROPDOWN */}
      {item.type === 'dropdown' && (
        <FormControl
          variant='filled'
          fullWidth
          className={classes.formControl}
          required={item.required}
          error={Boolean(formObjectError?.[item.id])}
        >
          <InputLabel>Answer</InputLabel>
          <Select
            label={item.label}
            size='small'
            className='heightFitContent'
            onChange={(event) => handleInputChange(
              item.id,
              item.type,
              getKeyValue(item.type),
              Number(event.target.value)
            )}
            value={formObject[item.id]?.[getKeyValue(item.type)] >= 0
              ? formObject[item.id]?.[getKeyValue(item.type)] : ''
            }
          >
            {item.options.map((itemOption, index) => (
              <MenuItem key={index} value={index}>
                <Typography variant='caption' className='displayBlock' noWrap>{itemOption.label}</Typography>
              </MenuItem>
            ))}
          </Select>

          {formObjectError?.[item.id] && (
            <FormHelperText variant='error' className={classes.formHelperText}>
              {formObjectError?.[item.id]}
            </FormHelperText>
          )}
        </FormControl>
      )}

      {/* RATING */}
      {item.type === 'rating' && (
        <FormControl
          required={item.required}
          className={classes.formControl}
          onChange={(event) => handleInputChange(
            item.id,
            item.type,
            getKeyValue(item.type),
            Number(event.target.value)
          )}
          error={Boolean(formObjectError?.[item.id])}
        >
          <Rating
            value={formObject[item.id]?.[getKeyValue(item.type)] >= 1
              ? formObject[item.id]?.[getKeyValue(item.type)] : 0}
            max={item.ratingStarsCount}
            size='medium'
            emptyIcon={<IconStar className={classes.opacityHalf}/>}
          />

          {formObjectError?.[item.id] && (
            <FormHelperText variant='error' className={classes.formHelperText}>
              {formObjectError?.[item.id]}
            </FormHelperText>
          )}
        </FormControl>
      )}

      {/* DATE */}
      {item.type === 'date' && (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <FormControl
            fullWidth
            className={classes.formControl}
            required={item.required}
            error={Boolean(formObjectError?.[item.id])}
          >
            <Stack direction='row' alignItems='center'>
              <TextField
                value={formObject[item.id]?.[getKeyValue(item.type)] ? new Date(formObject[item.id][getKeyValue(item.type)] || Date.now()).toLocaleDateString('ID') : ''}
                label='Answer'
                variant='filled'
                size='small'
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton size='small' onClick={() => handleInputChange(item.id, item.type, getKeyValue(item.type), null)}>
                        <IconCancel
                          fontSize='small'
                        />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
                className='heightFitContent'
                fullWidth
              />

              <IconButton
                size='large'
                className={`${classes.buttonRedPrimary} buttonDateRange heightFitContent`}
                onClick={() => setIsDatePickerOpen(true)}
              >
                <IconDateRange fontSize='small'/>
              </IconButton>
            </Stack>

            {formObjectError?.[item.id] && (
              <FormHelperText variant='error' className={classes.formHelperText}>
                {formObjectError?.[item.id]}
              </FormHelperText>
            )}
          </FormControl>

          <FormControl error={Boolean(formObjectError?.[item.id])}>
            <MobileDatePicker
              label='For mobile'
              renderInput={(params) => <></>}
              onChange={(newValue) => handleInputChange(item.id, item.type, getKeyValue(item.type), convertDate(newValue, 'yyyy-MM-dd'))}
              onClose={() => setIsDatePickerOpen(false)}
              open={isDatePickerOpen}
              value={formObject[item.id]?.[getKeyValue(item.type)]}
              componentsProps={{
                actionBar: { className: classes.actionCalendar },
              }}
            />
          </FormControl>
        </LocalizationProvider>
      )}

      {/* IMAGE */}
      {item.type === 'photo' && (
        <FormControl
          className={classes.formControl}
          required={item.required}
          error={Boolean(formObjectError?.[item.id])}
        >
          {selectedDialog === item.id && (
            <DialogCamera
              handleCancel={() => {
                setSelectedDialog('')
                setIsDialogFormOpen(false)
              }}
              handleUsePhoto={(result) => handleCamera(item.id, item.type, result)}
              handleBackdropClick={() => setSelectedDialog('')}
            />
          )}

          {formObject[item.id]?.values && <List className={`${classes.listFile} padding0`}>
            {formObject[item.id]?.values?.map((itemImg, index) => (
              <ListItem className={classes.listItem} key={index}>
                <ListItemAvatar className={classes.listFileAvatar}>
                  <Box
                    className={classes.listImage}
                    component='img'
                    src={URL.createObjectURL(itemImg.file)}
                  />
                </ListItemAvatar>

                <ListItemText
                  className={classes.listItemText}
                  primary={itemImg.file.name}
                  secondary={formatBytes(itemImg.file.size)}
                />

                <IconButton
                  className='heightFitContent'
                  onClick={() => handleRemoveFile(item.id, item.type, index)}
                >
                  <IconCancel fontSize='small'/>
                </IconButton>
              </ListItem>
            ))}
          </List>}

          <Stack direction='row'>
            <Button
              size='small'
              className={`${classes.buttonRedPrimary} buttonCamera heightFitContent`}
              startIcon={<IconCameraAlt fontSize='small'/>}
              onClick={() => {
                setSelectedDialog(item.id)
                setIsDialogFormOpen(true)
              }}
            >
              Camera
            </Button>

            {item.allow_gallery_upload && (
              <Button
                size='small'
                className={`${classes.buttonRedPrimary} heightFitContent`}
                startIcon={<IconImage fontSize='small'/>}
                component='label'
              >
                Gallery
                <input
                  hidden
                  accept='image/png,image/jpeg'
                  type='file'
                  onChange={(event) => handleGalleryChange(event, item.id, item.type)}
                />
              </Button>
            )}
          </Stack>

          {formObjectError?.[item.id] && (
            <FormHelperText variant='error' className={classes.formHelperText}>
              {formObjectError?.[item.id]}
            </FormHelperText>
          )}
        </FormControl>
      )}

      {/* FILE */}
      {item.type === 'file' && (
        <FormControl
          error={Boolean(formObjectError?.[item.id])}
          className={classes.formControl}
          required={item.required}
        >
          {formObject[item.id]?.values && <List className={`${classes.listFile} padding0`}>
            {formObject[item.id]?.values.map((itemFile, index) => (
              <ListItem className={classes.listItem} key={index}>
                <ListItemAvatar className={classes.listFileAvatar}>
                  <IconInsertDriveFile className={classes.listFileIcon}/>
                </ListItemAvatar>
  
                <ListItemText
                  className={classes.listItemText}
                  primary={itemFile.file.name}
                  secondary={formatBytes(itemFile.file.size)}
                />

                <IconButton
                  className='heightFitContent'
                  onClick={() => handleRemoveFile(item.id, item.type, index)}
                >
                  <IconCancel fontSize='small'/>
                </IconButton>
              </ListItem>
            ))}
          </List>}

          <Button
            size='small'
            className={`${classes.buttonRedPrimary} buttonAddFile heightFitContent`}
            startIcon={<IconAttachFile fontSize='small'/>}
            component='label'
          >
            Add File
            <input
              hidden
              type='file'
              onChange={(event) => handleFileChange(event, item.id, item.type, item.allowed_extensions)}
            />
          </Button>

          {formObjectError?.[item.id] && (
            <FormHelperText variant='error' className={classes.formHelperText}>
              {formObjectError?.[item.id]}
            </FormHelperText>
          )}
        </FormControl>
      )}

      {/* SIGNATURE */}
      {item.type === 'signature' && (
        <>
          {selectedDialog === item.id && (
            <DialogForm
              classNames={`${classes.dialogSignature} neutralize-dialog-form`}
              title={breakpointType !== 'xs' && 'Create Signature'}
              handleActionButtonClick={(inputType) => {
                handleSignatureActionButtonClick(inputType, item.id, item.type)
              }}
              onBackdropClick={() => setSelectedDialog('')}
              areActionsAvailable={breakpointType !== 'xs' ? true : false}
            >
              <Stack className={classes.dialogSignatureContent} height='100%'>
                <Stack flex={1} justifyContent='center'>
                  <Stack className={classes.signatureCanvas}>
                    <SignatureCanvas
                      canvasProps={{
                        height: 200,
                        width: 350,
                      }}
                      ref={(ref) => {
                        setSignatureRef(ref)
                      }}
                    />
                  </Stack>
                </Stack>

                {breakpointType === 'xs' && (
                  <Stack direction='row' flexWrap='nowrap'>
                    {/* DELETE */}
                    <Button
                      className={classes.buttonDeleteSignature}
                      variant='contained'
                      onClick={() => handleDeleteSignature(item.id, item.type)}
                    >Delete</Button>

                    {/* SAVE */}
                    <Button
                      className={classes.buttonSaveSignature}
                      variant='contained'
                      onClick={() => handleSignatureActionButtonClick('save', item.id, item.type)}
                    >Save</Button>
                  </Stack>
                )}
              </Stack>
            </DialogForm>
          )}

          <FormControl
            className={classes.formControl}
            required={item.required}
            error={Boolean(formObjectError?.[item.id])}
          >
            {formObject[item.id]?.[getKeyValue(item.type)]?.file && (<Stack direction='row' justifyContent='flex-end'>
              <Box
                component='img'
                className={classes.signatureImage}
                src={formObject[item.id]?.[getKeyValue(item.type)]?.file && URL.createObjectURL(formObject[item.id]?.[getKeyValue(item.type)]?.file)}
              />

              <IconButton
                className='heightFitContent'
                onClick={() => {
                  setSelectedDialog(item.id)
                  setIsDialogFormOpen(true)
                }}
              >
                <IconCancel fontSize='small'/>
              </IconButton>
            </Stack>)}

            {!formObject[item.id]?.[getKeyValue(item.type)]?.file && (<Button
              size='small'
              className={`${classes.buttonRedPrimary} buttonAddSiganture heightFitContent`}
              startIcon={<IconCreate fontSize='small'/>}
              onClick={() => {
                setSelectedDialog(item.id)
                setIsDialogFormOpen(true)
              }}
            >
              Add Signature
            </Button>)}

            {formObjectError?.[item.id] && (
              <FormHelperText variant='error' className={classes.formHelperText}>
                {formObjectError?.[item.id]}
              </FormHelperText>
            )}
          </FormControl>
        </>
      )}

      <Divider className={classes.dividerFormControl}/>
    </Stack>
  )
}

export default InputForm