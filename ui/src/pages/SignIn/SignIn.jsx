import { useState, useContext } from 'react'

// CONTEXTS
import { AllPagesContext } from 'contexts/AllPagesContext'

// MUIS
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

// MUI LABS
import LoadingButton from '@mui/lab/LoadingButton'

// SERVICES
import { postLoginUser } from 'services/users'

// STYLES
import useLayoutStyles from 'styles/layoutAuthentication'

// UTILITIES
import { setUserProfileToLocalStorage } from 'utilities/localStorage'
import { 
  didSuccessfullyCallTheApi,
  doesObjectContainDesiredValue, 
} from 'utilities/validation'

const SignIn = () => {
  const layoutClasses = useLayoutStyles()

  const { 
    setAuth, 
    setSnackbarObject, 
  } = useContext(AllPagesContext)

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
  const [ isLoading, setIsLoading ] = useState(false)

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
  const handleFormButtonClick = async (inputEvent) => {
    inputEvent.preventDefault()
    setIsLoading(true)

    // CHECK IF USER INPUTS ARE EMPTY
    if (doesObjectContainDesiredValue(formObject, '') || 
    doesObjectContainDesiredValue(formObject, null)) {
      setSnackbarObject({
        open: true,
        severity: 'error',
        title: '',
        message: 'Please fill all fields',
      })
    }
    // USER INPUTS ARE NOT EMPTY
    else {
      const abortController = new AbortController()
  
      const resultLoginUser = await postLoginUser(
        abortController.signal,
        {
          email: formObject?.email,
          password: formObject?.password,
        }
      )

      // SAVE USER DATA IF THE SUCCESSFULLY LOGGED IN
      if (didSuccessfullyCallTheApi(resultLoginUser.status)) {
        setSnackbarObject({
          open: true,
          severity: 'success',
          title: '',
          message: 'Successfully logging in. Welcome.',
        })

        const userProfileObject = {
          email: formObject?.email,
          accessToken: resultLoginUser?.data?.data?.accessToken,
        }
        
        setUserProfileToLocalStorage(userProfileObject)
        setAuth(userProfileObject)
      }
      // SHOW AN ERROR MESSAGE IF THE UNSUCCESSFULLY LOGGED IN
      else {
        // UNREGISTERED EMAIL OR PASSWORD
        if (resultLoginUser.status === 401) {
          setSnackbarObject({
            open: true,
            severity: 'error',
            title: '',
            message: 'Wrong email or password',
          })
        }
      }

      abortController.abort()
    }

    setIsLoading(false)
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
      <LoadingButton
        variant='contained'
        fullWidth
        className={layoutClasses.buttonAction}
        disabled={doesObjectContainDesiredValue(formObject, '')}
        loading={isLoading}
        disableElevation
        type='submit'
      >
        Sign In
      </LoadingButton>
    </form>
  )
}

export default SignIn