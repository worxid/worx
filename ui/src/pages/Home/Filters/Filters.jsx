// CONSTANTS
import { dummyFormList } from './filtersConstants'

// MUIS
import Autocomplete from '@mui/material/Autocomplete'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import InputAdornment from '@mui/material/InputAdornment'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import OutlinedInput from '@mui/material/OutlinedInput'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

// MUI ICONS
import IconEvent from '@mui/icons-material/Event'

// STYLES
import useStyles from './filtersUseStyles'

const Filters = () => {
  const classes = useStyles()

  return (
    <Stack
      direction='row'
      alignItems='center'
      height='70px'
      spacing='16px'
    >
      {/* DATE RANGE FILTER */}
      <Stack
        direction='row'
        alignItems='center'
        spacing='8px'
      >
        {/* TEXT */}
        <Typography
          variant='body2'
          color='text.secondary'
        >
          Date Range:
        </Typography>

        {/* OUTLINED INPUT */}
        <FormControl>
          <OutlinedInput
            className={classes.formControlInput}
            startAdornment={
              <InputAdornment position='start'>
                <IconEvent/>
              </InputAdornment>
            }
          />
        </FormControl>
      </Stack>

      {/* FORM FILTER */}
      <Stack
        direction='row'
        alignItems='center'
        spacing='8px'
      >
        {/* TEXT */}
        <Typography
          variant='body2'
          color='text.secondary'
        >
          Filter by Form:
        </Typography>

        {/* AUTOCOMPLETE */}
        <Autocomplete
          multiple
          limitTags={1}
          size='small'
          options={dummyFormList}
          disableCloseOnSelect
          getOptionLabel={(option) => option.text}
          className={classes.formControlAutocomplete}
          renderOption={(props, option, { selected }) => (
            <ListItemButton 
              {...props}
              className={classes.formControlAutocompleteListItemButton}
            >
              {/* ICON */}
              <ListItemIcon>
                <Checkbox
                  size='small'
                  checked={selected}
                />
              </ListItemIcon>

              {/* TEXT */}
              <ListItemText primary={option.text}/>
            </ListItemButton>
          )}
          renderInput={(params) => (
            <TextField 
              {...params} 
              label='' 
              placeholder='' 
            />
          )}
        />
      </Stack>

      {/* DEVICE FILTER */}
      <Stack
        direction='row'
        alignItems='center'
        spacing='8px'
      >
        {/* TEXT */}
        <Typography
          variant='body2'
          color='text.secondary'
        >
          Filter by Device:
        </Typography>

        {/* AUTOCOMPLETE */}
        <Autocomplete
          multiple
          limitTags={1}
          size='small'
          options={dummyFormList}
          disableCloseOnSelect
          getOptionLabel={(option) => option.text}
          className={classes.formControlAutocomplete}
          renderOption={(props, option, { selected }) => (
            <ListItemButton 
              {...props}
              className={classes.formControlAutocompleteListItemButton}
            >
              {/* ICON */}
              <ListItemIcon>
                <Checkbox
                  size='small'
                  checked={selected}
                />
              </ListItemIcon>

              {/* TEXT */}
              <ListItemText primary={option.text}/>
            </ListItemButton>
          )}
          renderInput={(params) => (
            <TextField 
              {...params} 
              label='' 
              placeholder='' 
            />
          )}
        />
      </Stack>

      {/* RESET FILTER BUTTON */}
      <Button className={classes.buttonReset}>
        Reset Filter
      </Button>
    </Stack>
  )
}

export default Filters