import { useContext } from 'react'
import React from 'react'
import PropTypes from 'prop-types'

// CONTEXTS
import { PrivateLayoutContext } from 'contexts/PrivateLayoutContext'

// MUIS
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'

// STYLES
import useLayoutStyles from 'styles/layoutPrivate'

const DialogForm = (props) => {
  const layoutClasses = useLayoutStyles()

  const {
    title,
    children,
    dialogAction,
    classNames
  } = props

  const { isDialogFormOpen, setIsDialogFormOpen } = useContext(PrivateLayoutContext)

  const handleDialogClose = () => setIsDialogFormOpen(false)

  return (
    <Dialog
      open={isDialogFormOpen}
      onClose={handleDialogClose}
      className={`${layoutClasses.dialogForm} ${classNames}`}
    >
      {/* TITLE */}
      <DialogTitle className={layoutClasses.dialogFormTitle}>
        {title}
      </DialogTitle>

      {/* CONTENT */}
      <DialogContent className='width100 padding0'>
        {children}
      </DialogContent>

      {/* DIALOG ACTIONS */}
      <DialogActions className={layoutClasses.dialogFormActions}>
        {dialogAction}
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
  dialogAction: PropTypes.node.isRequired,
}

export default DialogForm