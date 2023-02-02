import { useContext } from 'react'

// CONSTANTS
import { formatFiles, formatSizeImages, isNoDescriptionProperties, isNoRequiredProperties } from '../formsCreateOrEditConstants'

// CONTEXT
import { AllPagesContext } from 'contexts/AllPagesContext'
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
  const { setSnackbarObject } = useContext(AllPagesContext)
  const {
    formObject, setFormObject, listFields, setListFields,
    selectedFieldsType, selectedFieldsId, setHasFormChanged,
  } = useContext(PageFormsCreateOrEditContext)

  // HANDLE UPDATE FIELD PROPERTIES BY FIELD ID
  const handleUpdateFieldPropertiesById = (fieldId, name, value) => {
    const indexOfId = listFields.findIndex(item => item.id === fieldId)
    let tempListFields = listFields

    // VALIDATION CHECKBOX MAX CHECKED
    if (
      selectedFieldsType === 'checkbox_group'
      && value > getFieldPropertiesValueById(fieldId, 'group').length
    ) {
      setSnackbarObject({
        open: true,
        severity:'error',
        title:'',
        message:`Maximum value checked is ${getFieldPropertiesValueById(fieldId, 'group').length}`
      })

      return
    }

    // UPDATE
    tempListFields[indexOfId][name] = value
    setHasFormChanged(true)
    setListFields([...tempListFields])
  }

  // GET FIELD PROPERTIES VALUE BY FIELD ID
  const getFieldPropertiesValueById = (fieldId, name) => {
    const indexOfId = listFields.findIndex(item => item.id === fieldId)
    return listFields[indexOfId][name] ? listFields[indexOfId][name] : ''
  }

  // IS FIELD OWN A PROPERTY
  const isFieldOwnProperty = (fieldId, key) => {
    const indexOfId = listFields.findIndex(item => item.id === fieldId)
    return listFields[indexOfId].hasOwnProperty(key)
  }

  // HANDLE UPDATE OPTIONLIST
  const handleUpdateOptionList = (fieldId, indexOption, value) => {
    const optionKey = selectedFieldsType === 'checkbox_group' ? 'group' : 'options'
    const indexOfId = listFields.findIndex(item => item.id === fieldId)
    let tempListFields = listFields

    // UPDATE
    tempListFields[indexOfId][optionKey][indexOption].label = value
    setHasFormChanged(true)
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

    // update max check when its value more than list options
    if (
      selectedFieldsType === 'checkbox_group'
      && getFieldPropertiesValueById(selectedFieldsId, 'max_checked') > tempOptionList.length
    ) handleUpdateFieldPropertiesById(
      selectedFieldsId, 'max_checked', tempOptionList.length
    )

    handleUpdateFieldPropertiesById(fieldId, optionKey, tempOptionList)
  }

  // GET VALUE STARS COUNT
  const getValueStarsCount = (fieldId) => {
    const maxStars = getFieldPropertiesValueById(fieldId, 'max_stars')
    if(maxStars <= 1) return 1
    else if(maxStars >= 10) return 10
    else return Number(maxStars)
  }

  // HANDLE OBJECT FORM
  const handleObjectForm = (name, value) => {
    setHasFormChanged(true)
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
              value={getFieldPropertiesValueById(selectedFieldsId, 'label') || ''}
            />
          </FormControl>

          {/* DESCRIPTION */}
          {(isFieldOwnProperty(selectedFieldsId, 'description')
          && !isNoDescriptionProperties(selectedFieldsType)) && (
            <FormControl
              className={classes.formControl}
              label='description'
              variant='outlined' 
              fullWidth
            >
              <InputLabel>Description</InputLabel>
          
              <OutlinedInput
                type='text'
                label='Description'
                placeholder='Description'
                onChange={(event) => handleUpdateFieldPropertiesById(
                  selectedFieldsId, 'description', event.target.value
                ) }
                value={getFieldPropertiesValueById(selectedFieldsId, 'description')}
              />
            </FormControl>
          )}
        </>
      )}

      {/* TEXT */}
      {selectedFieldsType === 'text' && (
        <FormGroup className={`${classes.formControl} marginBottom0`}>
          <FormControlLabel
            control={(<Checkbox />)}
            label='Allow multiple lines'
          />
        </FormGroup>
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
          >
            <InputLabel>Min. Checked Positions</InputLabel>
        
            <OutlinedInput
              type='number'
              label='Min. Checked Positions'
              placeholder='1'
              value={getFieldPropertiesValueById(selectedFieldsId, 'min_checked')}
              onChange={(event) => handleUpdateFieldPropertiesById(
                selectedFieldsId, 'min_checked', Number(event.target.value)
              )}
            />
          </FormControl>

          {/* MAX CHECKED CHECKBOX */}
          <FormControl
            className={classes.formControl}
            variant='outlined' 
            fullWidth
          >
            <InputLabel>Max. Checked Positions</InputLabel>
        
            <OutlinedInput
              type='number'
              label='Max. Checked Positions'
              placeholder='3'
              value={getFieldPropertiesValueById(selectedFieldsId, 'max_checked')}
              onChange={(event) => handleUpdateFieldPropertiesById(
                selectedFieldsId, 'max_checked', Number(event.target.value)
              )}
              inputProps={{
                max: getFieldPropertiesValueById(selectedFieldsId, 'group').length
              }}
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
                selectedFieldsId, 'disable_future', Boolean(event.target.checked)
              )}
              checked={Boolean(getFieldPropertiesValueById(selectedFieldsId, 'disable_future'))}
            />)}
            label='Disable date selection in the future'
          />

          {/* DISABLED PAST */}
          <FormControlLabel
            control={(<Checkbox
              onChange={(event) => handleUpdateFieldPropertiesById(
                selectedFieldsId, 'disable_past', Boolean(event.target.checked)
              )}
              checked={Boolean(getFieldPropertiesValueById(selectedFieldsId, 'disable_past'))}
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
          >
            <InputLabel>Stars Count</InputLabel>
        
            <OutlinedInput
              type='number'
              label='Stars Count'
              placeholder='5'
              onChange={(event) => handleUpdateFieldPropertiesById(
                selectedFieldsId,
                'max_stars',
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
          >
            <InputLabel>Max. Number of {selectedFieldsType === 'file' ? 'Files' : 'Images'}</InputLabel>
        
            <OutlinedInput
              type='number'
              label={`Max. Number of ${selectedFieldsType === 'file' ? 'Files' : 'Images'}`}
              placeholder='6'
              value={getFieldPropertiesValueById(selectedFieldsId, 'max_files')}
              onChange={(event) => handleUpdateFieldPropertiesById(
                selectedFieldsId,
                'max_files',
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
          <FormControl className={classes.formControl}>
            <InputLabel>Format File</InputLabel>

            <Select
              multiple
              value={getFieldPropertiesValueById(selectedFieldsId, 'allowed_extensions')}
              onChange={(event) => handleUpdateFieldPropertiesById(
                selectedFieldsId,
                'allowed_extensions',
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
                  <Checkbox checked={getFieldPropertiesValueById(selectedFieldsId, 'allowed_extensions').indexOf(format) > -1} />
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
              >
                <InputLabel>Min. File Size</InputLabel>
            
                <OutlinedInput
                  type='number'
                  label='Min. File Size'
                  placeholder='128'
                  value={getFieldPropertiesValueById(selectedFieldsId, 'min_file_size')}
                  onChange={(event) => handleUpdateFieldPropertiesById(
                    selectedFieldsId, 'min_file_size', Number(event.target.value)
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
              >
                <InputLabel>Min. File Size</InputLabel>
            
                <Select
                  label='Min. File Size'
                  value={getFieldPropertiesValueById(selectedFieldsId, 'file_min_size_type')}
                  onChange={(event) => handleUpdateFieldPropertiesById(
                    selectedFieldsId, 'file_min_size_type', event.target.value
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
              >
                <InputLabel>Max. File Size</InputLabel>
            
                <OutlinedInput
                  type='number'
                  label='Max. File Size'
                  placeholder='16'
                  value={getFieldPropertiesValueById(selectedFieldsId, 'max_file_size')}
                  onChange={(event) => handleUpdateFieldPropertiesById(
                    selectedFieldsId, 'max_file_size', Number(event.target.value)
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
              >
                <InputLabel>Max. File Size</InputLabel>
            
                <Select
                  label='Max. File Size'
                  value={getFieldPropertiesValueById(selectedFieldsId, 'file_max_size_type')}
                  onChange={(event) => handleUpdateFieldPropertiesById(
                    selectedFieldsId, 'file_max_size_type', event.target.value
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
                selectedFieldsId, 'allow_gallery_upload', Boolean(event.target.checked)
              )}
              checked={getFieldPropertiesValueById(selectedFieldsId, 'allow_gallery_upload')}
            />)}
            label='Allow upload from gallery'
          />
        </FormGroup>
      )}

      {/* TYPE BARCODE */}
      {selectedFieldsType === 'barcode' && (
        <FormGroup className={`${classes.formControl} marginBottom0`}>
          {/* RESTRICT TO 1D BARCODES ONLY */}
          <FormControlLabel
            control={(<Checkbox
              onChange={(event) => handleUpdateFieldPropertiesById(
                selectedFieldsId, 'barcode_type', Boolean(event.target.checked) ? '1d' : null
              )}
              checked={getFieldPropertiesValueById(selectedFieldsId, 'barcode_type') === '1d'}
            />)}
            label='Restrict to 1D barcodes only'
          />

          {/* USER CAN MANUALLY OVERRIDE */}
          <FormControlLabel
            control={(<Checkbox
              onChange={(event) => handleUpdateFieldPropertiesById(
                selectedFieldsId, 'allow_manual_override', Boolean(event.target.checked)
              )}
              checked={Boolean(getFieldPropertiesValueById(selectedFieldsId, 'allow_manual_override'))}
            />)}
            label='User can manually override'
          />
        </FormGroup>
      )}

      {/* DEFAULT FIELD PROPERTIES */}
      {(selectedFieldsType && selectedFieldsType !== 'formHeader'
        && selectedFieldsType !== 'separator' && isFieldOwnProperty(selectedFieldsId, 'required')
        && !isNoRequiredProperties(selectedFieldsType)) && (
        <FormGroup className={classes.formControl}>
          <FormControlLabel
            control={(<Checkbox
              onChange={(event) => handleUpdateFieldPropertiesById(
                selectedFieldsId, 'required', Boolean(event.target.checked)
              )}
              checked={Boolean(getFieldPropertiesValueById(selectedFieldsId, 'required'))}
            />)}
            label='Required'
          />
        </FormGroup>
      )}
    </>
  )
}

export default FieldProperties