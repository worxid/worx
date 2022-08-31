import PropTypes from 'prop-types'

// MUIS
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Paper from '@mui/material/Paper'

// STYLES
import useStyles from './loadingPaperUseStyles'

const LoadingPaper = (props) => {
  const { 
    isLoading, 
    children,
    className,
  } = props

  const classes = useStyles()

  return (
    <Paper className={`${classes.contentRoot} ${className}`}>
      {/* LOADING */}
      {isLoading &&
      <Box className={classes.loadingContainer}>
        <CircularProgress className={classes.loading}/>
      </Box>}

      {/* CHILDREN */}
      {children}
    </Paper>
  )
}

LoadingPaper.defaultProps = {
  isLoading: false,
  children: null,
  className: '',
}

LoadingPaper.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string.isRequired,
}

export default LoadingPaper