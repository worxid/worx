import { useContext } from 'react'
import PropTypes from 'prop-types'

// CONTEXTS
import { PrivateLayoutContext } from 'contexts/PrivateLayoutContext'

// MUIS
import Backdrop from '@mui/material/Backdrop'
import Slide from '@mui/material/Slide'
import Stack from '@mui/material/Stack'

// MUI ICONS
import IconClose from '@mui/icons-material/Close'

// STYLES
import useStyles from './flyoutUseStyles'

const positionList = [ 'left', 'right' ]

const Flyout = (props) => {
  const {
    children,
    className,
    position,
    width,
    onCloseButtonClick,
  } = props

  const { 
    pageRef, 
    isFlyoutOpen,
  } = useContext(PrivateLayoutContext)

  const classes = useStyles()

  const getSlideDirection = (inputPosition) => {
    if (inputPosition === positionList[0]) return positionList[1]
    else if (inputPosition === positionList[1]) return positionList[0]
  }

  return (
    <Backdrop
      open={isFlyoutOpen}
      className={classes.root}
    >
      <Slide 
        direction={getSlideDirection(position)} 
        in={isFlyoutOpen} 
        container={pageRef.current}
      >
        <Stack 
          className={`${classes.contentContainer} ${className}`}
          direction='row'
          sx={{ right: position === positionList[1] ? 0 : 'unset' }}
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
          <Stack 
            className={classes.childrenContainer}
            sx={{ width }}
          >
            {children}
          </Stack>
        </Stack>
      </Slide>
    </Backdrop>
  )
}

Flyout.defaultProps = {
  className: '',
  position: positionList[0],
  width: 500,
}

Flyout.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string.isRequired,
  position: PropTypes.oneOf(positionList).isRequired,
  width: PropTypes.number.isRequired,
  onCloseButtonClick: PropTypes.func,
}

export default Flyout