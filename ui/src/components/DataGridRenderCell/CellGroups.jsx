import PropTypes from 'prop-types'

// MUIS
import Avatar from '@mui/material/Avatar'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

// STYLES
import useLayoutStyles from 'styles/layoutPrivate'

const CellGroups = (props) => {
  const { dataValue, limitShowGroup } = props

  const layoutClasses = useLayoutStyles()

  return (
    <Stack direction='row' alignItems={'center'}>
      {limitShowGroup
        ? (<>
          <Typography variant='inherit'>
            {dataValue[0]?.name || 'Default'}
            {dataValue.length >= 2 && `, ${dataValue[1]?.name}`}&nbsp;
          </Typography>
          {(limitShowGroup && dataValue.length > 2) && (
            <Avatar className={layoutClasses.avatar} variant='square'>
              +{dataValue.length - 2}
            </Avatar>
          )}
        </>)
        : (<>
          {dataValue.length >= 1
            ? dataValue.map(item => item.name).toString().replace(/\,/g, ', ')
            : 'Default'
          }
        </>)}
    </Stack>
  )
}

CellGroups.defaultProps = {
  dataValue: [],
  limitShowGroup: true,
}

CellGroups.propTypes = {
  dataValue: PropTypes.array.isRequired,
  limitShowGroup: PropTypes.bool,
}

export default CellGroups