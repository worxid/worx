import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

// CONTEXTS
import { AllPagesContext } from 'contexts/AllPagesContext'

// MUIS
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import InputLabel from '@mui/material/InputLabel'
import OutlinedInput from '@mui/material/OutlinedInput'
import Typography from '@mui/material/Typography'

// MUI LABS
import LoadingButton from '@mui/lab/LoadingButton'

// SERVICES
import { postForgotPasswordUser } from 'services/users'

// STYLES
import useLayoutStyles from 'styles/layoutAuthentication'

// UTILITIES
import { 
  didSuccessfullyCallTheApi,
  doesObjectContainDesiredValue, 
} from 'utilities/validation'

const ForgotPassword = () => {
  const layoutClasses = useLayoutStyles()

  const { setSnackbarObject } = useContext(AllPagesContext)

  const navigate = useNavigate()
  
  const initialFormObject = {
    email: '',
  }

  const initialFormHelperObject = {
    email: null,
  }

  const [ formObject, setFormObject ] = useState(initialFormObject)
  const [ formHelperObject, setFormHelperObject ] = useState(initialFormHelperObject)
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
    // USER INPUTS ARE NOT EMPTY
    else {
      const abortController = new AbortController()
  
      const resultForgotPasswordUser = await postForgotPasswordUser(
        abortController.signal,
        { email: formObject?.email }
      )

      // REDIRECT THE USER IF SUCCESSFULLY CALLING THE API
      if (didSuccessfullyCallTheApi(resultForgotPasswordUser.status)) {
        setSnackbarObject({
          open: true,
          severity: 'success',
          title: '',
          message: 'Successfully sending request to your email',
        })

        navigate(`/authentication-finish?type=forgot-password&email=${formObject.email}`)
      }
      // SHOW AN ERROR MESSAGE IF UNSUCCESSFULLY CALLING THE API
      else {
        // UNREGISTERED EMAIL
        if (resultForgotPasswordUser.status === 400) {
          setSnackbarObject({
            open: true,
            severity: 'error',
            title: '',
            message: 'Unregistered email',
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
        Forgot Password
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
        Reset My Password
      </LoadingButton>
    </form>
  )
}

export default ForgotPassword