// MUI STYLES
import { alpha } from '@mui/material/styles'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
  header: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    padding: '20px 24px',
  },
  headerLeft: {
    flex: 1,
  },
  headerRight: {
    border: `1px solid ${theme.palette.action.hover}`,
    height: 36
  },
  headerTitle: {
    fontWeight: 500,
  },
  tableFormsSubmissions: {
    '& .cell-source-custom': {
      paddingLeft: 24,
    }
  },
  buttonRedPrimary: {
    boxShadow: 'none',
    fontWeight: 400,
    fontSize: 12,
    '&:hover': {
      boxShadow: 'none'
    }
  },
  downloadMenu: {
    '& .MuiList-root': {
      padding: 0,
      width: 92,
    },
  },
  columnChip: {
    fontSize: 12,
    '&.red': {
      backgroundColor: alpha(theme.palette.primary.main, 0.2),
      color: theme.palette.primary.main,
    }
  },
  flyoutBoxInfo: {
    backgroundColor: theme.palette.background.default,
    padding: 16,
    marginBottom: 16,
  },
  flyoutInfoItem: {
    flexDirection: 'column',
    alignItems: 'start',
    padding: 0,
    marginBottom: 16,
    '&:last-child': {
      marginBottom: 0,
    }
  },
  flyoutTitleInfo: {
    color: theme.palette.text.secondary,
  },
  flyoutIconInfo: {
    color: theme.palette.text.secondary,
    fontSize: 16,
    marginRight: 4,
  },
  flyoutDescInfo: {
    fontSize: 14,
    marginTop: 4,
  },
  flyoutAnswerItem: {
    padding: 12,
    border: `1px solid ${theme.palette.action.disabled}`,
    borderRadius: 4,
    alignItems: 'flex-start',
    marginBottom: 8,
    '&.separator': {
      backgroundColor: alpha(theme.palette.common.black, 0.08),
      borderTop: `4px solid ${theme.palette.action.disabled}`,
      alignItems: 'center',
      '& .MuiListItemText-secondary': {
        display: 'none',
      }
    },
    '&:last-child': {
      marginBottom: 0,
    }
  },
  flyoutAnswerItemAvatar: {
    maxWidth: 44,
    minWidth: 44,
  },
  flyoutAnswerAvatar: {
    borderRadius: 4,
    backgroundColor: theme.palette.background.default,
    width: 28,
    height: 28,
  },
  flyoutAnswerIcon: {
    fontSize: 18,
  },
  flyoutAnswerText: {
    margin: 0,
    '& .MuiListItemText-primary': {
      color: theme.palette.text.secondary
    },
    '& .MuiListItemText-secondary': {
      marginTop: 8,
      color: theme.palette.text.primary
    }
  },
  chipAnswer: {
    margin: '0 4px 4px 4px'
  },
  ratingAnswer: {
    '& .MuiRating-icon': {
      marginRight: 4,
      fontSize: 24,
    }
  },
  listFileItem: {
    padding: 0,
    width: '100%',
    cursor: 'pointer',
  },
  listFileAvatar: {
    color: theme.palette.text.secondary,
    maxWidth: 73,
  },
  listFileIcon: {
    height: 48,
    width: 44,
  },
  listFileItemText: {
    '& .MuiListItemText-primary': {
      color: theme.palette.text.primary
    }
  },
  columnsMenuRoot: {
    '& .MuiList-root': {
      padding: '12px 4px',
    },
  },
  signatureBox: {
    border: `2px solid ${alpha(theme.palette.common.black, 0.26)}`,
    maxWidth: 200,
    width: '100%',
    cursor: 'pointer',
  },
  signatureText: {
    paddingLeft: 8,
    fontWeight: 400,
  }
}))

export default useStyles