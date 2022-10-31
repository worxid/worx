import { useContext, useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

// ASSETS
import logoWorx from 'assets/images/logos/product-logo-with-text-black.svg'

// COMPONENTS
import InputForm from './InputForm'
import LoadingPaper from 'components/LoadingPaper/LoadingPaper'

// CONTEXTS
import { AllPagesContext } from 'contexts/AllPagesContext'

// CONSTANTS
import { structureErrorMessage, structureParamsValuesCheckbox } from './fillFormConstants'

// MUIS
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Link from '@mui/material/Link'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

// SERVICES
import { getReadFormTemplate } from 'services/formTemplate'
import { postSubmitFormSubmission } from 'services/form'

// STYLES
import useStyles from './fillFormUseStyles'

// UTILITIES
import { didSuccessfullyCallTheApi } from 'utilities/validation'

const FillForm = () => {
  // STYLES
  const classes = useStyles()

  // CONTEXTS
  const { setSnackbarObject } = useContext(AllPagesContext)

  // ROUTING
  const [ searchParams ] = useSearchParams()
  const navigate = useNavigate()

  // STATES
  const [isPageLoading, setIsPageLoading] = useState(true)
  const [dataFormTemplate, setDataFormTemplate] = useState({})
  const [formObject, setFormObject] = useState({})
  const [formObjectError, setFormObjectError] = useState({})
  const [currentLatLng, setCurrentLatLng] = useState({ lat: 0, lng: 0 })

  // HANDLE INPUT CHANGE
  const handleInputChange = (fieldId, type, keyValue, value) => {
    let tempFormObject = formObject

    tempFormObject[fieldId] = {
      ...tempFormObject[fieldId],
      type,
      [keyValue]: value
    }

    setFormObject({...tempFormObject})
  }

  // FETCHING FORM FIELDS
  const fetchingFormField = async (abortController) => {
    const response = await getReadFormTemplate(searchParams.get('code'), abortController.signal)
    if (didSuccessfullyCallTheApi(response.status)) {
      setDataFormTemplate(response.data.value)
      setIsPageLoading(false)
    } else {
      navigate('/error?code=404')
    }
  }

  // HANDLE SUBMIT SUBMISSION
  const handleSubmitSubmission = async () => {
    setIsPageLoading(true)
    const abortController = new AbortController()
    let tempFormObject = formObject

    // RESTRUCTURE PHOTO & FILES PARAM
    for (let key of Object.keys(formObject)) {
      if (formObject[key].type === 'photo' || formObject[key].type === 'file') {
        if (formObject[key]?.values) {
          tempFormObject[key]['file_ids'] = formObject[key]?.values.map((item) => item.idFile)
        }
      }
    }

    const params = {
      label: dataFormTemplate.label,
      description: dataFormTemplate.description,
      fields: dataFormTemplate.fields,
      values: tempFormObject,
      template_id: dataFormTemplate.id,
      submit_in_zone: false,
      submit_location: {
        address: '',
        ...currentLatLng,
      }
    }
    
    const response = await postSubmitFormSubmission(abortController.signal, params)

    if(didSuccessfullyCallTheApi(response?.status)) {
      setSnackbarObject({
        open: true,
        severity:'success',
        title: '',
        message: 'Form has been submitted',
      })

      // CLEAR MESSAGE ERROR
      setFormObjectError(structureErrorMessage(dataFormTemplate.fields))
    } else if(response?.data?.error?.details) {
      // HANDLE ERROR MESSAGE
      let tempErrorMessage = formObjectError
      for(let keys of Object.keys(tempErrorMessage)) {
        const findError = response.data.error.details.find(item => item.field_id === keys)
        if(Boolean(findError)) tempErrorMessage[keys] = findError.description
        else tempErrorMessage[keys] = ''
      }
      setFormObjectError(tempErrorMessage)
    } else {
      setSnackbarObject({
        open: true,
        severity:'error',
        title: response?.data?.error?.status?.replaceAll('_', ' ') || '',
        message: response?.data?.error?.message || 'Something gone wrong',
      })
    }

    setIsPageLoading(false)
  }

  useEffect(() => {
    const abortController = new AbortController()
    fetchingFormField(abortController)

    // GET LAT LNG
    navigator.geolocation.getCurrentPosition((position) => {
      setCurrentLatLng({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      })
    })
    return () => abortController.abort()
  }, [])

  useEffect(() => {
    if(dataFormTemplate?.fields) {
      setFormObject(structureParamsValuesCheckbox(dataFormTemplate.fields))
      setFormObjectError(structureErrorMessage(dataFormTemplate.fields))
    }
  }, [dataFormTemplate])

  return (
    <Stack direction='column' alignItems='center' className={`${classes.root} no-zoom`}>
      {/* CONTENT */}
      <LoadingPaper isLoading={isPageLoading} className={`${classes.content} zoom`}>
        {/* HEADER */}
        <Stack className={classes.header}>
          <Typography variant='h5' className='fontWeight500'>{dataFormTemplate.label}</Typography>
          {dataFormTemplate.description && (
            <Typography className={classes.headerDescription} color='text.secondary' variant='body2'>{dataFormTemplate.description}</Typography>
          )}
        </Stack>

        <Divider />

        {/* FORM */}
        <Stack className={classes.form} flex={1} component='form'>
          <Stack flex={1} height={'100%'}>
            {dataFormTemplate?.fields?.map(item => (
              <InputForm
                key={item.id}
                item={item}
                handleInputChange={handleInputChange}
                formObject={formObject}
                formObjectError={formObjectError}
                setFormObjectError={setFormObjectError}
              />
            ))}
          </Stack>

          <Stack>
            <Button onClick={() => handleSubmitSubmission()} variant='contained' className={classes.buttonSubmit}>Submit</Button>
          </Stack>
        </Stack>
      </LoadingPaper>

      {/* FOOTER */}
      <Stack className={`${classes.footer} zoom`} direction='row' alignItems='center'>
        <Stack flex={1}>
          <Link href='/'>
            <Box
              component='img'
              src={logoWorx}
              className={classes.footerLogo}
            />
          </Link>
        </Stack>

        <Typography
          variant='caption'
          color='text.secondary'
          className={classes.footerDescription}
        >
          Now create your own form - Free!
        </Typography>

        <Button
          variant='contained'
          size='small'
          className={`${classes.buttonRedPrimary} buttonGetStarted heightFitContent`}
          href='/sign-up'
        >
          Get Started
        </Button>
      </Stack>
    </Stack>
  )
}

export default FillForm