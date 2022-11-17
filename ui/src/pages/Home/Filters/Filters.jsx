// MUIS
import FormControl from '@mui/material/FormControl'
import InputAdornment from '@mui/material/InputAdornment'
import OutlinedInput from '@mui/material/OutlinedInput'
import Stack from '@mui/material/Stack'
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
    </Stack>
  )
}

export default Filters