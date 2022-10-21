import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

// ASSETS
import logoWorx from 'assets/images/logos/product-logo-with-text-black.svg'

// COMPONENTS
import InputForm from './InputForm'
import LoadingPaper from 'components/LoadingPaper/LoadingPaper'

// CONSTANTS
import { dummyData } from './fillFormConstants'

// MUIS
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Link from '@mui/material/Link'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

// SERVICES
import { getReadFormTemplate } from 'services/formTemplate'

// STYLES
import useStyles from './fillFormUseStyles'
import { didSuccessfullyCallTheApi } from 'utilities/validation'

const FillForm = () => {
  // STYLES
  const classes = useStyles()

  // ROUTING
  const [ searchParams ] = useSearchParams()
  const navigate = useNavigate()

  // STATES
  const [isPageLoading, setIsPageLoading] = useState(true)
  const [dataFormTemplate, setDataFormTemplate] = useState({})
  const [formObject, setFormObject] = useState({})

  // HANDLE INPUT CHANGE
  const handleInputChange = (fieldId, fieldLabel, value) => {
    let tempFormObject = formObject

    tempFormObject[fieldId] = {
      label: fieldLabel,
      value: value,
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

  console.log({ dataFormTemplate })

  useEffect(() => {
    const abortController = new AbortController()
    fetchingFormField(abortController)

    return () => abortController.abort()
  }, [])

  return (
    <Stack direction='column' alignItems='center' className={`${classes.root} no-zoom`}>
      {/* CONTENT */}
      <LoadingPaper isLoading={isPageLoading} className={`${classes.content} zoom`}>
        {/* HEADER */}
        <Stack className={classes.header}>
          <Typography variant='h5' className='fontWeight500'>{dummyData.label}</Typography>
        </Stack>

        <Divider />

        {/* FORM */}
        <Stack className={classes.form} flex={1}>
          <Stack flex={1} height={'100%'}>
            {dataFormTemplate?.fields?.map((item, index) => (
              <InputForm
                key={index}
                item={item}
                handleInputChange={handleInputChange}
                formObject={formObject}
              />
            ))}
          </Stack>

          <Stack>
            <Button variant='contained' className={classes.buttonSubmit}>Submit</Button>
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