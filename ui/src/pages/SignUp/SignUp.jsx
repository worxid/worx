import { useState } from 'react'

// MUIS
import Autocomplete from '@mui/material/Autocomplete'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import InputLabel from '@mui/material/InputLabel'
import OutlinedInput from '@mui/material/OutlinedInput'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

// MUI ICONS
import IconVisibility from '@mui/icons-material/Visibility'
import IconVisibilityOff from '@mui/icons-material/VisibilityOff'

// STYLES
import useLayoutStyles from 'styles/layoutAuthenticationHalf'

const SignUp = () => {
  const layoutClasses = useLayoutStyles()

  const dummyCountryList = [
    { name: 'Indonesia' },
    { name: 'Malaysia' },
    { name: 'Singapore' },
  ]

  const initialFormObject = {
    companyEmail: '',
    fullName: '',
    companyName: '',
    country: dummyCountryList[0].name,
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
  const [ inputValue, setInputValue ] = useState(dummyCountryList[0].name)

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
        className={layoutClasses.textTitle}
      >
        Let's Get Started
      </Typography>

      {/* COMPANY EMAIL FORM */}
      <FormControl 
        variant='outlined' 
        fullWidth
        error={formHelperObject.companyEmail}
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
      <Autocomplete
        value={formObject.country}
        onChange={(event, newValue) => handleFormObjectChange('country', newValue)}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => setInputValue(newInputValue)}
        options={dummyCountryList}
        getOptionLabel={(option) => option.name}
        fullWidth
        renderInput={(params) => (
          <TextField 
            {...params} 
            label='Country' 
            helperText={formHelperObject.country}
          />
        )}
      />

      {/* PHONE NUMBER FORM */}
      <FormControl 
        variant='outlined' 
        fullWidth
        error={formHelperObject.phoneNumber}
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
    </>
  )
}

export default SignUp