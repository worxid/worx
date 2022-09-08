import { useContext } from 'react'

// CONTEXT
import { PageFormsCreateOrEditContext } from 'contexts/PageFormsCreateOrEditContext'

// COMPONENTS
import FieldProperties from './FieldProperties'

// MUIS
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

// STYLES
import useStyles from './tabPropertiesPreviewUseStyles'

const TabProperties = () => {
  // STYLES
  const classes = useStyles()

  // CONTEXT
  const { selectedFieldsType } = useContext(PageFormsCreateOrEditContext)

  return (
    <Stack flex={1} direction='column'>
      {/* HEADER */}
      <Stack className={classes.headerProperties}>
        <Typography variant='subtitle1'>Fields Properties</Typography>
      </Stack>

      {/* CONTENTS */}
      <Stack className={classes.contentsProperties}>
        <FieldProperties type={selectedFieldsType} />
      </Stack>
    </Stack>
  )
}

export default TabProperties