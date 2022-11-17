// CONSTANTS
import { dummyFormList } from './filtersConstants'

// MUIS
import Autocomplete from '@mui/material/Autocomplete'
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
          options={dummyFormList}
          disableCloseOnSelect
          getOptionLabel={(option) => option.text}
          // className={classes.formControlInput}
          sx={{ width: '500px' }}
          renderOption={(props, option, { selected }) => (
            <ListItem {...props}>
              <ListItemButton>
                {/* ICON */}
                <ListItemIcon>
                  <Checkbox
                    size='small'
                    checked={true}
                  />
                </ListItemIcon>

                {/* TEXT */}
                <ListItemText primary={option.text}/>
              </ListItemButton>
            </ListItem>
          )}
          renderInput={(params) => (
            <TextField 
              {...params} 
              label='' 
              placeholder='' 
              // className={classes.formControlInput}
            />
          )}
        />
      </Stack>
    </Stack>
  )
}

export default Filters