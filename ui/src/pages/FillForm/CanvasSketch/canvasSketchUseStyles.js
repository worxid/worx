// MUI STYLES
import { alpha } from '@mui/material/styles'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 32,
  },
  canvas: {
    position: 'relative',
  },
  listActionButton: {
    marginTop: 32,
    '& button': {
      marginRight: 12,
      '&:last-child': {
        marginRight: 0,
      }
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
    width: '100%',
    '&.buttonColor': {
      height: 44,
      maxWidth: 128,
    },
    '&.buttonStroke': {
      height: 44,
      maxWidth: 132,
    },
    '&.buttonAddImage': {
      height: 44,
      maxWidth: 112,
    },
    '&:hover': {
      backgroundColor: alpha(theme.palette.primary.main, 0.1),
      boxShadow: 'none'
    },
  },
  speedDial: {
    position: 'absolute',
    bottom: 12,
    left: 8,
    '&.canvasTool': {
      right: 8,
      left: 'unset',
      '& .MuiFab-root': {
        margin: '6px 6px',
      },
    },
    '& .MuiSpeedDial-actions': {
      marginBottom: 0,
      paddingBottom: 0,
    },
    '& .MuiFab-root': {
      borderRadius: '100%',
      boxShadow: 'none',
      border: `1px solid ${theme.palette.text.secondary}`,
      height: 24,
      minHeight: 24,
      width: 24,
      padding: 0,
      margin: '6px 6px',
    },
    '& .MuiSpeedDialAction-staticTooltip': {
      display: 'none'
    },
    '& .MuiSvgIcon-root': {
      fontSize: 14,
    },
  },
  buttonSave: {
    position: 'absolute',
    right: 8,
    top: 8,
    zIndex: 2,
    backgroundColor: 'transparent',
    boxShadow: 'none',
    height: 44,
    fontSize: 12,
    fontWeight: 400,
    maxWidth: 100,
    border: 'none',
    '&:hover': {
      backgroundColor: 'transparent',
      boxShadow: 'none',
    }
  }
}))

export default useStyles