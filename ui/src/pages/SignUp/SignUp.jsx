import { useState } from 'react'

// MUIS
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import InputLabel from '@mui/material/InputLabel'
import OutlinedInput from '@mui/material/OutlinedInput'
import Typography from '@mui/material/Typography'

// STYLES
import useLayoutStyles from 'styles/layoutAuthenticationHalf'

const SignUp = () => {
  const layoutClasses = useLayoutStyles()

  const initialFormObject = {
    companyEmail: '',
    fullName: '',
    companyName: '',
  }

  const initialFormHelperObject = {
    companyEmail: null,
    fullName: null,
    companyName: null,
  }

  const [ formObject, setFormObject ] = useState(initialFormObject)
  const [ formHelperObject, setFormHelperObject ] = useState(initialFormHelperObject)

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
    </>
  )
}

export default SignUp