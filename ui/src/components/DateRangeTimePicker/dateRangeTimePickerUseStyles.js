// MUIS
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
  leftPanelContainer: {
    width: 200,
    padding: '8px 24px 16px 0px',
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
    borderBottom: `1px solid ${theme.palette.divider}`,
    paddingBottom: 16,
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
  countDays: {
    marginRight: 'auto',
    fontSize: 12,
    color: theme.palette.text.secondary,
  },
  actionButton: {
    marginLeft: 8,
    fontWeight: 600,
    width: 88,
    border: 'none',
    boxShadow: 'none',
    '&:hover': {
      boxShadow: 'none',
    },
  },
  actionButtonCancel: {
    color: theme.palette.text.secondary,
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))

export default useStyles
