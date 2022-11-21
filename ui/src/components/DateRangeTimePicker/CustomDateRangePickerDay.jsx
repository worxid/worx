// MUIS
import { 
  alpha,
  styled, 
} from '@mui/material/styles'
import DateRangePickerDay from '@mui/lab/DateRangePickerDay'

const selectedDayStyles = (theme) => {
  return {
    backgroundColor: 'transparent',
    color: theme.palette.text.primary,
    fontWeight: 400,
    borderRadius: 0,
    '&:hover, &:focus': {
      backgroundColor: theme.palette.action.hover,
    },
  }
}
const CustomDateRangePickerDay = styled(({ className, ...props }) => (
  <DateRangePickerDay
    className={className} 
    {...props}
  />
))(({ 
  theme,
  isHighlighting,
  isStartOfHighlighting,
  isEndOfHighlighting,
  outsideCurrentMonth,
}) => ({
  // HIGHLIGHTED
  ...(!outsideCurrentMonth && isHighlighting && {
    borderRadius: 0,
    backgroundColor: `${alpha(theme.palette.primary.main, 0.1)}`,
    color: theme.palette.text.primary,
    '&:hover, &:focus': {
      backgroundColor: `${alpha(theme.palette.primary.dark, 0.1)}`,
    },
  }),

  // HIGHLIGHTED (LEFT AND RIGHT SIDES)
  '&.MuiDateRangePickerDay-root:first-of-type, &.MuiDateRangePickerDay-root:last-of-type': {
    borderRadius: 0,
  },

  // HIGHLIGHTED (FIRST ITEM)
  ...(isStartOfHighlighting && {
    '& .MuiDateRangePickerDay-day.Mui-selected': {
      ...selectedDayStyles(theme),
      borderLeft: `8px solid ${theme.palette.primary.main}`,
    },
  }),

  // HIGHLIGHTED (LAST ITEM)
  ...(isEndOfHighlighting && {
    '& .MuiDateRangePickerDay-day.Mui-selected': {
      ...selectedDayStyles(theme),
      borderRight: `8px solid ${theme.palette.primary.main}`,
    },
  }),
}))

export default CustomDateRangePickerDay