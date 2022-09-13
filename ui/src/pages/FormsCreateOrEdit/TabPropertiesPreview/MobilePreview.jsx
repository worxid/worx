// ASSETS
import IconSignature from 'assets/images/icons/icon-input-signature.svg'

// MUIS
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Checkbox from '@mui/material/Checkbox'
import Divider from '@mui/material/Divider'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import Rating from '@mui/material/Rating'
import Select from '@mui/material/Select'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

// MUI ICONS
import IconAttachFile from '@mui/icons-material/AttachFile'
import IconCameraAlt from '@mui/icons-material/CameraAlt'
import IconCancel from '@mui/icons-material/Cancel'
import IconDateRange from '@mui/icons-material/DateRange'
import IconImage from '@mui/icons-material/Image'
import IconStar from '@mui/icons-material/Star'

// STYLES
import useStyles from './tabPropertiesPreviewUseStyles'


const MobilePreview = (props) => {
  const { item } = props

  // STYLES
  const classes = useStyles()

  return (
    <>
      {/* SEPARATOR */}
      {item.type === 'separator' && (
        <>
          <Divider className='borderWidth4 marginBottom12 backgroundColorDefault'/>
        </> 
      )}
      <Box className='paddingX16 marginBottom12'>
        {/* LABEL & DESCRIPTION */}
        <Box>
          <Typography variant='body2'>{item.label}</Typography>
          <Typography variant='caption' color='text.secondary'>{item.description}</Typography>
        </Box>

        {/* TEXTFIELD */}
        {item.type === 'text' && (
          <FormControl fullWidth className='marginTop8'>
            <TextField label='Answer' variant='filled' size='small'/>
          </FormControl>
        )}

        {/* CHECKBOX */}
        {item.type === 'checkboxGroup' && (
          <FormGroup className={`${classes.formControlMobile} marginTop8`}>
            {item.optionList.map((itemOption, index) => (
              <FormControlLabel
                key={index}
                control={<Checkbox size='small'/>}
                label={itemOption.label || `Option #${index + 1}`}
              />
            ))}
          </FormGroup>
        )}

        {/* RADIO */}
        {item.type === 'radioGroup' && (
          <RadioGroup className={`${classes.formControlMobile} marginTop8`}>
            <Grid container spacing={0}>
              {item.optionList.map((itemOption, index) => (
                <Grid item xs={6} key={index}>
                  <FormControlLabel
                    value={itemOption.label || `Option #${index + 1}`}
                    control={<Radio size='small' readOnly/>}
                    label={itemOption.label || `Option #${index + 1}`}
                  />
                </Grid>
              ))}
            </Grid>
          </RadioGroup>
        )}

        {/* DROPDOWN */}
        {item.type === 'dropdown' && (
          <FormControl variant='filled' fullWidth size='small' className='marginTop8'>
            <InputLabel>Answer</InputLabel>
            <Select label={item.label}>
              {item.optionList.map((item, index) => (
                <MenuItem key={index} value={item.label}>
                  <Typography variant='body2'>{item.label || `Option #${index + 1}`}</Typography>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}

        {/* DATE */}
        {item.type === 'date' && (
          <FormControl fullWidth className='marginTop8'>
            <Stack direction='row'>
              <TextField
                label='Answer'
                variant='filled'
                size='small'
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconCancel />
                    </InputAdornment>
                  )
                }}
              />

              <IconButton className={`${classes.buttonRedPrimary} marginLeft12`}>
                <IconDateRange />
              </IconButton>
            </Stack>
          </FormControl>
        )}

        {/* RATING */}
        {item.type === 'rating' && (
          <FormControl className={`${classes.formControlMobile} marginTop8`}>
            <Rating
              value={0}
              max={item.ratingStarsCount}
              readOnly
              emptyIcon={<IconStar className='opacity0-5'/>}
            />
          </FormControl>
        )}

        {/* FILE */}
        {item.type === 'file' && (
          <FormControl className={`${classes.formControlMobile} marginTop8`}>
            <Button size='small' className={classes.buttonRedPrimary} startIcon={<IconAttachFile />}>
              Add File
            </Button>
          </FormControl>
        )}

        {/* IMAGE */}
        {item.type === 'image' && (
          <FormControl className={`${classes.formControlMobile} marginTop8`}>
            <Stack direction='row'>
              <Button size='small' className={`${classes.buttonRedPrimary} marginRight20`} startIcon={<IconCameraAlt />}>
                Camera
              </Button>

              {item.imageAllowGallery && (<Button size='small' className={classes.buttonRedPrimary} startIcon={<IconImage />}>
                Gallery
              </Button>)}
            </Stack>
          </FormControl>
        )}

        {/* SIGNATURE */}
        {item.type === 'signature' && (
          <FormControl className={`${classes.formControlMobile} marginTop8`}>
            <Button size='small' className={`${classes.buttonRedPrimary} marginRight20`}>
              <Box component='img' src={IconSignature} className='marginRight8'/>
              Add Signature
            </Button>
          </FormControl>
        )}
      </Box>

      <Divider className='marginBottom12'/>
    </>
  )
}

export default MobilePreview