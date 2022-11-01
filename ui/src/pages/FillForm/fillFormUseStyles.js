// MUI STYLES
import { alpha } from '@mui/material/styles'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    padding: '32px 0',
    [theme.breakpoints.down('sm')]: {
      padding: '12px 0'
    }
  },
  header: {
    padding: '8px 12px',
    margin: '0 32px 24px 32px',
    borderLeft: `2px solid ${theme.palette.primary.main}`,
    [theme.breakpoints.down('md')]: {
      margin: '0 8px 12px 8px',
    }
  },
  headerDescription: {
    marginTop: 4,
  },
  form: {
    padding: '0 32px',
    height: '100%',
    [theme.breakpoints.down('md')]: {
      padding: '0 8px',
    }
  },
  formLabelWrap: {
    marginBottom: 8,
  },
  formControl: {
    maxWidth: 328,
    '& .MuiFormControlLabel-label': {
      fontSize: 12,
    },
    '& .MuiInputLabel-root': {
      fontSize: 12,
    },
    '& .MuiRating-icon': {
      marginRight: 4,
    },
    '& .MuiInputBase-input': {
      fontSize: 12,
    }
  },
  dividerFormControl: {
    marginTop: 32,
    [theme.breakpoints.down('md')]: {
      marginTop: 12,
    }
  },
  separatorType: {
    borderWidth: 4,
    marginBottom: 32,
    marginLeft: -32,
    marginRight: -32,
    backgroundColor: theme.palette.background.default,
    [theme.breakpoints.down('md')]: {
      marginBottom: 12,
      marginLeft: -8,
      marginRight: -8,
    }
  },
  datePicker: {
    '& .MuiButton-root': {
      padding: 0,
      boxShadow: 'none'
    }
  },
  buttonRedPrimary: {
    backgroundColor: alpha(theme.palette.primary.main, 0.1),
    boxShadow: 'none',
    border: 'none',
    borderRadius: 4,
    color: theme.palette.primary.main,
    fontWeight: 400,
    fontSize: 12,
    '&.buttonCamera': {
      marginRight: 20,
    },
    '&.buttonDateRange': {
      marginLeft: 12,
    },
    '&.buttonAddSiganture': {
      maxWidth: 160,
    },
    '&.buttonAddFile': {
      maxWidth: 100,
    },
    '&:hover': {
      backgroundColor: alpha(theme.palette.primary.main, 0.1),
      boxShadow: 'none'
    },
    [theme.breakpoints.down('md')]: {
      '&.buttonGetStarted': {
        padding: '0 12px'
      }
    }
  },
  signatureCanvas: {
    border: `2px solid ${theme.palette.common.black}`,
    height: 200,
  },
  dialogSignature: {
    '& .MuiPaper-root': {
      width: 380,
      height: 'auto !important',
    },
    [theme.breakpoints.down('sm')]: {
      '& .MuiPaper-root': {
        maxWidth: '100%',
        width: '100%',
        height: '100vh !important',
        margin: 0,
        maxHeight: '100%',
      }
    }
  },
  dialogSignatureContent: {
    padding: '0 12px 12px 12px',
  },
  signatureImage: {
    maxWidth: 224,
    width: '100%',
    border: `2px solid ${theme.palette.common.black}`,
    marginRight: 20,
  },
  listFile: {
    marginBottom: 12,
  },
  listItem: {
    padding: 0,
  },
  listFileAvatar: {
    color: theme.palette.text.secondary,
    maxWidth: 73,
  },
  listFileIcon: {
    height: 55,
    width: 47,
  },
  listItemText: {
    margin : 0,
    paddingLeft: 8,
    flex: 1,
    '& .MuiListItemText-primary': {
      color: theme.palette.text.secondary,
      fontSize: 12,
      display: 'block',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
    },
    '& .MuiListItemText-secondary': {
      color: theme.palette.text.secondary,
      fontSize: 12,
      display: 'block',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      overflow: 'hidden'
    }
  },
  listImage: {
    width: 48,
    height: 48,
    objectFit: 'cover'
  },
  buttonSubmit: {
    maxWidth: 328,
    marginTop: 32,
    fontWeight: 400,
    [theme.breakpoints.down('md')]: {
      marginTop: 12,
    }
  },
  actionCalendar: {
    '& .MuiButton-root': {
      boxShadow: 'unset',
      border: 'none',
      padding: 0,
    }
  },
  formHelperText: {
    marginTop: 4,
  },
  buttonDeleteSignature: {
    width: '50%',
    backgroundColor: alpha(theme.palette.common.white, 0.1),
    color: theme.palette.text.secondary,
    fontWeight: 500,
    marginRight: 8,
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.34),
    }
  },
  buttonSaveSignature: {
    width: '50%',
    fontWeight: 500,
    marginLeft: 8,
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 2,
    backgroundColor: alpha(theme.palette.common.white, 0.7),
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    borderRadius: 'inherit',
  },
  loading: {
    width: '48px !important',
    height: '48px !important',
  }
}))

export default useStyles