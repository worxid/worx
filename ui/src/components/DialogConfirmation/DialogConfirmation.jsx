import React from 'react'
import PropTypes from 'prop-types'

// CUSTOM COMPONENTS
import CustomDialogActionButton from 'components/Customs/CustomDialogActionButton'
import CustomDialogDelete from 'components/Customs/CustomDialogDelete'

// MUIS
import DialogActions from '@mui/material/DialogActions'
import Typography from '@mui/material/Typography'

// RAMDA
import { isEmpty } from 'ramda'

// STYLES
import useStyles from './dialogConfirmationUseStyles'

const DialogConfirmation = (props) => {
  const classes = useStyles()

  const {
    title,
    caption,
    dialogConfirmationObject,
    setDialogConfirmationObject,
    cancelButtonText,
    continueButtonText,
    onContinueButtonClick,
    onCancelButtonClick,
  } = props

  const handleDialogClose = (event, reason) => {
    if(reason === 'backdropClick' || reason === 'escapeKeyDown') {
      return false
    }
    else {
      setDialogConfirmationObject(false)
    }
  }

  return (
    <CustomDialogDelete
      open={!isEmpty(dialogConfirmationObject)}
      onClose={handleDialogClose}
    >
      {/* TITLE */}
      <Typography
        variant='h6'
        className={classes.title}
      >
        {title}
      </Typography>

      {/* CAPTION */}
      <Typography
        variant='body2'
        className={classes.caption}
      >
        {caption}
      </Typography>

      {/* DIALOG ACTIONS */}
      <DialogActions>
        {/* CANCEL BUTTON */}
        <CustomDialogActionButton 
          className={`${classes.dialogButton} ${classes.cancelButton}`}
          onClick={onCancelButtonClick}
        >
          {cancelButtonText}
        </CustomDialogActionButton>

        {/* DELETE BUTTON */}
        <CustomDialogActionButton className={`${classes.dialogButton} ${classes.deleteButton}`} onClick={onContinueButtonClick}>
          {continueButtonText}
        </CustomDialogActionButton>
      </DialogActions>
    </CustomDialogDelete>
  )
}

DialogConfirmation.defaultProps = {
  title: '',
  caption: '',
  dialogConfirmationObject: false,
  cancelButtonText: 'Batal',
  continueButtonText: 'Hapus',
}

DialogConfirmation.propTypes = {
  title: PropTypes.string.isRequired,
  caption: PropTypes.string.isRequired,
  dialogConfirmationObject: PropTypes.object.isRequired,
  setDialogConfirmationObject: PropTypes.func.isRequired,
  cancelButtonText: PropTypes.string.isRequired,
  continueButtonText: PropTypes.string.isRequired,
  onContinueButtonClick: PropTypes.func.isRequired,
  onCancelButtonClick: PropTypes.func.isRequired,
}

export default DialogConfirmation