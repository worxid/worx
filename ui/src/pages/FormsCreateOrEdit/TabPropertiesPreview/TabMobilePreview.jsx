import { useContext } from 'react'

// COMPONENTS
import MobilePreview from './MobilePreview'

// CONTEXT
import { PageFormsCreateOrEditContext } from 'contexts/PageFormsCreateOrEditContext'

// MUIS
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

// MUI ICONS
import IconArrowBack from '@mui/icons-material/ArrowBack'
import IconBatteryFull from '@mui/icons-material/BatteryFull'
import IconRadioButtonUnchecked from '@mui/icons-material/RadioButtonUnchecked'
import IconSignalCellular4Bar from '@mui/icons-material/SignalCellular4Bar'
import IconSignalWifi4Bar from '@mui/icons-material/SignalWifi4Bar'

// STYLES
import useStyles from './tabPropertiesPreviewUseStyles'
import { ThemeProvider } from '@mui/material/styles'

// THEME
import themeMobilePreview from './themeMobilePreview'

const TabMobilePreview = () => {
  // STYLES
  const classes = useStyles()

  // CONTEXT
  const { formObject, listFields } = useContext(PageFormsCreateOrEditContext)

  return (
    <ThemeProvider theme={themeMobilePreview}>
      <Stack flex={1} direction='column' alignItems='center' className='overflowYauto'>
        {/* CASE WRAPPER */}
        <Stack direction='column' alignItems='center' className={classes.caseSmartphone}>
          {/* LCD */}
          <Stack flex={1} className={classes.lcdSmartphone}>
            {/* HEADER */}
            <Stack className={classes.headerSmartphone}>
              {/* BAR */}
              <Stack direction='row' alignItems='center' className={classes.barSmartphone}>
                <Typography flex={1} variant='caption'>12:30</Typography>

                <Stack direction='row'>
                  <IconSignalWifi4Bar className={classes.iconBar}/>
                
                  <IconSignalCellular4Bar className={classes.iconBar}/>
  
                  <IconBatteryFull className={classes.iconBar}/>
                </Stack>
              </Stack>

              {/* HEADER FORM */}
              <Stack direction='row' flexWrap='nowrap' alignItems='center' className={classes.headerForm}>
                <IconArrowBack fontSize='small'/>

                <Typography flex={1} variant='caption' className={`${classes.labelHeaderForm} displayBlock`} noWrap>{formObject?.label}</Typography>

                <IconRadioButtonUnchecked className={classes.iconCircle} fontSize='small'/>
              </Stack>

              {/* DESCRIPTION */}
              {formObject?.description && (<Stack className={classes.descriptionForm}>
                <Typography variant='caption' className='displayBlock' color='text.secondary' noWrap>
                  {formObject.description}
                </Typography>
              </Stack>)}
            </Stack>

            <Stack direction='column' flex={1} className={`${classes.contentSmartphone} overflowYauto overflowXhidden`}>
              {listFields.map((item, index) => (
                <MobilePreview key={index} item={item}/>
              ))}

              <Stack flex={1} className={classes.buttonSubmitWrapper}>
                <Stack flex={1}></Stack>
                <Button size='small' variant='contained' className='heightFitContent'>Submit</Button>
              </Stack>
            </Stack>
          </Stack>

          {/* BUTTON */}
          <Stack className={classes.buttonSmartphone}></Stack>
        </Stack>
      </Stack>
    </ThemeProvider>
  )
}

export default TabMobilePreview