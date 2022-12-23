import { useState, useContext } from 'react'

// COMPONENTS
import DateRangeTimePicker from 'components/DateRangeTimePicker/DateRangeTimePicker'

// CONTEXTS
import { AllPagesContext } from 'contexts/AllPagesContext'

// DATE AND TIME
import moment from 'moment'

// MUIS
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import FormControl from '@mui/material/FormControl'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import MenuItem from '@mui/material/MenuItem'
import OutlinedInput from '@mui/material/OutlinedInput'
import Select from '@mui/material/Select'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

// MUI ICONS
import IconClose from '@mui/icons-material/Close'
import IconEvent from '@mui/icons-material/Event'

// STYLES
import useLayoutStyles from 'styles/layoutPrivate'
import useStyles from './filtersUseStyles'

// UTILITIES
import { convertDate } from 'utilities/date'

const Filters = (props) => {
  const { 
    initialFilterParameters,
    filterParameters, setFilterParameters,
    formList,
    deviceList,
  } = props

  const classes = useStyles()
  const layoutClasses = useLayoutStyles()

  const { setSnackbarObject } = useContext(AllPagesContext)

  const [ isDateRangeTimePickerOpen, setIsDateRangeTimePickerOpen ] = useState(false)

  const handleSelectDateRangePickerButtonClick = (inputNewValue) => {
    const startAndEndDifference = moment(inputNewValue[1]).diff(moment(inputNewValue[0]), 'days')

    if (startAndEndDifference > 30) {
      setSnackbarObject({
        open: true,
        severity: 'warning',
        title: '',
        message: 'The maximum range is 30 days',
      })
    }
    else {
      handleFormParametersChange('startTime', inputNewValue[0])
      handleFormParametersChange('endTime', inputNewValue[1])
      setIsDateRangeTimePickerOpen(false)
    }
  }

  const handleFormParametersChange = (inputParameter, inputNewValue) => {
    setFilterParameters(current => {
      return {
        ...current,
        [inputParameter]: inputNewValue,
      }
    })
  }

  return (
    <Stack
      direction='row'
      alignItems='center'
      height='70px'
      spacing='20px'
    >
      {/* FORM FILTER */}
      <Stack
        direction='row'
        alignItems='center'
        spacing='8px'
      >
        {/* TEXT */}
        <Typography
          variant='body2'
          color='text.secondary'
          className='fontWeight600'
        >
          Form:
        </Typography>

        {/* SELECT */}
        <FormControl>
          <Select
            value={filterParameters.form}
            label=''
            onChange={(event) => handleFormParametersChange('form', event.target.value)}
            className={classes.formControlInput}
          >
            {formList.map((item, index) => (
              <MenuItem
                key={index} 
                value={item.id}
                className={classes.formControlSelectMenuItem}
              >
                <Typography
                  variant='inherit'
                  noWrap
                >
                  {item.label}
                </Typography>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>

      {/* DATE RANGE FILTER */}
      <Stack
        direction='row'
        alignItems='center'
        spacing='8px'
      >
        {/* TEXT */}
        <Typography
          variant='body2'
          color='text.secondary'
          className='fontWeight600'
        >
          Date Range:
        </Typography>

        {/* OUTLINED INPUT */}
        <FormControl>
          <OutlinedInput
            value={`${convertDate(filterParameters.startTime, 'dd/MM/yyyy')} - ${convertDate(filterParameters.endTime, 'dd/MM/yyyy')}`}
            className={`${classes.formControlInput} ${classes.formControlInputWithStartIcon}`}
            onClick={() => setIsDateRangeTimePickerOpen(true)}
            startAdornment={
              <InputAdornment position='start'>
                <IconEvent/>
              </InputAdornment>
            }
          />
        </FormControl>
      </Stack>

      {/* DEVICE FILTER */}
      <Stack
        direction='row'
        alignItems='center'
        spacing='8px'
      >
        {/* TEXT */}
        <Typography
          variant='body2'
          color='text.secondary'
          className='fontWeight600'
        >
          Device:
        </Typography>

        {/* SELECT */}
        <FormControl>
          <Select
            value={filterParameters.device}
            label=''
            onChange={(event) => handleFormParametersChange('device', event.target.value)}
            className={classes.formControlInput}
          >
            {deviceList.map((item, index) => (
              <MenuItem
                key={index} 
                value={item.id}
                className={classes.formControlSelectMenuItem}
              >
                <Typography
                  variant='inherit'
                  noWrap
                >
                  {item.label}
                </Typography>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>

      {/* RESET FILTER BUTTON */}
      <Button 
        className={classes.buttonReset}
        onClick={() => setFilterParameters(initialFilterParameters)}
      >
        Reset Filter
      </Button>

      {/* DATE RANGE TIME PICKER DIALOG */}
      <Dialog 
        open={isDateRangeTimePickerOpen}
        onClose={() => setIsDateRangeTimePickerOpen(false)} 
        className={layoutClasses.dialogDateRangePicker}
      >
        {/* HEADER */}
        <DialogTitle className={layoutClasses.dialogDateRangePickerHeader}>
          {/* TITLE */}
          <Typography variant='h6'>
            Select Period
          </Typography>

          {/* CLOSE ICON */}
          <IconButton onClick={() => setIsDateRangeTimePickerOpen(false)}>
            <IconClose/>
          </IconButton>
        </DialogTitle>

        {/* DATE RANGE TIME PICKER */}
        <DateRangeTimePicker
          value={[ filterParameters.startTime, filterParameters.endTime ]}
          dateFormat={'MM/DD/YYYY'}
          isWithTimePicker={false}
          handleSelectButtonClick={handleSelectDateRangePickerButtonClick}
          handleCancelButtonClick={() => setIsDateRangeTimePickerOpen(false)}
        />
      </Dialog>
    </Stack>
  )
}

export default Filters