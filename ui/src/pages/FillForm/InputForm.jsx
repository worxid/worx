import { useContext, useState } from 'react'

// COMPONENTS
import DialogForm from 'components/DialogForm/DialogForm'

// CONTEXT
import { PrivateLayoutContext } from 'contexts/PrivateLayoutContext'

// CONSTANTS
import { checkboxErrorMessage, formatBytes, getKeyValue } from './fillFormConstants'

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

// STYLES
import useStyles from './fillFormUseStyles'

// UTILITIES
import { convertDate } from 'utilities/date'

/**
 * next to-do:
 * - handle error message input upload
 * - handle value input upload
 */
const InputForm = (props) => {
  const { item, handleInputChange, formObject, formObjectError } = props

  // CONTEXT
  const { setIsDialogFormOpen } = useContext(PrivateLayoutContext)

  // STATES
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)
  const [signatureRef, setSignatureRef] = useState()
  const [selectedSignature, setSelectedSignature] = useState('')

  // STYLES
  const classes = useStyles()

  // HANDLE SIGANTURE ACTION BUTTON CLICK
  const handleSignatureActionButtonClick = (inputType, fieldId, fieldType) => {
    if (inputType === 'save') {
      handleInputChange(fieldId, fieldType, getKeyValue(fieldType), signatureRef?.toDataURL())
    }

    setSelectedSignature('')
    setIsDialogFormOpen(false)
  }

  // HANDLE GALLERY CHANGE
  const handleGalleryChange = (event, fieldId, fieldType) => {
    let temp = formObject[fieldId]?.value || []
    temp.push(event.target.files[0])
    handleInputChange(fieldId, fieldType, getKeyValue(fieldType), temp)
  }

  // HANDLE FILE CHANGE
  const handleFileChange = (event, fieldId, fieldType) => {
    let temp = formObject[fieldId]?.value || []
    temp.push(event.target.files[0])
    handleInputChange(fieldId, fieldType, getKeyValue(fieldType), temp)
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
        <FormControl className={classes.formControl} required={item.required}>
          {formObject[item.id]?.value && <List className={`${classes.listFile} padding0`}>
            {formObject[item.id]?.value?.map((itemImg, index) => (
              <ListItem className={classes.listItem} key={index}>
                <ListItemAvatar className={classes.listFileAvatar}>
                  <Box
                    className={classes.listImage}
                    component='img'
                    src={URL.createObjectURL(itemImg)}
                  />
                </ListItemAvatar>

                <ListItemText
                  className={classes.listItemText}
                  primary={itemImg.name}
                  secondary={formatBytes(itemImg.size)}
                />

                <IconButton
                  className='heightFitContent'
                  onClick={() => handleRemoveFile(item.id, item.label, index)}
                >
                  <IconCancel fontSize='small'/>
                </IconButton>
              </ListItem>
            ))}
          </List>}

          <Stack direction='row'>
            <Button size='small' className={`${classes.buttonRedPrimary} buttonCamera heightFitContent`} startIcon={<IconCameraAlt fontSize='small'/>}>
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
                  accept='image/*'
                  type='file'
                  onChange={handleGalleryChange}
                />
              </Button>
            )}
          </Stack>
        </FormControl>
      )}

      {/* FILE */}
      {item.type === 'file' && (
        <FormControl className={classes.formControl} required={item.required}>
          {formObject[item.id]?.value && <List className={`${classes.listFile} padding0`}>
            {formObject[item.id]?.value.map((itemFile, index) => (
              <ListItem className={classes.listItem} key={index}>
                <ListItemAvatar className={classes.listFileAvatar}>
                  <IconInsertDriveFile className={classes.listFileIcon}/>
                </ListItemAvatar>
  
                <ListItemText
                  className={classes.listItemText}
                  primary={itemFile.name}
                  secondary={formatBytes(itemFile.size)}
                />

                <IconButton
                  className='heightFitContent'
                  onClick={() => handleRemoveFile(item.id, item.label, index)}
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
              onChange={handleFileChange}
            />
          </Button>
        </FormControl>
      )}

      {/* SIGNATURE */}
      {item.type === 'signature' && (
        <>
          {selectedSignature === item.id && (<DialogForm
            classNames={`${classes.dialogSignature} neutralize-dialog-form`}
            title='Create Signature'
            handleActionButtonClick={(inputType) => {
              handleSignatureActionButtonClick(inputType)
            }}
          >
            <Stack className={classes.dialogSignatureContent}>
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
          </DialogForm>)}

          <FormControl className={classes.formControl} required={item.required}>
            {formObject[item.id]?.value && (<Stack direction='row' justifyContent='flex-end'>
              <Box
                component='img'
                className={classes.signatureImage}
                src={formObject[item.id]?.value}
              />

              <IconButton
                className='heightFitContent'
                onClick={() => {
                  setSelectedSignature(item.id)
                  setIsDialogFormOpen(true)
                }}
              >
                <IconCancel fontSize='small'/>
              </IconButton>
            </Stack>)}

            {!formObject[item.id]?.value && (<Button
              size='small'
              className={`${classes.buttonRedPrimary} buttonAddSiganture heightFitContent`}
              startIcon={<IconCreate fontSize='small'/>}
              onClick={() => {
                setSelectedSignature(item.id)
                setIsDialogFormOpen(true)
              }}
            >
              Add Signature
            </Button>)}
          </FormControl>
        </>
      )}

      <Divider className={classes.dividerFormControl}/>
    </Stack>
  )
}

export default InputForm