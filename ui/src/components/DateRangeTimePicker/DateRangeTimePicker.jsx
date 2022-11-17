import { Fragment, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

// DATA
import { 
  dateRangeList, 
  timeOptionList, 
} from './dateRangeTimePickerData'

// MUIS
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import FormControl from '@mui/material/FormControl'
import Input from '@mui/material/Input'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

// MUI DATE PICKERS
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import StaticDateRangePicker from '@mui/lab/StaticDateRangePicker'

// STYLES
import useStyles from './dateRangeTimePickerUseStyles'

const DateRangeTimePicker = (props) => {
  const {
    value,
    dateFormat,
    timeFormat,
    isWithTimePicker,
    handleSelectButtonClick,
    handleCancelButtonClick,
  } = props

  const classes = useStyles()

  const initialStartDateInput = value && value[0] ? moment(value[0]).format(dateFormat) : ''
  const initialStartTimeInput = value && value[0] ? moment(value[0]).format(timeFormat) : ''
  const initialEndDateInput = value && value[0] ? moment(value[1]).format(dateFormat) : ''
  const initialEndTimeInput = value && value[0] ? moment(value[1]).format(timeFormat) : ''

  const [ tempValue, setTempValue ] = useState(value ? value : [null, null])
  const [ startDateInput, setStartDateInput ] = useState(initialStartDateInput)
  const [ startTimeInput, setStartTimeInput ] = useState(initialStartTimeInput)
  const [ endDateInput, setEndDateInput ] = useState(initialEndDateInput)
  const [ endTimeInput, setEndTimeInput ] = useState(initialEndTimeInput)
  const [ selectedDateRangeItem, setSelectedDateRangeItem ] = useState(null)
  const [ countDays, setCountDays ] = useState(0)
  const [ key, setKey ] = useState(0)

  const getSelectedDays = () => {
    if (countDays) {
      if (countDays === 1) return 'Selected 1 day'
      else return `Selected ${countDays} days`
    } 
    else return 'Selected 0 days'
  }

  const handleDateRangePickerChange = (inputNewValue) => {
    setTempValue(inputNewValue)

    setStartDateInput(moment(inputNewValue[0]).format(dateFormat))
    setStartTimeInput(moment(inputNewValue[0]).format(timeFormat))
    setEndDateInput(moment(inputNewValue[1]).format(dateFormat))
    setEndTimeInput(moment(inputNewValue[1]).format(timeFormat))
  }

  const handleDateRangeItemClick = (inputItem, inputIndex) => {
    let startDate
    let endDate

    if (inputItem === 'Yesterday') {
      startDate = moment().subtract(1, 'days').startOf('days').toDate()
      endDate = moment().subtract(1, 'days').endOf('days').toDate()
    } 
    else if (inputItem === 'Last week') {
      startDate = moment().subtract(1, 'weeks').startOf('week').toDate()
      endDate = moment().subtract(1, 'weeks').endOf('week').toDate()
    } 
    else if (inputItem === 'Last month') {
      startDate = moment().subtract(1, 'months').startOf('months').toDate()
      endDate = moment().subtract(1, 'months').endOf('months').toDate()
    } 
    else if (inputItem === 'Today') {
      startDate = moment().startOf('day').toDate()
      endDate = moment().endOf('day').toDate()
    } 
    else if (inputItem === 'This week') {
      startDate = moment().startOf('week').toDate()
      endDate = moment().endOf('week').toDate()
    } 
    else if (inputItem === 'This month') {
      startDate = moment().startOf('month').toDate()
      endDate = moment().endOf('month').toDate()
    } 
    else if (inputItem === 'Tomorrow') {
      startDate = moment().add(1, 'days').startOf('days').toDate()
      endDate = moment().add(1, 'days').endOf('days').toDate()
    } 
    else if (inputItem === 'Next week') {
      startDate = moment().add(1, 'weeks').startOf('weeks').toDate()
      endDate = moment().add(1, 'weeks').endOf('weeks').toDate()
    } 
    else if (inputItem === 'Next month') {
      startDate = moment().add(1, 'months').startOf('months').toDate()
      endDate = moment().add(1, 'months').endOf('months').toDate()
    }

    setSelectedDateRangeItem(inputItem)
    setTempValue([startDate, endDate])

    setStartDateInput(moment(startDate).format(dateFormat))
    setStartTimeInput(moment(startDate).format(timeFormat))
    setEndDateInput(moment(endDate).format(dateFormat))
    setEndTimeInput(moment(endDate).format(timeFormat))

    setKey((current) => current + 1)
  }

  const onStartDateInputChange = (inputValue) => {
    setSelectedDateRangeItem(null)
    setStartDateInput(inputValue)

    if (moment(inputValue, dateFormat, true).isValid()) {
      setTempValue((current) => [moment(inputValue).toDate(), current[1]])
    }

    setKey((current) => current + 1)
  }

  const onStartTimeInputChange = (inputValue) => {
    setSelectedDateRangeItem(null)
    setStartTimeInput(inputValue)

    const inputValueInMoment = moment(inputValue, timeFormat)

    if (moment(inputValue, timeFormat, true).isValid()) {
      setTempValue((current) => [
        moment(current[0])
          .set({
            hour: inputValueInMoment.get('hour'),
            minute: inputValueInMoment.get('minute'),
            second: inputValueInMoment.get('second')
          })
          .toDate(),
        current[1]
      ])
    }

    setKey((current) => current + 1)
  }

  const onEndDateInputChange = (inputValue) => {
    setSelectedDateRangeItem(null)
    setEndDateInput(inputValue)

    if (moment(inputValue, dateFormat, true).isValid()) {
      setTempValue((current) => [current[0], moment(inputValue).toDate()])
    }

    setKey((current) => current + 1)
  }

  const onEndTimeInputChange = (inputValue) => {
    setSelectedDateRangeItem(null)
    setEndTimeInput(inputValue)

    const inputValueInMoment = moment(inputValue, timeFormat)

    if (moment(inputValue, timeFormat, true).isValid()) {
      setTempValue((current) => [
        current[0],
        moment(current[1])
          .set({
            hour: inputValueInMoment.get('hour'),
            minute: inputValueInMoment.get('minute'),
            second: inputValueInMoment.get('second')
          })
          .toDate()
      ])
    }

    setKey((current) => current + 1)
  }

  useEffect(() => {
    setCountDays(moment(tempValue[1]).diff(tempValue[0], 'days') + 1)
  }, [
    tempValue[0],
    tempValue[1],
    startDateInput,
    startTimeInput,
    endDateInput,
    endTimeInput
  ])

  return (
    <Stack direction='row'>
      {/* LEFT PANEL */}
      <Box className={classes.leftPanelContainer}>
        {dateRangeList.map((dateRangeType, dateRangeTypeIndex) => (
          <Fragment key={dateRangeTypeIndex}>
            <List>
              {dateRangeType.map((item, index) => (
                <ListItemButton
                  key={index}
                  onClick={() => handleDateRangeItemClick(item, index)}
                  className={
                    selectedDateRangeItem === item
                      ? `${classes.leftPanelItemButton} ${classes.leftPanelItemButtonActive}`
                      : classes.leftPanelItemButton
                  }
                >
                  <ListItemText
                    primary={item}
                    className={classes.leftPanelItemText}
                  />
                </ListItemButton>
              ))}
            </List>

            {dateRangeTypeIndex !== dateRangeList.length - 1 &&
            <Divider className={classes.leftPanelItemDivider}/>}
          </Fragment>
        ))}
      </Box>

      {/* RIGHT PANEL */}
      <Box className={classes.rightPanelContainer}>
        {/* TITLE */}
        <Typography variant='subtitle2' className={classes.title}>
          Date range:
        </Typography>

        {/* DATE AND TIME PICKERS */}
        {isWithTimePicker && (
          <Box className={classes.dateAndTimeInputContainer}>
            {/* START DATE */}
            <Input
              className={classes.dateAndTimeInput}
              value={startDateInput}
              onChange={(event) => onStartDateInputChange(event.target.value)}
            />

            {/* START TIME */}
            <FormControl
              variant='standard'
              className={classes.dateAndTimeSelect}
            >
              <Select
                value={startTimeInput}
                onChange={(event) => onStartTimeInputChange(event.target.value)}
              >
                {timeOptionList.map((item, index) => (
                  <MenuItem key={index} value={item.time}>
                    {item.text}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* START AND END DATE DIVIDER */}
            <Box className={classes.startAndEndDivider} />

            {/* END DATE */}
            <Input
              className={classes.dateAndTimeInput}
              value={endDateInput}
              onChange={(event) => onEndDateInputChange(event.target.value)}
            />

            {/* END TIME */}
            <FormControl
              variant='standard'
              className={classes.dateAndTimeSelect}
            >
              <Select
                value={endTimeInput}
                onChange={(event) => onEndTimeInputChange(event.target.value)}
              >
                {timeOptionList.map((item, index) => (
                  <MenuItem key={index} value={item.time}>
                    {item.text}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        )}

        {/* CALENDAR */}
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <StaticDateRangePicker
            key={key}
            className={classes.dateRangePicker}
            displayStaticWrapperAs='desktop'
            // value={value}
            value={tempValue}
            onChange={(newValue) => handleDateRangePickerChange(newValue)}
            renderInput={(startProps, endProps) => (
              <>
                <TextField {...startProps} />
                <Box sx={{ mx: 2 }}> to </Box>
                <TextField {...endProps} />
              </>
            )}
          />
        </LocalizationProvider>

        {/* ACTIONS */}
        <Stack 
          direction='row'
          alignItems='center'
        >
          {/* COUNT DAYS */}
          <Typography variant='subtitle2' className={classes.countDays}>
            {getSelectedDays()}
          </Typography>

          {/* SELECT BUTTON */}
          <Button
            onClick={() => handleSelectButtonClick(tempValue)}
            className={classes.actionButton}
          >
            Select
          </Button>

          {/* CANCEL BUTTON */}
          <Button
            onClick={handleCancelButtonClick}
            className={`${classes.actionButton} colorActionActive`}
          >
            Cancel
          </Button>
        </Stack>
      </Box>
    </Stack>
  )
}

DateRangeTimePicker.defaultProps = {
  dateFormat: 'MM/DD/YYYY',
  timeFormat: 'HH:mm:ss',
  isWithTimePicker: true,
}

DateRangeTimePicker.propTypes = {
  // TO DO: FIX THIS PROP LATER (THE VALUE PROP SHOULD READ FOR ARRAY WITH THE LENGTH EQUALS 2)
  value: PropTypes.array.isRequired,
  dateFormat: PropTypes.string,
  timeFormat: PropTypes.string,
  isWithTimePicker: PropTypes.bool,
  handleSelectButtonClick: PropTypes.func.isRequired,
  handleCancelButtonClick: PropTypes.func.isRequired,
}

export default DateRangeTimePicker