// MUIS
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import InputLabel from '@mui/material/InputLabel'
import OutlinedInput from '@mui/material/OutlinedInput'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

// STYLES
import useStyles from './tabPropertiesPreviewUseStyles'

const TabProperties = () => {
  // STYLES
  const classes = useStyles()

  return (
    <Stack flex={1} direction='column'>
      {/* HEADER */}
      <Stack className={classes.headerProperties}>
        <Typography variant='subtitle1'>Fields Properties</Typography>
      </Stack>

      {/* CONTENTS */}
      <Stack className={classes.contentsProperties}>
        {/* TITLE FORM */}
        <FormControl
          className={classes.formControl}
          variant='outlined' 
          fullWidth
          color='secondary'
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

          <FormHelperText></FormHelperText>
        </FormControl>

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
            type='text'
            label='Description'
            defaultValue='Ini adalah deskripsi'
          />

          <FormHelperText></FormHelperText>
        </FormControl>
      </Stack>
    </Stack>
  )
}

export default TabProperties