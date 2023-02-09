import { useContext, forwardRef } from 'react'
import PropTypes from 'prop-types'

// CONTEXTS
import { PrivateLayoutContext } from 'contexts/PrivateLayoutContext'

// MUIS
import Dialog from '@mui/material/Dialog'
import Slide from '@mui/material/Slide'
import Stack from '@mui/material/Stack'

// MUI ICONS
import IconClose from '@mui/icons-material/Close'

// STYLES
import useStyles from './flyoutUseStyles'

const Transition = forwardRef(function Transition(
  props,
  ref,
) {
  return (
    <Slide 
      direction='left' 
      ref={ref} 
      {...props} 
    />
  )
})

const Flyout = (props) => {
  const {
    children,
    className,
    onCloseButtonClick,
  } = props

  const { isFlyoutOpen, setIsFlyoutOpen } = useContext(PrivateLayoutContext)

  const classes = useStyles()

  return (
    <Dialog
      open={isFlyoutOpen}
      className={`${classes.root} no-zoom`}
      TransitionComponent={Transition}
      onClose={() => setIsFlyoutOpen(false)}
    >
      <Stack 
        className={`${classes.contentContainer} zoom ${className}`}
        direction='row'
      >
        {/* CLOSE ICON */}
        <Stack 
          className={classes.closeIconContainer}
          justifyContent='center'
          alignItems='center'
          onClick={onCloseButtonClick}
        >
          <IconClose fontSize='small'/>
        </Stack>

        {/* CHILDREN */}
        <Stack className={classes.childrenContainer}>
          {children}
        </Stack>
      </Stack>
    </Dialog>
  )
}

Flyout.defaultProps = {
  className: '',
}

Flyout.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string.isRequired,
  onCloseButtonClick: PropTypes.func,
}

export default Flyout