import PropTypes from 'prop-types'

// MUIS
import FormControl from '@mui/material/FormControl'
import IconButton from '@mui/material/IconButton'
import Input from '@mui/material/Input'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

// MUI ICONS
import IconEdit from '@mui/icons-material/Edit'

const dialogTypeList = [ 'add', 'edit' ]

const FlyoutEditableTitle = (props) => {
  const {
    dialogType,
    titlePlaceholder,
    titleValue,
    setTitleValue,
    onInputBlur,
    isEditMode,
    setIsEditMode,
  } = props

  return (
    <>
      {(dialogType === dialogTypeList[0] || isEditMode) &&
      <FormControl 
        variant='standard' 
        className='width100'
      >
        <Input
          placeholder={titlePlaceholder}
          type='text'
          value={titleValue}
          onChange={setTitleValue}
          onBlur={onInputBlur}
        />
      </FormControl>}

      {dialogType === dialogTypeList[1] &&
      <Stack
        direction='row'
        alignItems='center'
        className='editIconContainer'
        flex={1}
        width={0}
        spacing='8px'
      >
        {/* TITLE */}
        {!isEditMode &&
        <Typography 
          variant='h6' 
          className='fontWeight500'
          noWrap
        >
          {titleValue}
        </Typography>}

        {/* EDIT ICON */}
        {!isEditMode &&
        <IconButton 
          size='small'
          className='editIcon'
          onClick={() => setIsEditMode(true)}
        >
          <IconEdit fontSize='small'/>
        </IconButton>}
      </Stack>}
    </>
  )
}

FlyoutEditableTitle.defaultProps = {
  dialogType: 'add',
  titlePlaceholder: '',
  titleValue: '',
  isEditMode: false,
}

FlyoutEditableTitle.propTypes = {
  dialogType: PropTypes.oneOf(dialogTypeList).isRequired,
  titlePlaceholder: PropTypes.string.isRequired,
  titleValue: PropTypes.string.isRequired,
  setTitleValue: PropTypes.func,
  onInputBlur: PropTypes.func,
  isEditMode: PropTypes.bool.isRequired, 
  setIsEditMode: PropTypes.func,
}

export default FlyoutEditableTitle