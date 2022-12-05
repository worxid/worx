import { useContext, useState } from 'react'

// CONTEXTS
import { AllPagesContext } from 'contexts/AllPagesContext'

// MUIS
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import Input from '@mui/material/Input'
import InputLabel from '@mui/material/InputLabel'
import OutlinedInput from '@mui/material/OutlinedInput'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

// MUI ICONS
import IconAdd from '@mui/icons-material/Add'
import IconUpload from '@mui/icons-material/Upload'

// MUI LABS
import LoadingButton from '@mui/lab/LoadingButton'

// STYLES
import useStyles from '../settingsUseStyles'
import useLayoutStyles from 'styles/layoutPrivate'

// UTILITIES
import {
  didSuccessfullyCallTheApi,
  doesObjectContainDesiredValue
} from 'utilities/validation'

const UpdateProfile = () => {
  const classes = useStyles()
  const layoutClasses = useLayoutStyles()

  // CONTEXT
  const { auth, setSnackbarObject } = useContext(AllPagesContext)

  const initialFormObject = {
    email: auth?.user?.email,
    fullName: '',
    organizationName: auth?.user?.organization_name,
    phoneNumber: auth?.user?.phone,
  }

  const initialFormHelperObject = {
    email: null,
    fullName: null,
    organizationName: null,
    phoneNumber: null,
  }

  const [ formObject, setFormObject ] = useState(initialFormObject)
  const [ formHelperObject, setFormHelperObject ] = useState(initialFormHelperObject)
  const [ isLoading, setIsLoading ] = useState(false)

  const handleFormObjectChange = (inputKey, inputNewValue) => {
    setFormObject(current => {
      return {
        ...current,
        [inputKey]: inputNewValue,
      }
    })
  }

  // HANDLE BUTTON CLICK
  const handleFormButtonClick = async (inputEvent) => {
    inputEvent.preventDefault()
    setIsLoading(true)

    // CHECK IF USER INPUTS ARE EMPTY
    if (doesObjectContainDesiredValue(formObject, '')) {
      setSnackbarObject({
        open: true,
        severity: 'error',
        title: '',
        message: 'Please fill all fields',
      })
    }
    // USER INPUTS ARE VALID
    else {
      const abortController = new AbortController()

      abortController.abort()
    }

    setIsLoading(false)
  }

  return (
    <form
      onSubmit={handleFormButtonClick}
      className={layoutClasses.form}
    >
      {/* FULL NAME FORM */}
      <FormControl 
        variant='outlined' 
        fullWidth
        error={formHelperObject.fullName}
        color='secondary'
      >
        <InputLabel>
          Full Name
        </InputLabel>
        
        <OutlinedInput
          autoFocus
          type='text'
          value={formObject.fullName}
          onChange={(event) => handleFormObjectChange('fullName', event.target.value)}
          label='Full Name'
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
            {/* UPLOAD LOGO BUTTON */}
            <Button
              variant='text'
              startIcon={<IconUpload />}
              className={classes.buttonUpload}
              onClick={() => document.getElementById('logo-upload').click()}
            >
              Upload Logo
            </Button>
            <Input
              id='logo-upload'
              accept='image/*'
              type='file'
              className='displayNone'
            />
          </Stack>
        </Stack>
      </Stack>

      <Stack className='displayFlex width100'>
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
      </Stack>
    </form>
  )
}

export default UpdateProfile