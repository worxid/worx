import PropTypes from 'prop-types'

// MUIS
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

const CellDateTime = (props) => {
  const { date, time } = props

  return (
    <Stack>
      {/* DATE */}
      <Typography
        variant='body2'
        color='text.primary'
      >
        {date}
      </Typography>

      {/* TIME */}
      <Typography
        variant='caption'
        color='text.secondary'
      >
        {time}
      </Typography>
    </Stack>
  )
}

CellDateTime.defaultProps = {
  date: '',
  time: '',
}

CellDateTime.propTypes = {
  date: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
}

export default CellDateTime