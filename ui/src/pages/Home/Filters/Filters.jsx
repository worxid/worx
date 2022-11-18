import { useState } from 'react'

// COMPONENTS
import DateRangeTimePicker from 'components/DateRangeTimePicker/DateRangeTimePicker'

// CONSTANTS
import { 
  dummyDeviceList,
  dummyFormList, 
} from './filtersConstants'

// DATE AND TIME
import moment from 'moment'

// MUIS
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import FormControl from '@mui/material/FormControl'
import InputAdornment from '@mui/material/InputAdornment'
import MenuItem from '@mui/material/MenuItem'
import OutlinedInput from '@mui/material/OutlinedInput'
import Select from '@mui/material/Select'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

// MUI ICONS
import IconEvent from '@mui/icons-material/Event'

// STYLES
import useLayoutStyles from 'styles/layoutPrivate'
import useStyles from './filtersUseStyles'

// UTILITIES
import { convertDate } from 'utilities/date'

const Filters = () => {
  const classes = useStyles()
  const layoutClasses = useLayoutStyles()

  const initialFIlterParameters = {
    form: dummyFormList[0].text,
    device: dummyDeviceList[0].text,
    startTime: moment().subtract(1, 'month').toDate(),
    endTime: moment().endOf('month').toDate(), 
  }

  const [ filterParameters, setFilterParameters ] = useState(initialFIlterParameters)
  const [ isDateRangeTimePickerOpen, setIsDateRangeTimePickerOpen ] = useState(false)

  const handleSelectDateRangePickerButtonClick = (inputNewValue) => {
    handleFormParametersChange('startTime', inputNewValue[0])
    handleFormParametersChange('endTime', inputNewValue[1])
    setIsDateRangeTimePickerOpen(false)
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
            {dummyFormList.map((item, index) => (
              <MenuItem
                key={index} 
                value={item.text}
              >
                {item.text}
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
            {dummyDeviceList.map((item, index) => (
              <MenuItem
                key={index} 
                value={item.text}
              >
                {item.text}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>

      {/* RESET FILTER BUTTON */}
      <Button 
        className={classes.buttonReset}
        onClick={() => setFilterParameters(initialFIlterParameters)}
      >
        Reset Filter
      </Button>

      {/* DATE RANGE TIME PICKER DIALOG */}
      <Dialog 
        open={isDateRangeTimePickerOpen}
        onClose={() => setIsDateRangeTimePickerOpen(false)} 
        className={layoutClasses.dialogDateRangePicker}
      >
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