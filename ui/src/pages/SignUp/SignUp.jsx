import { useState, useContext } from 'react'

// CONSTANTS
import { countries } from 'constants/countryList'

// CONTEXTS
import { AllPagesContext } from 'contexts/AllPagesContext'

// MUIS
import Autocomplete from '@mui/material/Autocomplete'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import InputLabel from '@mui/material/InputLabel'
import Link from '@mui/material/Link'
import OutlinedInput from '@mui/material/OutlinedInput'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

// MUI ICONS
import IconVisibility from '@mui/icons-material/Visibility'
import IconVisibilityOff from '@mui/icons-material/VisibilityOff'

// SERVICES
import { postRegisterUser } from 'services/users'

// STYLES
import useLayoutStyles from 'styles/layoutAuthentication'

// UTILITIES
import { doesObjectContainDesiredValue } from 'utilities/validation'

const SignUp = () => {
  const layoutClasses = useLayoutStyles()

  const { setSnackbarObject } = useContext(AllPagesContext)

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

  const ladingPageBaseUrl = process.env.REACT_APP_LANDING_PAGE_BASE_URL

  const [ formObject, setFormObject ] = useState(initialFormObject)
  const [ formHelperObject, setFormHelperObject ] = useState(initialFormHelperObject)
  const [ isPasswordShown, setIsPasswordShown ] = useState(false)
  const [ countryInputValue, setCountryInputValue ] = useState(countries[0].name)
  const [ isActionButtonDisabled, setIsActionButtonDisabled ] = useState(false)

  const handleFormObjectChange = (inputKey, inputNewValue) => {
    setFormObject(current => {
      return {
        ...current,
        [inputKey]: inputNewValue,
      }
    })
  }

  const handleFormButtonClick = async (inputEvent) => {
    inputEvent.preventDefault()

    // CHECK IF USER INPUTS ARE EMPTY
    if (doesObjectContainDesiredValue(formObject, '') || 
    doesObjectContainDesiredValue(formObject, null)) {
      setSnackbarObject({
        open: true,
        severity: 'error',
        title: '',
        message: 'Please fill all fields'
      })
    }
    // USER INPUTS ARE NOT EMPTY
    else {
      const abortController = new AbortController()
  
      const resultRegisterUser = await postRegisterUser(
        abortController.signal,
        {
          username: formObject?.fullName,
          password: formObject?.password,
          email: formObject?.email,
          phoneNo: formObject?.phoneNumber,
          country: formObject?.country?.name,
          organization_name: formObject?.organizationName,
        }
      )
  
      abortController.abort()
    }
  }

  return (
    <form 
      onSubmit={handleFormButtonClick}
      className={layoutClasses.form}
    >
      {/* TITLE */}
      <Typography
        variant='h6'
        className={layoutClasses.textTitle}
      >
        Get Started For Free
      </Typography>

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

      {/* EMAIL FORM */}
      <FormControl 
        variant='outlined' 
        fullWidth
        error={formHelperObject.email}
        color='secondary'
      >
        <InputLabel>
          Email
        </InputLabel>
        
        <OutlinedInput
          type='email'
          value={formObject.email}
          onChange={(event) => handleFormObjectChange('email', event.target.value)}
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

      {/* COUNTRY AUTOCOMPLETE */}
      <FormControl className='no-zoom' fullWidth>
        <Autocomplete
          value={formObject.country}
          onChange={(event, newValue) => handleFormObjectChange('country', newValue)}
          inputValue={countryInputValue}
          onInputChange={(event, newInputValue) => setCountryInputValue(newInputValue)}
          options={countries}
          getOptionLabel={(option) => option.name}
          fullWidth
          renderInput={(params) => (
            <TextField 
              {...params} 
              label='Country'
              color='secondary'
              error={formHelperObject.country}
              helperText={formHelperObject.country ?? ' '}
            />
          )}
          className='neutralize-zoom-autocomplete'
        />
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

      {/* SIGN UP BUTTON */}
      <Button
        variant='contained'
        fullWidth
        className={layoutClasses.buttonAction}
        disabled={isActionButtonDisabled}
        disableElevation
        type='submit'
      >
        Sign Up
      </Button>

      {/* AGREEMENT TEXT */}
      <Typography 
        variant='body2'
        className='colorTextSecondary'
        textAlign='center'
      >
        Signing up for a Worx account means you agree to the&nbsp;
        <Link 
          href={`${ladingPageBaseUrl}/privacy-policy`}
          color='text.secondary'
          className='fontWeight500'
        >
          Privacy Policy
        </Link>
        &nbsp;and&nbsp;
        <Link 
          href={`${ladingPageBaseUrl}/terms-of-service`}
          color='text.secondary'
          className='fontWeight500'
        >
          Terms of Service
        </Link>
      </Typography>
    </form>
  )
}

export default SignUp