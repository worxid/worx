import { useState } from 'react'

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
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

// STYLES
import useStyles from './fillFormUseStyles'

const FillForm = () => {
  // STYLES
  const classes = useStyles()

  // FORM
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

  return (
    <Stack direction='column' alignItems='center' className={`${classes.root} no-zoom`}>
      {/* CONTENT */}
      <LoadingPaper className={classes.content}>
        {/* HEADER */}
        <Stack className={classes.header}>
          <Typography variant='h5' className='fontWeight500'>{dummyData.label}</Typography>
        </Stack>

        <Divider />

        {/* FORM */}
        <Stack className={classes.form} flex={1}>
          <Stack flex={1} height={'100%'}>
            {dummyData.listFields.map((item, index) => (
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
      <Stack className={classes.footer} direction='row' alignItems='center'>
        <Stack flex={1}>
          <Box
            component='img'
            src={logoWorx}
            className={classes.footerLogo}
          />
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