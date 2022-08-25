import { useState } from 'react'

// MUIS
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import InputLabel from '@mui/material/InputLabel'
import Link from '@mui/material/Link'
import OutlinedInput from '@mui/material/OutlinedInput'
import Typography from '@mui/material/Typography'

// STYLES
import useLayoutStyles from 'styles/layoutAuthentication'

const ForgotPassword = () => {
  const layoutClasses = useLayoutStyles()
  
  const initialFormObject = {
    companyEmail: '',
  }

  const initialFormHelperObject = {
    companyEmail: null,
  }

  const [ formObject, setFormObject ] = useState(initialFormObject)
  const [ formHelperObject, setFormHelperObject ] = useState(initialFormHelperObject)
  const [ isActionButtonDisabled, setIsActionButtonDisabled ] = useState(false)

  // HANDLE FORM INPUT CHANGE
  const handleFormObjectChange = (inputKey, inputNewValue) => {
    setFormObject(current => {
      return {
        ...current,
        [inputKey]: inputNewValue,
      }
    })
  }

  // HANDLE BUTTON CLICK
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
        Forgot Password
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

      {/* RESET MY PASSWORD BUTTON */}
      <Button
        variant='contained'
        fullWidth
        className={layoutClasses.buttonAction}
        disabled={isActionButtonDisabled}
        disableElevation
        type='submit'
      >
        Reset My Password
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

export default ForgotPassword