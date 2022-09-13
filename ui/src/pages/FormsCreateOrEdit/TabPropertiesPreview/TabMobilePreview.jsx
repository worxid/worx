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

const TabMobilePreview = () => {
  // STYLES
  const classes = useStyles()

  // CONTEXT
  const { formObject, listFields } = useContext(PageFormsCreateOrEditContext)

  return (
    <Stack flex={1} direction='column' alignItems='center' className='overflowYauto'>
      {/* CASE WRAPPER */}
      <Stack direction='column' alignItems='center' className={classes.caseSmartphone}>
        {/* LCD */}
        <Stack flex={1} className={classes.lcdSmartphone}>
          {/* HEADER */}
          <Stack className={classes.headerSmartphone}>
            {/* BAR */}
            <Stack direction='row' alignItems='center' className={classes.barSmartphone}>
              <Typography flex={1} variant='subtitle2'>12:30</Typography>

              <Stack direction='row'>
                <IconSignalWifi4Bar className='height16 widthAuto'/>
                
                <IconSignalCellular4Bar className='height16 widthAuto'/>
  
                <IconBatteryFull className='height16 widthAuto'/>
              </Stack>
            </Stack>

            {/* HEADER FORM */}
            <Stack direction='row' flexWrap='nowrap' alignItems='center' className={classes.headerForm}>
              <IconArrowBack />

              <Typography flex={1} variant='body1' className='textCenter'>{formObject?.label}</Typography>

              <IconRadioButtonUnchecked className={classes.iconCircle}/>
            </Stack>

            {/* DESCRIPTION */}
            {formObject?.description && (<Stack className={classes.descriptionForm}>
              <Typography variant='caption' color='text.secondary'>
                {formObject.description}
              </Typography>
            </Stack>)}
          </Stack>

          <Stack direction='column' flex={1} className={`${classes.contentSmartphone} overflowYauto`}>
            {listFields.map((item, index) => (
              <MobilePreview key={index} item={item}/>
            ))}

            <Stack flex={1} className='paddingX16'>
              <Stack flex={1}></Stack>
              <Button size='small' variant='contained'>Submit</Button>
            </Stack>
          </Stack>
        </Stack>

        {/* BUTTON */}
        <Stack className={classes.buttonSmartphone}></Stack>
      </Stack>
    </Stack>
  )
}

export default TabMobilePreview