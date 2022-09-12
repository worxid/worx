import { useContext } from 'react'

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
  const { selectedFieldsType } = useContext(PageFormsCreateOrEditContext)

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

        {selectedFieldsType !== 'formHeader' && (<Stack direction='row'>
          {/* BUTTON DELETE */}
          <IconButton>
            <IconDelete />
          </IconButton>

          {/* BUTTON COPY */}
          <IconButton>
            <IconContentCopy />
          </IconButton>
        </Stack>)}
      </Stack>

      {/* CONTENTS */}
      <Stack direction='column' className={`${classes.contentsProperties} overflowYauto`}>
        <FieldProperties type={selectedFieldsType} />
      </Stack>
    </Stack>
  )
}

export default TabProperties