import { useContext } from 'react'
import PropTypes from 'prop-types'

// CONTEXTS
import { PrivateLayoutContext } from 'contexts/PrivateLayoutContext'

// MUIS
import Backdrop from '@mui/material/Backdrop'
import Slide from '@mui/material/Slide'
import Stack from '@mui/material/Stack'

// STYLES
import useStyles from './dialogAddOrEditUseStyles'

const DialogAddOrEdit = (props) => {
  const {
    children,
    className,
  } = props

  const { pageRef, isDialogAddOrEditOpen } = useContext(PrivateLayoutContext)

  const classes = useStyles()

  return (
    <Backdrop
      open={isDialogAddOrEditOpen}
      className={classes.root}
    >
      <Slide 
        direction='right' 
        in={isDialogAddOrEditOpen} 
        container={pageRef.current}
      >
        <Stack className={`${classes.contentContainer} ${className}`}>
          {children}
        </Stack>
      </Slide>
    </Backdrop>
  )
}

DialogAddOrEdit.defaultProps = {
  className: '',
}

DialogAddOrEdit.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string.isRequired,
}

export default DialogAddOrEdit