import { useState } from 'react'

// MUIS
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import InputLabel from '@mui/material/InputLabel'
import OutlinedInput from '@mui/material/OutlinedInput'

// MUI ICONS
import IconAdd from '@mui/icons-material/Add'

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
      label: 'Option #1'
    },
    {
      label: 'Option #2'
    },
    {
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
        <FormGroup className={classes.formControl}>
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
              />
            </FormControl>
          ))}
        
          {/* BUTTON ADD OPTIONS */}
          <Button
            className={classes.buttonOutlinedPrimary}
            variant='outlined'
            startIcon={<IconAdd />}
            onClick={() => setTempListOptions([...tempListOptions, {
                
            }])}
          >Add Options</Button>
        </FormGroup>
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