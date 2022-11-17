// MUIS
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
  leftPanelContainer: {
    width: 200,
    paddingRight: 24,
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  leftPanelItemButton: {
    padding: '8px 0px 7px 24px',
    height: 34.5,
    borderLeft: '4px solid transparent',
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
  },
  leftPanelItemButtonActive: {
    borderLeftColor: theme.palette.primary.main,
  },
  leftPanelItemText: {
    color: theme.palette.text.secondary,
    '& .MuiTypography-root': {
      fontSize: 13,
    },
  },
  leftPanelItemDivider: {
    marginLeft: 28,
  },
  rightPanelContainer: {
    padding: '19px 24px 24px',
  },
  title: {
    color: theme.palette.text.secondary,
    fontWeight: 600,
  },
  dateAndTimeInputContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 16,
  },
  dateAndTimeInput: {
    marginRight: 12,
    color: theme.palette.text.primary,
    fontWeight: 600,
    fontSize: 14,
    flex: 1,
  },
  dateAndTimeSelect: {
    marginRight: 12,
    flex: 1,
    '& .MuiSelect-select': {
      color: theme.palette.text.primary,
      fontWeight: 600,
      fontSize: 14,
    },
    '&:last-child': {
      marginRight: 0,
    },
  },
  startAndEndDivider: {
    width: 12,
    height: 2,
    marginRight: 12,
    backgroundColor: theme.palette.action.active,
  },
  dateRangePicker: {
    // "& .MuiTypography-root": {
    //   fontSize: 14,
    //   fontWeight: 600,
    //   width: 32,
    //   margin: 0,
    // },
    // "& .MuiDateRangePickerDay-root": {
    //   width: 32,
    //   height: 32,
    // },
    // "& .MuiButtonBase-root": {
    //   width: 28,
    //   height: 28,
    // },
  },
  countDays: {
    marginRight: 'auto',
    fontSize: 12,
    color: theme.palette.text.secondary,
  },
  actionButton: {
    marginLeft: 20,
    fontWeight: 600,
    width: 88,
  },
}))

export default useStyles
