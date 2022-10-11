import { useState, useContext } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

// CONTEXTS
import { AllPagesContext } from 'contexts/AllPagesContext'

// MUIS
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import InputLabel from '@mui/material/InputLabel'
import OutlinedInput from '@mui/material/OutlinedInput'
import Typography from '@mui/material/Typography'

// MUI ICONS
import IconVisibility from '@mui/icons-material/Visibility'
import IconVisibilityOff from '@mui/icons-material/VisibilityOff'

// MUI LABS
import LoadingButton from '@mui/lab/LoadingButton'

// SERVICES
import { postResetPasswordUser } from 'services/users'

// STYLES
import useLayoutStyles from 'styles/layoutAuthentication'

// UTILITIES
import { 
  didSuccessfullyCallTheApi,
  doesObjectContainDesiredValue, 
} from 'utilities/validation'

const ResetPassword = () => {
  const layoutClasses = useLayoutStyles()

  const { setSnackbarObject } = useContext(AllPagesContext)

  const [ searchParams ] = useSearchParams()

  const navigate = useNavigate()
  
  const initialFormObject = {
    newPassword: '',
    confirmPassword: '',
  }

  const initialFormHelperObject = {
    newPassword: null,
    confirmPassword: null,
  }

  const [ formObject, setFormObject ] = useState(initialFormObject)
  const [ formHelperObject, setFormHelperObject ] = useState(initialFormHelperObject)
  const [ isNewPasswordShown, setIsNewPasswordShown ] = useState(false)
  const [ isConfirmPasswordShown, setIsConfirmPasswordShown ] = useState(false)
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
    if (doesObjectContainDesiredValue(formObject, '')) {
      setSnackbarObject({
        open: true,
        severity: 'error',
        title: '',
        message: 'Please fill all fields',
      })
    }
    // NEW PASSWORD DOESN'T MATCH WITH CONFIRM PASSWORD
    else if (formObject.newPassword !== formObject.confirmPassword) {
      setSnackbarObject({
        open: true,
        severity: 'error',
        title: '',
        message: 'Confirm password doesn\'t match new password',
      })
    }
    // USER INPUTS ARE VALID
    else {
      const abortController = new AbortController()
  
      const resultForgotPasswordUser = await postResetPasswordUser(
        abortController.signal,
        {
          token: searchParams.get('code'),
          new_password: formObject.newPassword,
        },
      )

      // REDIRECT THE USER IF SUCCESSFULLY CALLING THE API
      if (didSuccessfullyCallTheApi(resultForgotPasswordUser.status)) {
        setSnackbarObject({
          open: true,
          severity: 'success',
          title: '',
          message: 'Successfully changing your password',
        })

        navigate('/authentication-finish?type=reset-password')
      }
      // SHOW AN ERROR MESSAGE IF UNSUCCESSFULLY CALLING THE API
      else {
        // TO DO: FINISH THIS LATER
        setSnackbarObject({
          open: true,
          severity: 'error',
          title: '',
          message: 'Somethings went wrong. Please try again.',
        })
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
        Reset Password
      </Typography>

      {/* NEW PASSWORD FORM */}
      <FormControl 
        variant='outlined' 
        fullWidth
        error={formHelperObject.newPassword}
        color='secondary'
      >
        <InputLabel>
          New Password
        </InputLabel>
        
        <OutlinedInput
          type={isNewPasswordShown ? 'text' : 'password'}
          value={formObject.newPassword}
          onChange={(event) => handleFormObjectChange('newPassword', event.target.value)}
          label='New Password'
          endAdornment={
            <InputAdornment position='end'>
              <IconButton onClick={() => setIsNewPasswordShown(current => !current)}>
                {isNewPasswordShown ? <IconVisibilityOff/> : <IconVisibility/>}
              </IconButton>
            </InputAdornment>
          }
        />

        <FormHelperText>
          {formHelperObject.newPassword}
        </FormHelperText>
      </FormControl>

      {/* CONFIRM PASSWORD FORM */}
      <FormControl 
        variant='outlined' 
        fullWidth
        error={formHelperObject.confirmPassword}
        color='secondary'
      >
        <InputLabel>
          Confirm Password
        </InputLabel>
        
        <OutlinedInput
          type={isConfirmPasswordShown ? 'text' : 'password'}
          value={formObject.confirmPassword}
          onChange={(event) => handleFormObjectChange('confirmPassword', event.target.value)}
          label='Confirm Password'
          endAdornment={
            <InputAdornment position='end'>
              <IconButton onClick={() => setIsConfirmPasswordShown(current => !current)}>
                {isConfirmPasswordShown ? <IconVisibilityOff/> : <IconVisibility/>}
              </IconButton>
            </InputAdornment>
          }
        />

        <FormHelperText>
          {formHelperObject.confirmPassword}
        </FormHelperText>
      </FormControl>

      {/* RESET MY PASSWORD BUTTON */}
      <LoadingButton
        variant='contained'
        fullWidth
        className={layoutClasses.buttonAction}
        disabled={doesObjectContainDesiredValue(formObject, '')}
        loading={isLoading}
        disableElevation
        type='submit'
      >
        Save New Password
      </LoadingButton>
    </form>
  )
}

export default ResetPassword