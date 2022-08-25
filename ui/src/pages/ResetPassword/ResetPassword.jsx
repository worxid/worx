import { useState } from 'react'

// MUIS
import Button from '@mui/material/Button'
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

// STYLES
import useLayoutStyles from 'styles/layoutAuthentication'

const ResetPassword = () => {
  const layoutClasses = useLayoutStyles()
  
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
      <Button
        variant='contained'
        fullWidth
        className={layoutClasses.buttonAction}
        disabled={isActionButtonDisabled}
        disableElevation
        type='submit'
      >
        Save New Password
      </Button>
    </form>
  )
}

export default ResetPassword