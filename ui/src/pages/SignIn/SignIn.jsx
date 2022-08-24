import { useState } from 'react'

// MUIS
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import InputLabel from '@mui/material/InputLabel'
import Link from '@mui/material/Link'
import OutlinedInput from '@mui/material/OutlinedInput'
import Typography from '@mui/material/Typography'

// MUI ICONS
import IconVisibility from '@mui/icons-material/Visibility'
import IconVisibilityOff from '@mui/icons-material/VisibilityOff'

// STYLES
import useLayoutStyles from 'styles/layoutAuthenticationHalf'

const SignIn = () => {
  const layoutClasses = useLayoutStyles()

  const initialFormObject = {
    companyEmail: '',
    password: '',
  }

  const initialFormHelperObject = {
    companyEmail: null,
    password: null,
  }

  const [ formObject, setFormObject ] = useState(initialFormObject)
  const [ formHelperObject, setFormHelperObject ] = useState(initialFormHelperObject)
  const [ isPasswordShown, setIsPasswordShown ] = useState(false)
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
        Sign in to your Worx Account
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

      {/* FORGOT PASSWORD LINK */}
      <Link
        variant='subtitle1'
        className={layoutClasses.link}
        underline='none'
        href='/forgot-password'
      >
        Forgot Password?
      </Link>

      {/* SIGN IN BUTTON */}
      <Button
        variant='contained'
        fullWidth
        className={layoutClasses.buttonAction}
        disabled={isActionButtonDisabled}
        disableElevation
        type='submit'
      >
        Sign In
      </Button>

      {/* SIGN UP TEXT */}
      <Typography variant='subtitle1'>
        Don't have an account?&nbsp;
        <Link
          underline='none'
          href='/sign-up'
          className={layoutClasses.linkInsideText}
        >
          Sign Up
        </Link>
      </Typography>
    </form>
  )
}

export default SignIn