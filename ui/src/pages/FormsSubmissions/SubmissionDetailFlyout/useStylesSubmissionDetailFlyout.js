// MUI STYLES
import { alpha } from '@mui/material/styles'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
  menuDownload: {
    '& .MuiMenuItem-root': {
      padding: '12px 16px'
    }
  },
  iconDownloadItem: {
    color: alpha(theme.palette.common.black, 0.28)
  },
  flyoutBoxInfo: {
    backgroundColor: alpha(theme.palette.common.black, 0.04),
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
      backgroundColor: alpha(theme.palette.common.black, 0.04),
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
    backgroundColor: alpha(theme.palette.common.black, 0.08),
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
  signatureBox: {
    border: `2px solid ${alpha(theme.palette.common.black, 0.26)}`,
    maxWidth: 200,
    width: '100%',
    cursor: 'pointer',
  },
  signatureText: {
    paddingLeft: 8,
    fontWeight: 400,
  },
}))

export default useStyles