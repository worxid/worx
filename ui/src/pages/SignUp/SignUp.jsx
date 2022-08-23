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
  const [ value, setValue ] = useState(dummyCountryList[0].name)
  const [ inputValue, setInputValue ] = useState(dummyCountryList[0].name)

  const handleFormObjectChange = (inputEvent) => {
    setFormObject(current => {
      return {
        ...current,
        [inputEvent.target.name]: inputEvent.target.value,
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
          name='companyEmail'
          type='email'
          value={formObject.companyEmail}
          onChange={handleFormObjectChange}
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
          name='fullName'
          type='text'
          value={formObject.fullName}
          onChange={handleFormObjectChange}
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
          name='companyName'
          type='text'
          value={formObject.companyName}
          onChange={handleFormObjectChange}
          label='Company Name'
        />

        <FormHelperText>
          {formHelperObject.companyName}
        </FormHelperText>
      </FormControl>

      {/* COUNTRY AUTOCOMPLETE */}
      <Autocomplete
        value={value}
        onChange={(event, newValue) => setValue(newValue)}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => setInputValue(newInputValue)}
        options={dummyCountryList}
        getOptionLabel={(option) => option.name}
        fullWidth
        renderInput={(params) => (
          <TextField 
            {...params} 
            name='country'
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
          name='phoneNumber'
          type='number'
          value={formObject.phoneNumber}
          onChange={handleFormObjectChange}
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
          name='password'
          type={isPasswordShown ? 'text' : 'password'}
          value={formObject.password}
          onChange={handleFormObjectChange}
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