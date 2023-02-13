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
    if(limitShowGroup && wrapperRef.current) {
      const totalMaxString = wrapperRef.current?.offsetWidth / 9 // offsetWidth/9 = max limit string
      const restructureVal = dataValue?.map(item => item.name.replace(/\,/g, ';'))
      const dataCutted = isColumnGroup ? restructureVal?.toString()?.substring(0, totalMaxString)?.split(',')?.filter(nameGroup => {
        const isValidName = dataValue?.find(itemCheck => itemCheck.name.replace(/\,/g, ';') === nameGroup)
        return Boolean(isValidName)
      }) : dataValue.map(item => item.name).slice(0, 2)

      const maxLimitValues = isColumnGroup ? dataCutted.length : 2

      return (<>
        <Typography variant='inherit'>
          {dataValue.length ? dataCutted.toString().replace(/\,/g, ', ').replace(/\;/g, ',') : 'Default'}&nbsp;
        </Typography>
        {(limitShowGroup && dataValue.length > maxLimitValues) && (
          <Avatar className={layoutClasses.avatar} variant='square'>
            +{dataValue.length - maxLimitValues}
          </Avatar>
        )}
      </>)
    } else return (<>
      {dataValue.length >= 1
        ? dataValue.map(item => item.name).toString().replace(/\,/g, ', ').replace(/\;/g, ',')
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