// MUIS
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Checkbox from '@mui/material/Checkbox'
import Divider from '@mui/material/Divider'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
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
import IconAccessTimeFilled from '@mui/icons-material/AccessTimeFilled'
import IconAttachFile from '@mui/icons-material/AttachFile'
import IconBrush from '@mui/icons-material/Brush'
import IconCameraAlt from '@mui/icons-material/CameraAlt'
import IconCancel from '@mui/icons-material/Cancel'
import IconCreate from '@mui/icons-material/Create'
import IconDateRange from '@mui/icons-material/DateRange'
import IconImage from '@mui/icons-material/Image'
import IconQrCode2 from '@mui/icons-material/QrCode2'
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
      {item.type === 'separator' && <Divider className={classes.separatorType}/>}

      <Box className={classes.mobilePreview}>
        {/* LABEL & DESCRIPTION */}
        <Box>
          <Typography variant='caption' className='displayBlock' noWrap>{item.label}</Typography>
          <Typography variant='caption' color='text.secondary' className='displayBlock' noWrap>{item.description}</Typography>
        </Box>

        {/* TEXTFIELD AND INTEGER */}
        {(item.type === 'text' || item.type === 'integer') && (
          <FormControl fullWidth className={classes.formControlMobile}>
            <TextField label='Answer' variant='filled' size='small' className='heightFitContent'/>
          </FormControl>
        )}

        {/* CHECKBOX */}
        {item.type === 'checkbox_group' && (
          <FormGroup className={classes.formControlMobile}>
            {item.group.map((itemOption, index) => (
              <FormControlLabel
                key={index}
                control={<Checkbox size='small'/>}
                label={(
                  <Typography variant='caption' className='displayBlock'>{itemOption.label || `Option #${index + 1}`}</Typography>
                )}
              />
            ))}
          </FormGroup>
        )}

        {/* RADIO */}
        {item.type === 'radio_group' && (
          <RadioGroup className={classes.formControlMobile}>
            {item.options.map((itemOption, index) => (
              <FormControlLabel
                key={index}
                value={itemOption.label || `Option #${index + 1}`}
                control={<Radio size='small' readOnly/>}
                label={(
                  <Typography variant='caption' className='displayBlock'>{itemOption.label || `Option #${index + 1}`}</Typography>
                )}
              />
            ))}
          </RadioGroup>
        )}

        {/* DROPDOWN */}
        {item.type === 'dropdown' && (
          <FormControl variant='filled' fullWidth className={classes.formControlMobile}>
            <InputLabel>Answer</InputLabel>
            <Select
              label={item.label}
              size='small'
              className='neutralize-zoom-select heightFitContent'
              MenuProps={{ className: 'neutralize-zoom-select-menu' }}
            >
              {item.options.map((item, index) => (
                <MenuItem key={index} value={item.label}>
                  <Typography variant='caption' className='displayBlock' noWrap>{item.label || `Option #${index + 1}`}</Typography>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}

        {/* DATE */}
        {item.type === 'date' && (
          <FormControl fullWidth className={classes.formControlMobile}>
            <Stack direction='row' alignItems='center'>
              <TextField
                label='Answer'
                variant='filled'
                size='small'
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconCancel fontSize='small'/>
                    </InputAdornment>
                  )
                }}
                className='heightFitContent'
              />

              <IconButton size='large' className={`${classes.buttonRedPrimary} buttonDateRange heightFitContent`}>
                <IconDateRange fontSize='small'/>
              </IconButton>
            </Stack>
          </FormControl>
        )}

        {/* RATING */}
        {item.type === 'rating' && (
          <FormControl className={classes.formControlMobile}>
            <Rating
              value={0}
              max={item.max_stars}
              readOnly
              emptyIcon={<IconStar fontSize='small' className={classes.opacityHalf}/>}
            />
          </FormControl>
        )}

        {/* FILE */}
        {item.type === 'file' && (
          <FormControl className={classes.formControlMobile}>
            <Button size='small' className={`${classes.buttonRedPrimary} heightFitContent`} startIcon={<IconAttachFile fontSize='small'/>}>
              Add File
            </Button>
          </FormControl>
        )}

        {/* IMAGE */}
        {item.type === 'photo' && (
          <FormControl className={classes.formControlMobile}>
            <Stack direction='row'>
              <Button size='small' className={`${classes.buttonRedPrimary} buttonCamera heightFitContent`} startIcon={<IconCameraAlt fontSize='small'/>}>
                Camera
              </Button>

              {item.allow_gallery_upload && (
                <Button size='small' className={`${classes.buttonRedPrimary} heightFitContent`} startIcon={<IconImage fontSize='small'/>}>
                  Gallery
                </Button>
              )}
            </Stack>
          </FormControl>
        )}

        {/* SIGNATURE */}
        {item.type === 'signature' && (
          <FormControl className={classes.formControlMobile}>
            <Button size='small' className={`${classes.buttonRedPrimary} heightFitContent`} startIcon={<IconCreate fontSize='small'/>}>
              Add Signature
            </Button>
          </FormControl>
        )}

        {/* TIME */}
        {item.type === 'time' && (
          <FormControl fullWidth className={classes.formControlMobile}>
            <Stack direction='row' alignItems='center'>
              <TextField
                label='Answer'
                variant='filled'
                size='small'
                className={`${classes.inputDateTime} heightFitContent`}
              />

              <IconButton size='large' className={`${classes.buttonRedPrimary} buttonDateRange heightFitContent`}>
                <IconAccessTimeFilled fontSize='small'/>
              </IconButton>
            </Stack>
          </FormControl>
        )}

        {/* BARCODE */}
        {item.type === 'barcode' && (
          <FormControl fullWidth className={classes.formControlMobile}>
            <Stack direction='row' alignItems='center'>
              <TextField
                label='Scan Barcode'
                variant='filled'
                size='small'
                className={`${classes.inputDateTime} heightFitContent`}
              />

              <IconButton size='large' className={`${classes.buttonRedPrimary} buttonDateRange heightFitContent`}>
                <IconQrCode2 fontSize='small'/>
              </IconButton>
            </Stack>
          </FormControl>
        )}

        {/* SKETCH */}
        {item.type === 'sketch' && (
          <FormControl fullWidth className={classes.formControlMobile}>
            <Stack direction='row' alignItems='center'>
              <IconButton size='large' className={`${classes.buttonRedPrimary} heightFitContent`}>
                <IconBrush fontSize='small'/>
              </IconButton>

              <Typography marginLeft={'8px'} variant='caption'>Add Sketch</Typography>
            </Stack>
          </FormControl>
        )}

        {/* YES/NO */}
        {item.type === 'boolean' && (
          <RadioGroup className={classes.formControlMobile}>
            <Stack direction='row'>
              <FormControlLabel
                value='yes'
                control={<Radio size='small' readOnly/>}
                label={(
                  <Typography variant='caption' className={classes.labelYesNo}>Yes</Typography>
                )}
              />

              <FormControlLabel
                value='no'
                control={<Radio size='small' readOnly/>}
                label={(
                  <Typography variant='caption' className={classes.labelYesNo}>No</Typography>
                )}
              />
            </Stack>
          </RadioGroup>
        )}
      </Box>

      <Divider className={classes.dividerInput}/>
    </>
  )
}

export default MobilePreview