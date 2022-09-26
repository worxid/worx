import { useState } from 'react'

// CONSTANTS
import { countries } from 'constants/countryList'

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

// STYLES
import useLayoutStyles from 'styles/layoutAuthentication'

const SignUp = () => {
  const layoutClasses = useLayoutStyles()

  const initialFormObject = {
    companyEmail: '',
    fullName: '',
    companyName: '',
    country: countries[0],
    phoneNumber: '',
    password: '',
  }

  const initialFormHelperObject = {
    companyEmail: null,
    fullName: null,
    companyName: null,
    country: null,
    phoneNumber: null,
    password: null,
  }

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

  const handleFormButtonClick = (inputEvent) => {
    inputEvent.preventDefault()
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
        Let's Get Started
      </Typography>

      {/* COMPANY EMAIL FORM */}
      <FormControl 
        variant='outlined' 
        fullWidth
        error={formHelperObject.companyEmail}
        color='secondary'
      >
        <InputLabel>
          Company Email
        </InputLabel>
        
        <OutlinedInput
          autoFocus
          type='email'
          value={formObject.companyEmail}
          onChange={(event) => handleFormObjectChange('companyEmail', event.target.value)}
          label='Company Email'
        />

        <FormHelperText>
          {formHelperObject.companyEmail}
        </FormHelperText>
      </FormControl>

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
          type='text'
          value={formObject.fullName}
          onChange={(event) => handleFormObjectChange('fullName', event.target.value)}
          label='Full Name'
        />

        <FormHelperText>
          {formHelperObject.fullName}
        </FormHelperText>
      </FormControl>

      {/* COMPANY NAME FORM */}
      <FormControl 
        variant='outlined' 
        fullWidth
        error={formHelperObject.companyName}
        color='secondary'
      >
        <InputLabel>
          Company Name
        </InputLabel>
        
        <OutlinedInput
          type='text'
          value={formObject.companyName}
          onChange={(event) => handleFormObjectChange('companyName', event.target.value)}
          label='Company Name'
        />

        <FormHelperText>
          {formHelperObject.companyName}
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

      {/* SIGN IN TEXT */}
      <Typography variant='subtitle1'>
        Already have an account?&nbsp;
        <Link
          underline='none'
          href='/sign-in'
          className={layoutClasses.linkInsideText}
        >
          Sign In
        </Link>
      </Typography>
    </form>
  )
}

export default SignUp