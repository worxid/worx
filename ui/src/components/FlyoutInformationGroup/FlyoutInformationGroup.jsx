import PropTypes from 'prop-types'

// COMPONENTS
import CellGroups from 'components/DataGridRenderCell/CellGroups'
import FlyoutInformationItem from 'components/FlyoutInformationItem/FlyoutInformationItem'

// MUIS
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'

// MUI ICONS
import IconEdit from '@mui/icons-material/Edit'
import IconGroups from '@mui/icons-material/Groups'

const FlyoutInformationGroup = (props) => {
  const { 
    className,
    value, 
    onEditButtonClick,
  } = props
  
  return (
    <Stack
      direction='row'
      justifyContent='space-between'
      alignItems='center'
      spacing='8px'
      className={className}
    >
      {/* GROUP CHIP LIST */}
      <FlyoutInformationItem
        icon={IconGroups} 
        title='Group Names'
        value={
          <CellGroups 
            dataValue={value} 
            limitShowGroup={false}
          />
        }
      />

      {/* EDIT ICON */}
      <IconButton 
        size='small'
        onClick={onEditButtonClick}
      >
        <IconEdit fontSize='small'/>
      </IconButton>
    </Stack>
  )
}

FlyoutInformationGroup.defaultProps = {
  value: [],
  className: '',
}

FlyoutInformationGroup.propTypes = {
  value: PropTypes.array.isRequired,
  className: PropTypes.string.isRequired,
  onEditButtonClick: PropTypes.func.isRequired,
}

export default FlyoutInformationGroup