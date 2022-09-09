import { useState } from 'react'
import PropTypes from 'prop-types'

// CONSTANTS
import { formatFiles, formatSizeImages } from '../formsCreateOrEditConstants'

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

/**
 * @props type = 'formHeader' | 'text' | 'checkboxGroup' | 'radioGroup' | 'dropdown' | 'date' | 'separator' | 'rating' | 'file' | 'image' | 'signature'
 */
const FieldProperties = (props) => {
  const {
    // REQUIRED
    type, label, description, required,
    // OTHERS
    optionList, checkboxMinChecked, checkboxMaxChecked,
    dateDisableFuture, dateDisablePast, ratingStarsCount,
    fileMaxNumber, fileFormat, fileMinSize, fileMaxSize,
    fileMinSizeType, fileMaxSizeType, imageMaxNumber,
    imageAllowGallery
  } = props

  // STYLES
  const classes = useStyles()

  // OPTIONS
  const [tempListOptions, setTempListOptions] = useState([
    {
      id: 1,
      label: 'Option #1'
    },
    {
      id: 2,
      label: 'Option #2'
    },
    {
      id: 3,
      label: 'Option #3'
    }
  ])
  // RATING
  const [starsCount, setStarsCount] = useState(5)
  // UPLOAD
  const [selectedFormat, setSelectedFormat] = useState(['any'])

  // GET VALUE STARS COUNT
  const getValueStarsCount = () => {
    if(starsCount <= 1) return 1
    else if(starsCount >= 10) return 10
    else  return Number(starsCount)
  }

  return (
    <>
      {/* FORM HEADER */}
      {type === 'formHeader' && (
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
              defaultValue='Valid Form'
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
              defaultValue='Ini adalah deskripsi'
            />
          </FormControl>
        </>
      )}

      {/* DEFAULT FIELD PROPERTIES */}
      {(type && type !== 'formHeader') && (
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
            />
          </FormControl>

          {/* DESCRIPTION */}
          <FormControl
            className={classes.formControl}
            variant='outlined' 
            fullWidth
            color='secondary'
          >
            <InputLabel>Description</InputLabel>
        
            <OutlinedInput
              type='text'
              label='Description'
              placeholder='Description'
            />
          </FormControl>
        </>
      )}

      {/* OPTION LIST */}
      {(type === 'checkboxGroup' || type === 'radioGroup' || type === 'dropdown') && (
        <FormGroup className={`${classes.formControl} formControlGrouped`}>
          {tempListOptions.map((item, index) => (
            <FormControl
              key={index}
              className={classes.formControl}
              variant='outlined' 
              fullWidth
              color='secondary'
            >
              <InputLabel> Option #{index+1} </InputLabel>
        
              <OutlinedInput
                type='text'
                label={`Option #${index+1}`}
                placeholder={`Option #${index+1}`}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      className='marginRight1'
                      onClick={() => tempListOptions.length > 1 && setTempListOptions(tempListOptions.filter(itemFilter => itemFilter.id !== item.id))}
                      edge='end'
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
            onClick={() => setTempListOptions([...tempListOptions, {
              id: tempListOptions.length + 1,
              label: `Option ${tempListOptions.length + 1}`
            }])}
          >
            Add Options
          </Button>
        </FormGroup>
      )}

      {/* TYPE CHECKBOXGROUP */}
      {type === 'checkboxGroup' && (
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
              defaultValue={1}
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
              defaultValue={3}
            />
          </FormControl>
        </>
      )}

      {/* TYPE DATE */}
      {type === 'date' && (
        <FormGroup className={`${classes.formControl} marginBottom0`}>
          <FormControlLabel control={<Checkbox />} label='Disable date selection in the future' />
          <FormControlLabel control={<Checkbox />} label='Disable date selection in the past' />
        </FormGroup>
      )}

      {/* TYPE RATING */}
      {type === 'rating' && (
        <>
          {/* STARS */}
          <FormControl className={classes.formControl}>
            <Rating name='text-feedback' value={getValueStarsCount()} max={getValueStarsCount()} size='large' readOnly/>
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
              onChange={(event) => setStarsCount(Number(event.target.value))}
              value={getValueStarsCount()}
              inputProps={{
                min: 1,
                max: 10,
              }}
            />
          </FormControl>
        </>
      )}

      {/* DEFAULT UPLOAD FIELD PROPERTIES */}
      {(type === 'image' || type === 'file') && (
        <>
          {/* MAX NUMBER OF FILE/IMAGE */}
          <FormControl
            className={classes.formControl}
            variant='outlined' 
            fullWidth
            color='secondary'
          >
            <InputLabel>Max. Number of {type === 'file' ? 'Files' : 'Images'}</InputLabel>
        
            <OutlinedInput
              type='number'
              label={`Max. Number of ${type === 'file' ? 'Files' : 'Images'}`}
              placeholder='6'
              defaultValue={6}
              inputProps={{
                min: 1,
                max: 6,
              }}
            />
          </FormControl>
        </>
      )}

      {/* TYPE FILE */}
      {type === 'file' && (
        <>
          <FormControl className={classes.formControl} color='secondary'>
            <InputLabel>Format File</InputLabel>

            <Select
              multiple
              value={selectedFormat}
              onChange={(event) => setSelectedFormat(typeof event.target.value === 'string'
                ? event.target.value.split(',')
                : event.target.value
              )}
              input={<OutlinedInput label='Format File' placeholder='Any'/>}
              renderValue={(selected) => (
                <Stack direction='row' flexWrap='wrap' className='gap8'>
                  {selected.map((value) => (
                    <Chip key={value} label={value} className='borderRadius0'/>
                  ))}
                </Stack>
              )}
            >
              {formatFiles.map((format) => (
                <MenuItem key={format} value={format}>
                  <Checkbox checked={selectedFormat.indexOf(format) > -1} />
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
                  defaultValue={128}
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
                  defaultValue={'BYTES'}
                >
                  {formatSizeImages.map((item, index) => (<MenuItem key={index} value={item.value}>{item.label}</MenuItem>))}
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
                  defaultValue={16}
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
                  defaultValue={'MB'}
                >
                  {formatSizeImages.map((item, index) => (<MenuItem key={index} value={item.value}>{item.label}</MenuItem>))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </>
      )}

      {/* TYPE IMAGE */}
      {type === 'image' && (
        <FormGroup className={`${classes.formControl} marginBottom0`}>
          <FormControlLabel control={<Checkbox />} label='Allow upload from gallery' />
        </FormGroup>
      )}

      {/* DEFAULT FIELD PROPERTIES */}
      {(type && type !== 'formHeader' && type !== 'separator') && (
        <FormGroup className={classes.formControl}>
          <FormControlLabel control={<Checkbox />} label='Required' />
        </FormGroup>
      )}
    </>
  )
}

FieldProperties.propTypes = {
  type: PropTypes.oneOf(['formHeader', 'text', 'checkboxGroup', 'radioGroup', 'dropdown', 'date', 'separator', 'rating', 'file', 'image', 'signature']),
  label: PropTypes.string,
  description: PropTypes.string,
  optionList: PropTypes.object,
  checkboxMinChecked: PropTypes.number,
  checkboxMaxChecked: PropTypes.number,
  dateDisableFuture: PropTypes.bool,
  dateDisablePast: PropTypes.bool,
  ratingStarsCount: PropTypes.number,
  fileMaxNumber: PropTypes.number,
  fileFormat: PropTypes.oneOf([PropTypes.object, PropTypes.string]),
  fileMinSize: PropTypes.number,
  fileMaxSize: PropTypes.number,
  fileMinSizeType: PropTypes.string,
  fileMaxSizeType: PropTypes.string,
  imageMaxNumber: PropTypes.number,
  imageAllowGallery: PropTypes.bool,
}

export default FieldProperties