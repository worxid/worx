import { useContext } from 'react'
import { v4 as uuid } from 'uuid'

// COMPONENTS
import FieldProperties from './FieldProperties'

// CONTEXT
import { PageFormsCreateOrEditContext } from 'contexts/PageFormsCreateOrEditContext'

// MUIS
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

// MUI ICONS
import IconContentCopy from '@mui/icons-material/ContentCopy'
import IconDelete from '@mui/icons-material/Delete'

// STYLES
import useStyles from './tabPropertiesPreviewUseStyles'

const TabProperties = () => {
  // STYLES
  const classes = useStyles()

  // CONTEXT
  const {
    selectedFieldsType, setSelectedFieldsType,
    selectedFieldsId, setSelectedFieldsId,
    listFields, setListFields, setHasFormChanged
  } = useContext(PageFormsCreateOrEditContext)

  // HANDLE DELETE ITEM FIELD CLICK
  const handleDeleteItemFieldClick = (fieldId) => {
    setHasFormChanged(true)
    setListFields(listFields.filter(item => item.id !== fieldId))
    setSelectedFieldsId('')
    setSelectedFieldsType('')
  }

  // HANDLE COPY ITEM FIELD CLICK
  const handleCopyItemFieldClick = (fieldId) => {
    const findItem = listFields.find(item => item.id === fieldId)
    const totalDuplicate = listFields.filter(item => item.duplicateFrom === fieldId)

    let tempListFields = listFields
    tempListFields.push({
      ...findItem,
      id: uuid(),
      label: `${findItem.label} copy ${totalDuplicate.length + 1}`,
      duplicateFrom: fieldId,
    })
    setHasFormChanged(true)
    setListFields([...tempListFields])
  }

  return (
    <Stack flex={1} direction='column' className='overflowYauto'>
      {/* HEADER */}
      <Stack
        direction='row'
        alignItems='center'
        sx={{
          padding: selectedFieldsType !== 'formHeader' ? '8px 24px' : '14px 24px',
        }}
      >
        <Typography flex={1} variant='subtitle1'>Fields Properties</Typography>

        {(selectedFieldsType !== 'formHeader' && selectedFieldsId) && (<Stack direction='row'>
          {/* BUTTON DELETE */}
          <IconButton onClick={() => handleDeleteItemFieldClick(selectedFieldsId)}>
            <IconDelete />
          </IconButton>

          {/* BUTTON COPY */}
          <IconButton onClick={() => handleCopyItemFieldClick(selectedFieldsId)}>
            <IconContentCopy />
          </IconButton>
        </Stack>)}
      </Stack>

      {/* CONTENTS */}
      <Stack direction='column' className={`${classes.contentsProperties} overflowYauto`}>
        <FieldProperties />
      </Stack>
    </Stack>
  )
}

export default TabProperties