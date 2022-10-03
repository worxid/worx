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
import useLayoutStyles from 'styles/layoutAuthentication'

const SignIn = () => {
  const layoutClasses = useLayoutStyles()

  const initialFormObject = {
    email: '',
    password: '',
  }

  const initialFormHelperObject = {
    email: null,
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
        Welcome Back
      </Typography>

      {/* COMPANY EMAIL FORM */}
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
          autoFocus
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
    </form>
  )
}

export default SignIn