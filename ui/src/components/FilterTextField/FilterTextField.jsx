import PropTypes from 'prop-types'

// MUIS
import TextField from '@mui/material/TextField'

// STYLES
import useStyles from './filterTextFieldUseStyles'

const FilterTextField = (props) => {
  const { 
    updateFilters, 
    ...others 
  } = props

  const classes = useStyles()

  const handleFiltersChange = (event) => {
    updateFilters((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }))
  }

  return (
    <TextField
      onChange={handleFiltersChange}
      onKeyDown={(event) => event.stopPropagation()}
      {...others}
      className={classes.root}
    />
  )
}

FilterTextField.defaultProps = {}

FilterTextField.propTypes = {
  updateFilters: PropTypes.func.isRequired,
}

export default FilterTextField
