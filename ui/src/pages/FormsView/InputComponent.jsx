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
import useStyles from './formsViewUseStyles'

const InputComponent = (props) => {
  const { type, defaultValue } = props
  // STYLES
  const classes = useStyles()

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
            Textfield
          </InputLabel>
        
          <OutlinedInput
            autoFocus
            type='text'
            label='Textfield'
            defaultValue='textfield'
          />
        </FormControl>
      )}

      {/* CHECKBOX GROUP */}
      {type === 'checkbox_group' && (
        <FormGroup className={classes.checkboxGroup} disabled>
          <FormControlLabel disabled control={<Checkbox defaultChecked />} label='Label' />
          <FormControlLabel disabled control={<Checkbox />} label='Disabled' />
        </FormGroup>
      )}

      {/* RADIO GROUP */}
      {type === 'radio_group' && (
        <RadioGroup
          className={classes.radioGroup}
          defaultValue='female'
          name='radio-buttons-group'
          disabled
        >
          <FormControlLabel disabled value='female' control={<Radio />} label='Female' />
          <FormControlLabel disabled value='male' control={<Radio />} label='Male' />
        </RadioGroup>
      )}

      {/* DROPDOWN */}
      {type === 'dropdown' && (
        <FormControl fullWidth disabled>
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            value={10}
            disabled
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
      )}

      {/* DATE */}
      {type === 'date' && (
        <TextField
          fullWidth
          disabled
          value='25-09-2022'
          InputProps={{
            startAdornment: (<InputAdornment position='start'>
              <Box className={classes.textfieldDateAdornment}><IconCalendarMonth /></Box>
            </InputAdornment>),
          }}
        />
      )}

      {/* RATING */}
      {type === 'rating' && (<Rating name='read-only' value={4} readOnly />)}

      {/* LIST FILE */}
      {type === 'file' && (
        <List className={classes.list}>
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
        <List className={classes.list}>
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