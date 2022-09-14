import PropTypes from 'prop-types'

// MUIS
import Avatar from '@mui/material/Avatar'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

// STYLES
import useLayoutStyles from 'styles/layoutPrivate'

const DataGridRenderCell = (props) => {
  const { dataValue } = props

  const layoutClasses = useLayoutStyles()

  return (
    <Stack direction='row' alignItems={'center'}>
      <Typography variant='inherit'>
        {dataValue[0]}{dataValue.length > 1 ? `, ${dataValue[1]}` : ''}&nbsp;
      </Typography>
      {
        dataValue.length > 2 && (
          <Avatar className={layoutClasses.avatar} variant='square'>
            +{dataValue.length - 2}
          </Avatar>
        )
      }
    </Stack>
  )
}

DataGridRenderCell.defaultProps = {
  dataValue: [],
}

DataGridRenderCell.propTypes = {
  dataValue: PropTypes.array.isRequired,
}

export default DataGridRenderCell