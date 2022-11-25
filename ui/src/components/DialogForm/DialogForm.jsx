import { useContext } from 'react'
import PropTypes from 'prop-types'

// CONTEXTS
import { PrivateLayoutContext } from 'contexts/PrivateLayoutContext'

// CUSTOM COMPONENTS
import CustomDialogActionButton from 'components/Customs/CustomDialogActionButton'

// MUIS
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
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
    classNames,
    areActionsAvailable,
    onBackdropClick,
    dialogName,
    isLoading,
  } = props

  const { isDialogFormOpen, setIsDialogFormOpen } = useContext(PrivateLayoutContext)

  return (
    <Dialog
      open={(typeof isDialogFormOpen === 'string') ? isDialogFormOpen === dialogName : isDialogFormOpen}
      onClose={() => setIsDialogFormOpen(false)}
      className={`${classes.dialogForm} ${classNames}`}
      onBackdropClick={onBackdropClick}
    >
      {/* TITLE */}
      {title && (<DialogTitle className={classes.dialogFormTitle}>
        {title}
      </DialogTitle>)}

      {/* CONTENT */}
      <DialogContent className='width100 padding0'>
        {children}
      </DialogContent>

      {/* DIALOG ACTIONS */}
      {areActionsAvailable && (
        <DialogActions className={classes.dialogFormActions}>
          <CustomDialogActionButton 
            className={`${layoutClasses.dialogButton} ${layoutClasses.greyButton} fontWeight600`}
            onClick={() => handleActionButtonClick('cancel')}
          >
            Cancel
          </CustomDialogActionButton>

          <CustomDialogActionButton
            className={`${layoutClasses.dialogButton} ${layoutClasses.redButton} fontWeight600`} 
            onClick={() => handleActionButtonClick('save')}
          >
            Save
          </CustomDialogActionButton>
        </DialogActions>
      )}

      {/* LOADING */}
      {isLoading &&
      <Box className={classes.loadingContainer}>
        <CircularProgress className={classes.loading}/>
      </Box>}
    </Dialog>
  )
}

DialogForm.defaultProps = {
  title: '',
  areActionsAvailable: true,
  isLoading: false,
}

DialogForm.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  children: PropTypes.node.isRequired,
  handleActionButtonClick: PropTypes.func,
  areActionsAvailable: PropTypes.bool,
  onBackdropClick: PropTypes.func,
  dialogName: PropTypes.string,
  isLoading: PropTypes.bool,
}

export default DialogForm