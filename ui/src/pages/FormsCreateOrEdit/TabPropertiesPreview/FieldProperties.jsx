import { useState } from 'react'

// MUIS
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import InputLabel from '@mui/material/InputLabel'
import OutlinedInput from '@mui/material/OutlinedInput'

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
    type,
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
            <InputLabel>
              Form Name
            </InputLabel>
        
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
            <InputLabel>
              Description
            </InputLabel>
        
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
            <InputLabel>
              Label
            </InputLabel>
        
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
            <InputLabel>
              Description
            </InputLabel>
        
            <OutlinedInput
              autoFocus
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
              className={classes.formControl}
              variant='outlined' 
              fullWidth
              color='secondary'
            >
              <InputLabel>
                Option #{index+1}
              </InputLabel>
        
              <OutlinedInput
                autoFocus
                type='text'
                label={`Option #${index+1}`}
                placeholder={`Option #${index+1}`}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      className={classes.buttonRemoveOption}
                      aria-label='remove'
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
            <InputLabel>
              Min. Checked Positions
            </InputLabel>
        
            <OutlinedInput
              type='number'
              label='Min. Checked Positions'
              placeholder='1'
            />
          </FormControl>

          {/* MAX CHECKED CHECKBOX */}
          <FormControl
            className={classes.formControl}
            variant='outlined' 
            fullWidth
            color='secondary'
          >
            <InputLabel>
              Max. Checked Positions
            </InputLabel>
        
            <OutlinedInput
              type='number'
              label='Max. Checked Positions'
              placeholder='3'
            />
          </FormControl>
        </>
      )}

      {/* DEFAULT FIELD PROPERTIES */}
      {(type && type !== 'formHeader') && (
        <FormGroup className={classes.formControl}>
          <FormControlLabel control={<Checkbox />} label='Required' />
        </FormGroup>
      )}
    </>
  )
}

export default FieldProperties