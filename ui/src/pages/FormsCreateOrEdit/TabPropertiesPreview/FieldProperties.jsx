import { useContext } from 'react'

// CONSTANTS
import { formatFiles, formatSizeImages } from '../formsCreateOrEditConstants'

// CONTEXT
import { PageFormsCreateOrEditContext } from 'contexts/PageFormsCreateOrEditContext'

// MUIS
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import Chip from '@mui/material/Chip'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import InputLabel from '@mui/material/InputLabel'
import ListItemText from '@mui/material/ListItemText'
import MenuItem from '@mui/material/MenuItem'
import OutlinedInput from '@mui/material/OutlinedInput'
import Rating from '@mui/material/Rating'
import Select from '@mui/material/Select'
import Stack from '@mui/material/Stack'

// MUI ICONS
import IconAdd from '@mui/icons-material/Add'
import IconCancel from '@mui/icons-material/Cancel'

// STYLES
import useStyles from './tabPropertiesPreviewUseStyles'

const FieldProperties = () => {
  // STYLES
  const classes = useStyles()

  // CONTEXT
  const {
    formObject, setFormObject,
    listFields, setListFields,
    selectedFieldsType, selectedFieldsId,
  } = useContext(PageFormsCreateOrEditContext)

  // HANDLE UPDATE FIELD PROPERTIES BY FIELD ID
  const handleUpdateFieldPropertiesById = (fieldId, name, value) => {
    const indexOfId = listFields.findIndex(item => item.id === fieldId)
    let tempListFields = listFields

    // UPDATE
    tempListFields[indexOfId][name] = value
    setListFields([...tempListFields])
  }

  // GET FIELD PROPERTIES VALUE BY FIELD ID
  const getFieldPropertiesValueById = (fieldId, name) => {
    const indexOfId = listFields.findIndex(item => item.id === fieldId)
    return listFields[indexOfId][name]
  }

  // HANDLE UPDATE OPTIONLIST
  const handleUpdateOptionList = (fieldId, indexOption, value) => {
    const optionKey = selectedFieldsType === 'checkbox_group' ? 'group' : 'options'
    const indexOfId = listFields.findIndex(item => item.id === fieldId)
    let tempListFields = listFields

    // UPDATE
    tempListFields[indexOfId][optionKey][indexOption].label = value
    setListFields([...tempListFields])
  }

  // HANDLE ADD OPTION LIST CLICK
  const handleAddOptionListClick = (fieldId) => {
    const optionKey = selectedFieldsType === 'checkbox_group' ? 'group' : 'options'
    let tempOptionList = getFieldPropertiesValueById(fieldId, optionKey)
    tempOptionList.push({
      label: ''
    })
    handleUpdateFieldPropertiesById(fieldId, optionKey, tempOptionList)
  }

  // HANDLE DELETE OPTION LIST CLICK
  const handleDeleteOptionListClick = (fieldId, indexOption) => {
    const optionKey = selectedFieldsType === 'checkbox_group' ? 'group' : 'options'
    let tempOptionList = getFieldPropertiesValueById(fieldId, optionKey)
      .filter((item, index) => index !== indexOption)


    handleUpdateFieldPropertiesById(fieldId, optionKey, tempOptionList)
  }

  // GET VALUE STARS COUNT
  const getValueStarsCount = (fieldId) => {
    const maxStars = getFieldPropertiesValueById(fieldId, 'maxStars')
    if(maxStars <= 1) return 1
    else if(maxStars >= 10) return 10
    else return Number(maxStars)
  }

  // HANDLE OBJECT FORM
  const handleObjectForm = (name, value) => {
    setFormObject({
      ...formObject,
      [name]: value,
    })
  }

  return (
    <>
      {/* FORM HEADER */}
      {selectedFieldsType === 'formHeader' && (
        <>
          {/* FORM NAME */}
          <FormControl
            className={classes.formControl}
            variant='outlined' 
            fullWidth
            color='secondary'
            required
          >
            <InputLabel>Form Name</InputLabel>
        
            <OutlinedInput
              autoFocus
              type='text'
              label='Form Name'
              value={formObject?.label}
              onChange={(event) => handleObjectForm('label', event.target.value)}
            />
          </FormControl>

          {/* FORM DESCRIPTION */}
          <FormControl
            className={classes.formControl}
            variant='outlined' 
            fullWidth
            color='secondary'
            required
          >
            <InputLabel>Description</InputLabel>
        
            <OutlinedInput
              type='text'
              label='Description'
              value={formObject?.description}
              onChange={(event) => handleObjectForm('description', event.target.value)}
            />
          </FormControl>
        </>
      )}

      {/* DEFAULT FIELD PROPERTIES */}
      {(selectedFieldsType && selectedFieldsType !== 'formHeader') && (
        <>
          {/* LABEL */}
          <FormControl
            className={classes.formControl}
            variant='outlined' 
            fullWidth
            color='secondary'
          >
            <InputLabel>Label</InputLabel>
        
            <OutlinedInput
              autoFocus
              type='text'
              label='Label'
              placeholder='Label'
              onChange={(event) => handleUpdateFieldPropertiesById(
                selectedFieldsId, 'label', event.target.value
              )}
              value={getFieldPropertiesValueById(selectedFieldsId, 'label')}
            />
          </FormControl>

          {/* DESCRIPTION */}
          <FormControl
            className={classes.formControl}
            label='description'
            variant='outlined' 
            fullWidth
            color='secondary'
          >
            <InputLabel>Description</InputLabel>
        
            <OutlinedInput
              type='text'
              label='Description'
              placeholder='Description'
              onChange={(event) => handleUpdateFieldPropertiesById(
                selectedFieldsId, 'description', event.target.value
              )}
              value={getFieldPropertiesValueById(selectedFieldsId, 'description')}
            />
          </FormControl>
        </>
      )}

      {/* OPTION LIST */}
      {(selectedFieldsType === 'checkbox_group' || selectedFieldsType === 'radio_group' || selectedFieldsType === 'dropdown') && (
        <FormGroup className={`${classes.formControl} formControlGrouped`}>
          {getFieldPropertiesValueById(selectedFieldsId, selectedFieldsType === 'checkbox_group' ? 'group' : 'options').map((item, index) => (
            <FormControl
              key={`${selectedFieldsId}${index}`}
              className={classes.formControl}
              variant='outlined' 
              fullWidth
              color='secondary'
            >
              <InputLabel>Option #{index+1}</InputLabel>
        
              <OutlinedInput
                type='text'
                label={`Option #${index+1}`}
                value={item.label}
                onChange={(event) => handleUpdateOptionList(selectedFieldsId, index, event.target.value)}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      edge='end'
                      onClick={() => handleDeleteOptionListClick(selectedFieldsId, index)}
                    >
                      <IconCancel />
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          ))}
        
          {/* BUTTON ADD OPTIONS */}
          <Button
            className={classes.buttonOutlinedPrimary}
            variant='outlined'
            startIcon={<IconAdd />}
            onClick={() => handleAddOptionListClick(selectedFieldsId)}
          >
            Add Options
          </Button>
        </FormGroup>
      )}

      {/* TYPE CHECKBOXGROUP */}
      {selectedFieldsType === 'checkbox_group' && (
        <>
          {/* MIN CHECKED CHECKBOX */}
          <FormControl
            className={classes.formControl}
            variant='outlined' 
            fullWidth
            color='secondary'
          >
            <InputLabel>Min. Checked Positions</InputLabel>
        
            <OutlinedInput
              type='number'
              label='Min. Checked Positions'
              placeholder='1'
              value={getFieldPropertiesValueById(selectedFieldsId, 'minChecked')}
              onChange={(event) => handleUpdateFieldPropertiesById(
                selectedFieldsId, 'minChecked', Number(event.target.value)
              )}
            />
          </FormControl>

          {/* MAX CHECKED CHECKBOX */}
          <FormControl
            className={classes.formControl}
            variant='outlined' 
            fullWidth
            color='secondary'
          >
            <InputLabel>Max. Checked Positions</InputLabel>
        
            <OutlinedInput
              type='number'
              label='Max. Checked Positions'
              placeholder='3'
              value={getFieldPropertiesValueById(selectedFieldsId, 'maxChecked')}
              onChange={(event) => handleUpdateFieldPropertiesById(
                selectedFieldsId, 'maxChecked', Number(event.target.value)
              )}
            />
          </FormControl>
        </>
      )}

      {/* TYPE DATE */}
      {selectedFieldsType === 'date' && (
        <FormGroup className={`${classes.formControl} marginBottom0`}>
          {/* DISABLED FUTURE */}
          <FormControlLabel
            control={(<Checkbox
              onChange={(event) => handleUpdateFieldPropertiesById(
                selectedFieldsId, 'disableFuture', Boolean(event.target.checked)
              )}
              checked={getFieldPropertiesValueById(selectedFieldsId, 'disableFuture')}
            />)}
            label='Disable date selection in the future'
          />

          {/* DISABLED PAST */}
          <FormControlLabel
            control={(<Checkbox
              onChange={(event) => handleUpdateFieldPropertiesById(
                selectedFieldsId, 'disablePast', Boolean(event.target.checked)
              )}
              checked={getFieldPropertiesValueById(selectedFieldsId, 'disablePast')}
            />)}
            label='Disable date selection in the past'
          />
        </FormGroup>
      )}

      {/* TYPE RATING */}
      {selectedFieldsType === 'rating' && (
        <>
          {/* STARS */}
          <FormControl className={classes.formControl}>
            <Rating
              value={getValueStarsCount(selectedFieldsId)}
              max={getValueStarsCount(selectedFieldsId)}
              size='large'
              readOnly
            />
          </FormControl>

          {/* START COUNT */}
          <FormControl
            className={classes.formControl}
            variant='outlined' 
            fullWidth
            color='secondary'
          >
            <InputLabel>Stars Count</InputLabel>
        
            <OutlinedInput
              type='number'
              label='Stars Count'
              placeholder='5'
              onChange={(event) => handleUpdateFieldPropertiesById(
                selectedFieldsId,
                'maxStars',
                Number(event.target.value) >= 10 ? 10 : Number(event.target.value)
              )}
              value={getValueStarsCount(selectedFieldsId)}
              inputProps={{
                min: 1,
                max: 10,
              }}
            />
          </FormControl>
        </>
      )}

      {/* DEFAULT UPLOAD FIELD PROPERTIES */}
      {(selectedFieldsType === 'photo' || selectedFieldsType === 'file') && (
        <>
          {/* MAX NUMBER OF FILE/IMAGE */}
          <FormControl
            className={classes.formControl}
            variant='outlined' 
            fullWidth
            color='secondary'
          >
            <InputLabel>Max. Number of {selectedFieldsType === 'file' ? 'Files' : 'Images'}</InputLabel>
        
            <OutlinedInput
              type='number'
              label={`Max. Number of ${selectedFieldsType === 'file' ? 'Files' : 'Images'}`}
              placeholder='6'
              value={getFieldPropertiesValueById(selectedFieldsId, 'maxFiles')}
              onChange={(event) => handleUpdateFieldPropertiesById(
                selectedFieldsId,
                'maxFiles',
                Number(event.target.value)
              )}
              inputProps={{
                min: 1,
                max: 6,
              }}
            />
          </FormControl>
        </>
      )}

      {/* TYPE FILE */}
      {selectedFieldsType === 'file' && (
        <>
          {/* FORMAT FILE */}
          <FormControl className={classes.formControl} color='secondary'>
            <InputLabel>Format File</InputLabel>

            <Select
              multiple
              value={getFieldPropertiesValueById(selectedFieldsId, 'allowedExtensions')}
              onChange={(event) => handleUpdateFieldPropertiesById(
                selectedFieldsId,
                'allowedExtensions',
                typeof event.target.value === 'string'
                  ? event.target.value.split(',')
                  : event.target.value
              )}
              input={<OutlinedInput label='Format File' placeholder='Any'/>}
              renderValue={(selected) => (
                <Stack direction='row' flexWrap='wrap' columnGap={'8px'}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} className='borderRadius0'/>
                  ))}
                </Stack>
              )}
              className='neutralize-zoom-select'
              MenuProps={{ className: 'neutralize-zoom-select-menu' }}
            >
              {formatFiles.map((format) => (
                <MenuItem key={format} value={format}>
                  <Checkbox checked={getFieldPropertiesValueById(selectedFieldsId, 'allowedExtensions').indexOf(format) > -1} />
                  <ListItemText primary={format}/>
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Grid container spacing={2} className={`${classes.formControl} formControlGrouped`}>
            {/* MIN FILE SIZE */}
            <Grid item xs={6}>
              <FormControl
                className={`${classes.formControl} marginBottom0`}
                variant='outlined' 
                fullWidth
                color='secondary'
              >
                <InputLabel>Min. File Size</InputLabel>
            
                <OutlinedInput
                  type='number'
                  label='Min. File Size'
                  placeholder='128'
                  value={getFieldPropertiesValueById(selectedFieldsId, 'minFileSize')}
                  onChange={(event) => handleUpdateFieldPropertiesById(
                    selectedFieldsId, 'minFileSize', Number(event.target.value)
                  )}
                />
              </FormControl>
            </Grid>

            {/* MIN FILE SIZE FORMAT */}
            <Grid item xs={6}>
              <FormControl
                className={`${classes.formControl} marginBottom0`}
                variant='outlined' 
                fullWidth
                color='secondary'
              >
                <InputLabel>Min. File Size</InputLabel>
            
                <Select
                  label='Min. File Size'
                  value={getFieldPropertiesValueById(selectedFieldsId, 'fileMinSizeType')}
                  onChange={(event) => handleUpdateFieldPropertiesById(
                    selectedFieldsId, 'fileMinSizeType', event.target.value
                  )}
                  className='neutralize-zoom-select'
                  MenuProps={{
                    className: 'neutralize-zoom-select-menu'
                  }}
                >
                  {formatSizeImages.map((item, index) => (
                    <MenuItem key={index} value={item.value}>{item.label}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* MAX FILE SIZE */}
            <Grid item xs={6}>
              <FormControl
                className={`${classes.formControl} marginBottom0`}
                variant='outlined' 
                fullWidth
                color='secondary'
              >
                <InputLabel>Max. File Size</InputLabel>
            
                <OutlinedInput
                  type='number'
                  label='Max. File Size'
                  placeholder='16'
                  value={getFieldPropertiesValueById(selectedFieldsId, 'maxFileSize')}
                  onChange={(event) => handleUpdateFieldPropertiesById(
                    selectedFieldsId, 'maxFileSize', Number(event.target.value)
                  )}
                />
              </FormControl>
            </Grid>

            {/* MAX FILE SIZE FORMAT */}
            <Grid item xs={6}>
              <FormControl
                className={`${classes.formControl} marginBottom0`}
                variant='outlined' 
                fullWidth
                color='secondary'
              >
                <InputLabel>Max. File Size</InputLabel>
            
                <Select
                  label='Max. File Size'
                  value={getFieldPropertiesValueById(selectedFieldsId, 'fileMaxSizeType')}
                  onChange={(event) => handleUpdateFieldPropertiesById(
                    selectedFieldsId, 'fileMaxSizeType', event.target.value
                  )}
                  className='neutralize-zoom-select'
                  MenuProps={{
                    className: 'neutralize-zoom-select-menu'
                  }}
                >
                  {formatSizeImages.map((item, index) => (
                    <MenuItem key={index} value={item.value}>{item.label}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </>
      )}

      {/* TYPE IMAGE */}
      {selectedFieldsType === 'photo' && (
        <FormGroup className={`${classes.formControl} marginBottom0`}>
          <FormControlLabel
            control={(<Checkbox
              onChange={(event) => handleUpdateFieldPropertiesById(
                selectedFieldsId, 'allowGalleryUpload', Boolean(event.target.checked)
              )}
              checked={getFieldPropertiesValueById(selectedFieldsId, 'allowGalleryUpload')}
            />)}
            label='Allow upload from gallery'
          />
        </FormGroup>
      )}

      {/* DEFAULT FIELD PROPERTIES */}
      {(selectedFieldsType && selectedFieldsType !== 'formHeader' && selectedFieldsType !== 'separator') && (
        <FormGroup className={classes.formControl}>
          <FormControlLabel
            control={(<Checkbox
              onChange={(event) => handleUpdateFieldPropertiesById(
                selectedFieldsId, 'required', Boolean(event.target.checked)
              )}
              checked={getFieldPropertiesValueById(selectedFieldsId, 'required')}
            />)}
            label='Required'
          />
        </FormGroup>
      )}
    </>
  )
}

export default FieldProperties