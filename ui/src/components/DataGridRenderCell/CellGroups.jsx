import { useRef } from 'react'
import PropTypes from 'prop-types'

// MUIS
import Avatar from '@mui/material/Avatar'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

// STYLES
import useLayoutStyles from 'styles/layoutPrivate'

const CellGroups = (props) => {
  const { dataValue, limitShowGroup, isColumnGroup } = props
  const wrapperRef = useRef()

  const layoutClasses = useLayoutStyles()

  const calculateAndCutValue = () => {
    if(isColumnGroup && !wrapperRef.current) return ''

    const totalMaxString = wrapperRef.current?.offsetWidth / 9 // offsetWidth/9 = max limit string
    const restructureVal = dataValue?.map(item => item.name)
    const dataCutted = restructureVal?.toString()?.substring(0, totalMaxString)?.split(',')?.filter(nameGroup => {
      const isValidName = dataValue?.find(itemCheck => itemCheck.name === nameGroup)
      return Boolean(isValidName)
    })

    const maxLimitValues = isColumnGroup ? dataCutted.length : 2

    return limitShowGroup
      ? (<>
        <Typography variant='inherit'>
          {dataValue.length ? dataCutted.toString().replace(/\,/g, ', ') : 'Default'}&nbsp;
        </Typography>
        {(limitShowGroup && dataValue.length > maxLimitValues) && (
          <Avatar className={layoutClasses.avatar} variant='square'>
            +{dataValue.length - maxLimitValues}
          </Avatar>
        )}
      </>)
      : (<>
        {dataValue.length >= 1
          ? dataValue.map(item => item.name).toString().replace(/\,/g, ', ')
          : 'Default'
        }
      </>)
  }

  return (
    <Stack ref={wrapperRef} direction='row' alignItems={'center'} sx={{ width: '100%' }}>
      {calculateAndCutValue()}
    </Stack>
  )
}

CellGroups.defaultProps = {
  dataValue: [],
  limitShowGroup: true,
  isColumnGroup: false,
}

CellGroups.propTypes = {
  dataValue: PropTypes.array.isRequired,
  limitShowGroup: PropTypes.bool,
  isColumnGroup: PropTypes.bool,
}

export default CellGroups