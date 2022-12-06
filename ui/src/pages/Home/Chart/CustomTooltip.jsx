// MUIS
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

// MUI ICONS
import IconSquare from '@mui/icons-material/Square'

// NOTE: SOME PROPS AND STYLES DON'T WORK HERE
const CustomTooltip = (props) => {
  const { 
    xList,
    yList,
    dataPointIndex,
    theme,
    title,
  } = props

  return (
    <Stack style={{
      padding: 12,
      borderRadius: 0,
      backgroundColor: theme.palette.background.paper,
      border: `1px solid ${theme.palette.common.black}`,
      color: theme.palette.text.primary,
    }}>
      {/* X AXIS */}
      <Typography 
        variant='caption'
        style={{ marginBottom: '12px' }}
      >
        {xList[dataPointIndex]}
      </Typography>

      {/* CONTENT */}
      <Stack 
        direction='row'
        alignItems='center'
      >
        {/* ICON */}
        <IconSquare style={{
          color: theme.palette.primary.main,
          height: 8,
          width: 8,
          marginRight: 8,
        }}/>

        {/* TITLE */}
        <Typography variant='caption'>
          {`${title}: `}
        </Typography>

        {/* VALUE */}
        <Typography 
          variant='caption'
          style={{ fontWeight: 600 }}
        >
          {yList[dataPointIndex]}
        </Typography>
      </Stack>
    </Stack>
  )
}

export default CustomTooltip