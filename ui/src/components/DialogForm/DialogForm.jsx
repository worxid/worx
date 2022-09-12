import { useContext } from 'react'
import PropTypes from 'prop-types'

// CONTEXTS
import { PrivateLayoutContext } from 'contexts/PrivateLayoutContext'

// CUSTOM COMPONENTS
import CustomDialogActionButton from 'components/Customs/CustomDialogActionButton'

// MUIS
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'

// STYLES
import useLayoutStyles from 'styles/layoutPrivate'
import useStyles from './dialogFormUseStyles'

const DialogForm = (props) => {
  const layoutClasses = useLayoutStyles()
  const classes = useStyles()

  const {
    title,
    children,
    handleActionButtonClick,
    classNames
  } = props

  const { isDialogFormOpen, setIsDialogFormOpen } = useContext(PrivateLayoutContext)

  return (
    <Dialog
      open={isDialogFormOpen}
      onClose={() => setIsDialogFormOpen(false)}
      className={`${classes.dialogForm} ${classNames}`}
    >
      {/* TITLE */}
      <DialogTitle className={classes.dialogFormTitle}>
        {title}
      </DialogTitle>

      {/* CONTENT */}
      <DialogContent className='width100 padding0'>
        {children}
      </DialogContent>

      {/* DIALOG ACTIONS */}
      <DialogActions className={classes.dialogFormActions}>
        <CustomDialogActionButton 
          className={`${layoutClasses.dialogButton} ${layoutClasses.greyButton}`}
          onClick={() => handleActionButtonClick('cancel')}
        >
          Cancel
        </CustomDialogActionButton>

        <CustomDialogActionButton
          className={`${layoutClasses.dialogButton} ${layoutClasses.redButton}`} 
          onClick={() => handleActionButtonClick('save')}
        >
          Save
        </CustomDialogActionButton>
      </DialogActions>
    </Dialog>
  )
}

DialogForm.defaultProps = {
  title: '',
}

DialogForm.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  handleActionButtonClick: PropTypes.func.isRequired,
}

export default DialogForm