import { useContext, useEffect, useState } from 'react'

// CONTEXTS
import { AllPagesContext } from 'contexts/AllPagesContext'

// HOOKS
import useAxiosPrivate from 'hooks/useAxiosPrivate'

// MUIS
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import Input from '@mui/material/Input'
import InputLabel from '@mui/material/InputLabel'
import OutlinedInput from '@mui/material/OutlinedInput'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

// MUI ICONS
import IconAdd from '@mui/icons-material/Add'
import IconUpload from '@mui/icons-material/Upload'

// MUI LABS
import LoadingButton from '@mui/lab/LoadingButton'

// SERVICES
import { getMediaPresignedUrl } from 'services/worx/media'
import { putEditProfile } from 'services/worx/users'

// STYLES
import useStyles from '../settingsUseStyles'
import useLayoutStyles from 'styles/layoutPrivate'

// UTILITIES
import { getDefaultErrorMessage } from 'utilities/object'
import {
  didSuccessfullyCallTheApi,
  doesObjectContainDesiredValue,
  wasAccessTokenExpired,
  wasRequestCanceled,
} from 'utilities/validation'

const UpdateProfile = (props) => {
  const { isLoading, setIsLoading } = props

  const classes = useStyles()
  const layoutClasses = useLayoutStyles()

  const axiosPrivate = useAxiosPrivate()

  // CONTEXT
  const { auth, setSnackbarObject } = useContext(AllPagesContext)

  const initialFormObject = {
    email: auth?.user?.email,
    fullName: auth?.user?.fullname,
    organizationName: auth?.user?.organization_name,
    phoneNumber: auth?.user?.phone,
  }

  const initialFormHelperObject = {
    email: null,
    fullName: null,
    organizationName: null,
    phoneNumber: null,
  }

  const [initialLogo, setInitialLogo] = useState(auth?.user?.logo_url)
  const [ formObject, setFormObject ] = useState(initialFormObject)
  const [ formHelperObject, setFormHelperObject ] = useState(initialFormHelperObject)
  const [selectedFile, setSelectedFile] = useState()
  const [preview, setPreview] = useState()

  const handleFormObjectChange = (inputKey, inputNewValue) => {
    setFormObject(current => {
      return {
        ...current,
        [inputKey]: inputNewValue,
      }
    })
  }

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined)
      return
    }

    const objectUrl = URL.createObjectURL(selectedFile)
    setPreview(objectUrl)

    return () => URL.revokeObjectURL(objectUrl)
  }, [selectedFile])

  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined)
      return
    }

    setSelectedFile(e.target.files[0])
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
    // USER INPUTS ARE VALID
    else {
      const abortController = new AbortController()

      if (selectedFile){
        const response = await getMediaPresignedUrl(abortController.signal, {
          filename: selectedFile.name
        }, selectedFile)

        const resultEditProfile = await putEditProfile(
          abortController.signal,
          {
            fullname: formObject.fullName,
            phone: formObject.phoneNumber,
            organization_name: formObject.organizationName,
            logo_file_id: response.data.value.fileId,
          },
          axiosPrivate,
        )
          
        // REDIRECT THE USER IF SUCCESSFULLY CALLING THE API
        if (didSuccessfullyCallTheApi(resultEditProfile.status)) {            
          setSnackbarObject({
            open: true,
            severity: 'success',
            title: '',
            message: 'Profile changed successfully',
          })
        }
        // SHOW AN ERROR MESSAGE IF UNSUCCESSFULLY CALLING THE API
        else if (
          !wasRequestCanceled(response?.status) && 
          !wasAccessTokenExpired(response.status) &&
          !wasRequestCanceled(resultEditProfile?.status) && 
          !wasAccessTokenExpired(resultEditProfile.status)
        ) {
          setSnackbarObject(getDefaultErrorMessage(resultEditProfile))
        }
          
        abortController.abort()
          
      } 
      else {
        const resultEditProfile = await putEditProfile(
          abortController.signal,
          {
            fullname: formObject.fullName,
            phone: formObject.phoneNumber,
            organization_name: formObject.organizationName,
            logo_file_id: null,
          },
          axiosPrivate,
        )
  
        // REDIRECT THE USER IF SUCCESSFULLY CALLING THE API
        if (didSuccessfullyCallTheApi(resultEditProfile.status)) {
          setSnackbarObject({
            open: true,
            severity: 'success',
            title: '',
            message: 'Profile changed successfully',
          })
        }
        // SHOW AN ERROR MESSAGE IF UNSUCCESSFULLY CALLING THE API
        else if (!wasRequestCanceled(resultEditProfile?.status) && !wasAccessTokenExpired(resultEditProfile.status)) {
          setSnackbarObject(getDefaultErrorMessage(resultEditProfile))
        }
  
        abortController.abort()
      }
    }

    setIsLoading(false)
  }

  return (
    <form
      onSubmit={handleFormButtonClick}
      className={layoutClasses.form}
    >
      {/* FULL NAME FORM */}
      <FormControl 
        variant='outlined' 
        fullWidth
        error={formHelperObject.fullName}
        color='secondary'
      >
        <InputLabel>
          Full Name
        </InputLabel>
        
        <OutlinedInput
          autoFocus
          type='text'
          value={formObject.fullName}
          onChange={(event) => handleFormObjectChange('fullName', event.target.value)}
          label='Full Name'
        />

        <FormHelperText>
          {formHelperObject.fullName}
        </FormHelperText>
      </FormControl>

      {/* ORGANIZATION NAME FORM */}
      <FormControl 
        variant='outlined' 
        fullWidth
        error={formHelperObject.organizationName}
        color='secondary'
      >
        <InputLabel>
          Organization Name
        </InputLabel>
        
        <OutlinedInput
          type='text'
          value={formObject.organizationName}
          onChange={(event) => handleFormObjectChange('organizationName', event.target.value)}
          label='Organization Name'
        />

        <FormHelperText>
          {formHelperObject.organizationName}
        </FormHelperText>
      </FormControl>

      {/* EMAIL FORM */}
      <FormControl 
        variant='outlined' 
        fullWidth
        error={formHelperObject.email}
        color='secondary'
        disabled
      >
        <InputLabel>
          Email
        </InputLabel>
        
        <OutlinedInput
          type='email'
          value={formObject.email}
          label='Email'
        />

        <FormHelperText>
          {formHelperObject.email}
        </FormHelperText>
      </FormControl>

          
      {/* PHONE NUMBER FORM */}
      <FormControl 
        variant='outlined' 
        fullWidth
        error={formHelperObject.phoneNumber}
        color='secondary'
      >
        <InputLabel>
          Phone Number
        </InputLabel>
        
        <OutlinedInput
          type='number'
          value={formObject.phoneNumber}
          onChange={(event) => handleFormObjectChange('phoneNumber', event.target.value)}
          label='Phone Number'
        />

        <FormHelperText>
          {formHelperObject.phoneNumber}
        </FormHelperText>
      </FormControl>

      <Typography className={`${classes.infoLogo} ${classes.dashboardLogoInfo}`}>
        Dashboard Logo
      </Typography>
      <Stack direction={'row'}>
        <Box className={classes.boxAddLogo}>
          {selectedFile &&  <img src={preview} className={classes.imagePreview} alt='' /> }
          {initialLogo && !selectedFile &&  <img src={initialLogo} className={classes.imagePreview} alt='' /> }
          {!selectedFile && !initialLogo && <IconAdd className={classes.iconAddLogo} />}
        </Box>
        <Stack>
          <Typography className={classes.infoLogo}>
            Optimal size 512 x 112 pixels<br/>
            File size: Maximum 512kb<br/>
            Allowed file extensions: JPG, JPEG, PNG
          </Typography>
          <Stack>
            {/* UPLOAD LOGO BUTTON */}
            <Button
              variant='text'
              startIcon={<IconUpload />}
              className={classes.buttonUpload}
              onClick={() => document.getElementById('logo-upload').click()}
            >
              Upload Logo
            </Button>
            <Input
              id='logo-upload'
              accept='image/*'
              type='file'
              className='displayNone'
              sx={{display: 'none'}}
              onChange={onSelectFile}
            />
          </Stack>
        </Stack>
      </Stack>

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

export default UpdateProfile