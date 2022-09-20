import { useContext, useState } from 'react'

// COMPONENTS
import DialogForm from 'components/DialogForm/DialogForm'

// CONTEXT
import { PrivateLayoutContext } from 'contexts/PrivateLayoutContext'

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

const InputForm = (props) => {
  const { item, handleInputChange, formObject } = props

  // CONTEXT
  const { setIsDialogFormOpen } = useContext(PrivateLayoutContext)

  // DATE
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)
  // SIGNATURE
  const [signatureRef, setSignatureRef] = useState()

  // STYLES
  const classes = useStyles()

  // HANDLE SIGANTURE ACTION BUTTON CLICK
  const handleSignatureActionButtonClick = async (inputType) => {
    if (inputType === 'save') {
      handleInputChange(item.id, item.label, signatureRef?.toDataURL())
    } else {

    }

    setIsDialogFormOpen(false)
  }

  // HANDLE GALLERY CHANGE
  const handleGalleryChange = (event) => {
    let temp = formObject[item.id]?.value || []
    temp.push(event.target.files[0])
    handleInputChange(item.id, item.label, temp)
  }

  // HANDLE FILE CHANGE
  const handleFileChange = (event) => {
    let temp = formObject[item.id]?.value || []
    temp.push(event.target.files[0])
    handleInputChange(item.id, item.label, temp)
  }

  // HANDLE CHECKBOX CHANGE
  const handleCheckboxChange = (fieldId, fieldLabel, event) => {
    let temp = formObject[item.id]?.value || []
    
    // FIND
    const find = temp.find(item => item === event.target.value)

    if(!event.target.checked) {
      handleInputChange(fieldId, fieldLabel, [...temp.filter(item => item !== event.target.value)])
    } else {
      handleInputChange(fieldId, fieldLabel, [...temp, event.target.value])
    }
  }

  // HANDLE REMOVE FILE
  const handleRemoveFile = (fieldId, fieldLabel, indexId) => {
    const remove = formObject[fieldId]?.value.filter((item, index) => index !== indexId)
    handleInputChange(fieldId, fieldLabel, remove.length > 0 ? remove : null)
  }

  // FORMAT SIZE
  const formatBytes = (bytes, decimals = 2) => {
    if (!+bytes) return '0 Bytes'

    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
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
        <Typography variant='subtitle2' className='displayBlock fontWeight400' noWrap>{item.label}</Typography>
        <Typography variant='caption' color='text.secondary' className='displayBlock' noWrap>{item.description}</Typography>
      </Box>

      {/* TEXTFIELD */}
      {item.type === 'text' && (
        <FormControl fullWidth className={classes.formControl} required={item.required}>
          <TextField
            label='Answer'
            variant='filled'
            size='small'
            className='heightFitContent'
            onChange={(event) => handleInputChange(item.id, item.label, event.target.value)}
          />
        </FormControl>
      )}

      {/* CHECKBOX */}
      {item.type === 'checkboxGroup' && (
        <FormControl className={classes.formControl} required={item.required}>
          <FormGroup>
            {item.optionList.map((itemOption, index) => (
              <FormControlLabel
                key={index}
                control={<Checkbox
                  size='small'
                  required={item.required}
                  value={itemOption.label}
                  onChange={(event) => handleCheckboxChange(item.id, item.label, event)}
                />}
                label={(
                  <Typography variant='caption' className='displayBlock'>{itemOption.label}</Typography>
                )}
              />
            ))}
          </FormGroup>
        </FormControl>
      )}

      {/* RADIO */}
      {item.type === 'radioGroup' && (
        <FormControl
          className={classes.formControl}
          onChange={(event) => handleInputChange(item.id, item.label, event.target.value)}
          required={item.required}
        >
          <RadioGroup>
            {item.optionList.map((itemOption, index) => (
              <FormControlLabel
                key={index}
                value={itemOption.label}
                control={<Radio size='small'/>}
                label={(
                  <Typography variant='caption' className='displayBlock'>{itemOption.label}</Typography>
                )}
              />
            ))}
          </RadioGroup>
        </FormControl>
      )}

      {/* DROPDOWN */}
      {item.type === 'dropdown' && (
        <FormControl
          variant='filled'
          fullWidth
          className={classes.formControl}
          required={item.required}
        >
          <InputLabel>Answer</InputLabel>
          <Select
            label={item.label}
            size='small'
            className='heightFitContent'
            onChange={(event) => handleInputChange(item.id, item.label, event.target.value)}
            value={formObject[item.id]?.value || item?.optionList[0]?.label}
          >
            {item.optionList.map((item, index) => (
              <MenuItem key={index} value={item.label}>
                <Typography variant='caption' className='displayBlock' noWrap>{item.label}</Typography>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}

      {/* RATING */}
      {item.type === 'rating' && (
        <FormControl
          required={item.required}
          className={classes.formControl}
          onChange={(event) => handleInputChange(item.id, item.label, Number(event.target.value))}
        >
          <Rating
            value={formObject[item.id]?.value || 0}
            max={item.ratingStarsCount}
            size='medium'
            emptyIcon={<IconStar className={classes.opacityHalf}/>}
          />
        </FormControl>
      )}

      {/* DATE */}
      {item.type === 'date' && (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <FormControl fullWidth className={classes.formControl} required={item.required}>
            <Stack direction='row' alignItems='center'>
              <TextField
                value={formObject[item.id]?.value ? new Date(formObject[item.id]?.value || Date.now()).toLocaleDateString('ID') : ''}
                label='Answer'
                variant='filled'
                size='small'
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton size='small' onClick={() => handleInputChange(item.id, item.label, null)}>
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
          </FormControl>

          <FormControl>
            <MobileDatePicker
              label='For mobile'
              renderInput={(params) => <></>}
              onChange={(newValue) => handleInputChange(item.id, item.label, newValue)}
              onClose={() => setIsDatePickerOpen(false)}
              open={isDatePickerOpen}
              value={formObject[item.id]?.value}
              componentsProps={{
                actionBar: { className: classes.actionCalendar },
              }}
            />
          </FormControl>
        </LocalizationProvider>
      )}

      {/* IMAGE */}
      {item.type === 'image' && (
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

            {item.imageAllowGallery && (
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
        <FormControl className={classes.formControl} required={item.required}>
          {formObject[item.id]?.value && (<Stack direction='row' justifyContent='flex-end'>
            <Box
              component='img'
              className={classes.signatureImage}
              src={formObject[item.id]?.value}
            />

            <IconButton
              className='heightFitContent'
              onClick={() => setIsDialogFormOpen(true)}
            >
              <IconCancel fontSize='small'/>
            </IconButton>
          </Stack>)}

          {!formObject[item.id]?.value && (<Button
            size='small'
            className={`${classes.buttonRedPrimary} buttonAddSiganture heightFitContent`}
            startIcon={<IconCreate fontSize='small'/>}
            onClick={() => setIsDialogFormOpen(true)}
          >
            Add Signature
          </Button>)}

          <DialogForm
            classNames={classes.dialogSignature}
            title='Create Signature'
            handleActionButtonClick={handleSignatureActionButtonClick}
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
          </DialogForm>
        </FormControl>
      )}

      <Divider className={classes.dividerFormControl}/>
    </Stack>
  )
}

export default InputForm