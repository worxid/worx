import { useContext, useState } from 'react'

// CONTEXTS
import { AllPagesContext } from 'contexts/AllPagesContext'

// HOOKS
import useAxiosPrivate from 'hooks/useAxiosPrivate'

// MUIS
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import InputLabel from '@mui/material/InputLabel'
import OutlinedInput from '@mui/material/OutlinedInput'
import Stack from '@mui/material/Stack'

// MUI ICONS
import IconVisibility from '@mui/icons-material/Visibility'
import IconVisibilityOff from '@mui/icons-material/VisibilityOff'

// MUI LABS
import LoadingButton from '@mui/lab/LoadingButton'

// SERVICES
import { postChangePasswordUser } from 'services/users'

// STYLES
import useStyles from '../settingsUseStyles'
import useLayoutStyles from 'styles/layoutPrivate'

// UTILITIES
import {
  didSuccessfullyCallTheApi,
  doesObjectContainDesiredValue
} from 'utilities/validation'

const UpdatePassword = () => {
  const classes = useStyles()
  const layoutClasses = useLayoutStyles()

  const axiosPrivate = useAxiosPrivate()

  // CONTEXT
  const { auth, setSnackbarObject } = useContext(AllPagesContext)

  const initialFormObject = {
    password: '',
    newPassword: '',
    confirmPassword: '',
  }

  const initialFormHelperObject = {
    password: null,
    newPassword: null,
    confirmPassword: null,
  }

  const [ formObject, setFormObject ] = useState(initialFormObject)
  const [ formHelperObject, setFormHelperObject ] = useState(initialFormHelperObject)
  const [ isPasswordShown, setIsPasswordShown ] = useState(false)
  const [ isNewPasswordShown, setIsNewPasswordShown ] = useState(false)
  const [ isConfirmPasswordShown, setIsConfirmPasswordShown ] = useState(false)
  const [ isLoading, setIsLoading ] = useState(false)

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
        message: 'Confirm Password doesn\'t match New Password',
      })
    }
    // USER INPUTS ARE VALID
    else {
      const abortController = new AbortController()
  
      const resultResetPasswordUser = await postChangePasswordUser(
        abortController.signal,
        {
          email: auth?.user?.email,
          old_password: formObject.password,
          new_password: formObject.newPassword,
        },
        axiosPrivate,
      )

      // REDIRECT THE USER IF SUCCESSFULLY CALLING THE API
      if (didSuccessfullyCallTheApi(resultResetPasswordUser.status)) {
        setFormObject(initialFormObject)
        setIsPasswordShown(false)
        setIsNewPasswordShown(false)
        setIsConfirmPasswordShown(false)
        setSnackbarObject({
          open: true,
          severity: 'success',
          title: '',
          message: 'Password changed successfully',
        })
      }
      // SHOW AN ERROR MESSAGE IF UNSUCCESSFULLY CALLING THE API
      else {
        setSnackbarObject({
          open: true,
          severity: 'error',
          title: resultResetPasswordUser?.data?.error?.status?.replaceAll('_', ' ') || '',
          message: resultResetPasswordUser?.data?.error?.message || 'Something went wrong',
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
      {/* CURRENT PASSWORD */}
      <FormControl 
        variant='outlined' 
        fullWidth
        error={formHelperObject.password}
        color='secondary'
      >
        <InputLabel>
          Current Password
        </InputLabel>
        
        <OutlinedInput
          type={isPasswordShown ? 'text' : 'password'}
          value={formObject.password}
          onChange={(event) => handleFormObjectChange('password', event.target.value)}
          label='Current Password'
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

      {/* NEW PASSWORD */}
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

      {/* CONFIRM NEW PASSWORD */}
      <FormControl 
        variant='outlined' 
        fullWidth
        error={formHelperObject.confirmPassword}
        color='secondary'
      >
        <InputLabel>
          Confirm New Password
        </InputLabel>
        
        <OutlinedInput
          type={isConfirmPasswordShown ? 'text' : 'password'}
          value={formObject.confirmPassword}
          onChange={(event) => handleFormObjectChange('confirmPassword', event.target.value)}
          label='Confirm New Password'
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

      <Stack className='width100'>
        {/* UPDATE BUTTON */}
        <LoadingButton
          variant='contained'
          className={classes.buttonAction}
          disabled={doesObjectContainDesiredValue(formObject, '')}
          loading={isLoading}
          disableElevation
          type='submit'
        >
          Update
        </LoadingButton>
      </Stack>
    </form>
  )
}

export default UpdatePassword