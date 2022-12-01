import { useState } from 'react'

// COMPONENTS
import LoadingPaper from 'components/LoadingPaper/LoadingPaper'

// MUIS
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import IconButton from '@mui/material/IconButton'
import Input from '@mui/material/Input'
import InputAdornment from '@mui/material/InputAdornment'
import InputLabel from '@mui/material/InputLabel'
import OutlinedInput from '@mui/material/OutlinedInput'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

// MUI ICONS
import IconAdd from '@mui/icons-material/Add'
import IconUpload from '@mui/icons-material/Upload'
import IconVisibility from '@mui/icons-material/Visibility'
import IconVisibilityOff from '@mui/icons-material/VisibilityOff'

// MUI LABS
import LoadingButton from '@mui/lab/LoadingButton'

// STYLES
import useStyles from './settingsUseStyles'

// UTILITIES
import { doesObjectContainDesiredValue } from 'utilities/validation'

const Settings = () => {
  const classes = useStyles()

  const initialFormObject = {
    email: '',
    fullName: '',
    organizationName: '',
    country: null,
    phoneNumber: '',
    password: '',
  }

  const initialFormHelperObject = {
    email: null,
    fullName: null,
    organizationName: null,
    country: null,
    phoneNumber: null,
    password: null,
  }

  const [ formObject, setFormObject ] = useState(initialFormObject)
  const [ formHelperObject, setFormHelperObject ] = useState(initialFormHelperObject)
  const [ isPasswordShown, setIsPasswordShown ] = useState(false)
  const [ isLoading, setIsLoading ] = useState(false)

  const handleFormObjectChange = (inputKey, inputNewValue) => {
    setFormObject(current => {
      return {
        ...current,
        [inputKey]: inputNewValue,
      }
    })
  }

  return (
    <>
      {/* TITLE */}
      <Typography
        variant='h6'
        className='fontWeight500'
      >
        Personal Settings
      </Typography>
      <Typography variant='body1' className={classes.subtitle}>
        Make change to your access settings and prefences
      </Typography>

      {/* CONTENTS */}
      <Stack 
        direction='row'
        position='relative'
        flex='1'
        height={0}
      >
        {/* MAIN CONTENT */}
        <LoadingPaper className={classes.mainContent}>
          {/* FULL NAME FORM */}
          <FormControl 
            variant='outlined' 
            fullWidth
            error={formHelperObject.fullName}
            color='secondary'
          >
            <InputLabel>
              Name
            </InputLabel>
        
            <OutlinedInput
              autoFocus
              type='text'
              value={formObject.fullName}
              onChange={(event) => handleFormObjectChange('fullName', event.target.value)}
              label='Name'
            />

            <FormHelperText>
              {formHelperObject.fullName}
            </FormHelperText>
          </FormControl>

          {/* ORGANIZATION NAME FORM */}
          <FormControl 
            variant='outlined' 
            fullWidth
            error={formHelperObject.organizationName}
            color='secondary'
          >
            <InputLabel>
              Organization Name
            </InputLabel>
        
            <OutlinedInput
              type='text'
              value={formObject.organizationName}
              onChange={(event) => handleFormObjectChange('organizationName', event.target.value)}
              label='Organization Name'
            />

            <FormHelperText>
              {formHelperObject.organizationName}
            </FormHelperText>
          </FormControl>

          {/* EMAIL FORM */}
          <FormControl 
            variant='outlined' 
            fullWidth
            error={formHelperObject.email}
            color='secondary'
            disabled
          >
            <InputLabel>
              Email
            </InputLabel>
        
            <OutlinedInput
              type='email'
              value={formObject.email}
              label='Email'
            />

            <FormHelperText>
              {formHelperObject.email}
            </FormHelperText>
          </FormControl>

          {/* PASSWORD FORM */}
          <FormControl 
            variant='outlined' 
            fullWidth
            error={formHelperObject.password}
            color='secondary'
          >
            <InputLabel>
              Password
            </InputLabel>
        
            <OutlinedInput
              type={isPasswordShown ? 'text' : 'password'}
              value={formObject.password}
              onChange={(event) => handleFormObjectChange('password', event.target.value)}
              label='Password'
              endAdornment={
                <InputAdornment position='end'>
                  <IconButton onClick={() => setIsPasswordShown(current => !current)}>
                    {isPasswordShown ? <IconVisibilityOff/> : <IconVisibility/>}
                  </IconButton>
                </InputAdornment>
              }
            />

            <FormHelperText>
              {formHelperObject.password}
            </FormHelperText>
          </FormControl>

          {/* PHONE NUMBER FORM */}
          <FormControl 
            variant='outlined' 
            fullWidth
            error={formHelperObject.phoneNumber}
            color='secondary'
          >
            <InputLabel>
              Phone Number
            </InputLabel>
        
            <OutlinedInput
              type='number'
              value={formObject.phoneNumber}
              onChange={(event) => handleFormObjectChange('phoneNumber', event.target.value)}
              label='Phone Number'
            />

            <FormHelperText>
              {formHelperObject.phoneNumber}
            </FormHelperText>
          </FormControl>

          <Typography className={`${classes.infoLogo} ${classes.dashboardLogoInfo}`}>
            Dashboard Logo
          </Typography>
          <Stack direction={'row'}>
            <Box className={classes.boxAddLogo}>
              <IconAdd className={classes.iconAddLogo} />
            </Box>
            <Stack>
              <Typography className={classes.infoLogo}>
                Optimal size 512 x 112 pixels<br/>
                File size: Maximum 512kb<br/>
                Allowed file extensions: JPG, JPEG, PNG
              </Typography>
              <Stack>
                <Input
                  id='logo-upload'
                  accept='image/*'
                  type='file'
                  className='displayNone'
                />
                {/* UPLOAD LOGO BUTTON */}
                <Button
                  variant='text'
                  loading={isLoading}
                  startIcon={<IconUpload />}
                  className={classes.buttonUpload}
                  onClick={() => document.getElementById('logo-upload').click()}
                >
                  Upload Logo
                </Button>
              </Stack>
            </Stack>
          </Stack>

          {/* UPDATE BUTTON */}
          <LoadingButton
            variant='contained'
            className={classes.buttonAction}
            disabled={doesObjectContainDesiredValue(formObject, '')}
            loading={isLoading}
            disableElevation
            type='submit'
          >
            Update
          </LoadingButton>
        </LoadingPaper>
      </Stack>
    </>
  )
}

export default Settings