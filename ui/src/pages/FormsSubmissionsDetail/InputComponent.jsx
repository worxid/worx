// ASSETS
import imgScreenshot from 'assets/images/pictures/Screenshot_20220809-172011_Permission.png'
import imgSignature from 'assets/images/pictures/signature.png'

// MUIS
import Box from '@mui/material/Box'
import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import InputAdornment from '@mui/material/InputAdornment'
import InputLabel from '@mui/material/InputLabel'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import MenuItem from '@mui/material/MenuItem'
import OutlinedInput from '@mui/material/OutlinedInput'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import Rating from '@mui/material/Rating'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'

// MUI ICONS
import IconCalendarMonth from '@mui/icons-material/CalendarMonth'
import IconInsertDriveFile from '@mui/icons-material/InsertDriveFile'

// STYLES
import useStyles from './formsSubmissionsDetailUseStyles'
import { convertDate } from 'utilities/date'

const InputComponent = (props) => {
  const { item, type, defaultValue } = props
  // STYLES
  const classes = useStyles()

  const findValuesKey = (type) => {
    if(type === 'text' || type === 'rating' || type === 'date') return 'value' // string
    else if (type === 'checkbox_group') return 'values' // array<boolean>
    else if (type === 'radio_group' || type === 'dropdown') return 'value_index' // number
    else if (type === 'file' || type === 'photo') return 'file_ids' // array<number>
    else if (type === 'signature') return 'file_id' // number
  }

  return (
    <>
      {/* TEXTFIELD */}
      {type === 'text' && (
        <FormControl
          variant='outlined' 
          fullWidth
          disabled
          color='secondary'
        >
          <InputLabel shrink={true}>
            {item?.label}
          </InputLabel>
        
          <OutlinedInput
            autoFocus
            type='text'
            label={item?.label}
            defaultValue={defaultValue?.[findValuesKey(type)] || '-'}
          />
        </FormControl>
      )}

      {/* CHECKBOX GROUP */}
      {type === 'checkbox_group' && (
        <FormGroup className={classes.checkboxGroup} disabled>
          {item?.group?.map((itemCheckbox, index) => (
            <FormControlLabel
              key={index}
              disabled
              control={<Checkbox
                defaultChecked={defaultValue?.[findValuesKey(type)][index] || false}
              />}
              label={itemCheckbox.label}
            />
          ))}
        </FormGroup>
      )}

      {/* RADIO GROUP */}
      {type === 'radio_group' && (
        <RadioGroup className={classes.radioGroup} disabled>
          {item?.options?.map((itemRadio, index) => (
            <FormControlLabel
              control={<Radio checked={Number(defaultValue?.[findValuesKey(type)]) === index}/>}
              key={index}
              disabled
              value={index}
              label={itemRadio.label}
            />
          ))}
        </RadioGroup>
      )}

      {/* DROPDOWN */}
      {type === 'dropdown' && (
        <FormControl fullWidth disabled>
          <Select defaultValue={Number(defaultValue?.[findValuesKey(type)])} disabled>
            {item?.options?.map((itemDropdown, index) => (
              <MenuItem key={index} value={index}>
                {itemDropdown.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}

      {/* DATE */}
      {type === 'date' && (
        <TextField
          fullWidth
          disabled
          value={convertDate(defaultValue?.[findValuesKey(type)], 'dd-MM-yyyy')}
          InputProps={{
            startAdornment: (<InputAdornment position='start'>
              <Box className={classes.textfieldDateAdornment}><IconCalendarMonth /></Box>
            </InputAdornment>),
          }}
        />
      )}

      {/* RATING */}
      {type === 'rating' && (
        <Rating
          value={Number(defaultValue?.[findValuesKey(type)])}
          readOnly
          max={item?.max_stars}
        />
      )}

      {/* LIST FILE */}
      {type === 'file' && (
        <List className='padding0'>
          <ListItem className={classes.listItem}>
            <ListItemAvatar className={classes.listFileAvatar}>
              <IconInsertDriveFile className={classes.listFileIcon}/>
            </ListItemAvatar>

            <ListItemText
              className={classes.listItemText}
              primary='Screenshot_20220809-172011_Permission'
              secondary='107,8 KB'
            />
          </ListItem>

          <ListItem className={classes.listItem}>
            <ListItemAvatar className={classes.listFileAvatar}>
              <IconInsertDriveFile className={classes.listFileIcon}/>
            </ListItemAvatar>

            <ListItemText
              className={classes.listItemText}
              primary='Screenshot_20220809-172011_Permission'
              secondary='107,8 KB'
            />
          </ListItem>
        </List>
      )}

      {/* LIST IMAGE */}
      {type === 'photo' && (
        <List className='padding0'>
          <ListItem className={classes.listItem}>
            <ListItemAvatar className={classes.listFileAvatar}>
              <Box
                className={classes.listImage}
                component='img'
                src={imgScreenshot}
              />
            </ListItemAvatar>

            <ListItemText
              className={classes.listItemText}
              primary='Screenshot_20220809-172011_Permission'
              secondary='107,8 KB'
            />
          </ListItem>
        </List>
      )}

      {/* SIGNATURE */}
      {type === 'signature' && (
        <Box
          component='img'
          src={imgSignature}
        />
      )}
    </>
  )
}

export default InputComponent