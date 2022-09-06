import { useState } from 'react'

// COMPONENTS
import TabProperties from './TabProperties'

// MUIS
import Stack from '@mui/material/Stack'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'

// MUI ICONS
import IconSettingsSuggest from '@mui/icons-material/SettingsSuggest'
import IconSmartphone from '@mui/icons-material/Smartphone'

// STYLES
import useStyles from './tabPropertiesPreviewUseStyles'

const TabPropertiesPreview = () => {
  // STYLES
  const classes = useStyles()

  // TAB
  const [tabPosition, setTabPosition] = useState(0)
  
  return (
    <Stack flex={1}>
      {/* TABS */}
      <Tabs
        value={tabPosition}
        onChange={(event, newValue) => setTabPosition(newValue)}
        className={classes.tabCustom}
      >
        <Tab icon={<IconSettingsSuggest />} iconPosition='start' label='Properties' />
        <Tab icon={<IconSmartphone />} iconPosition='start' label='Preview' />
      </Tabs>

      {/* TAB PROPERTIES */}
      {tabPosition === 0 && (
        <TabProperties />
      )}
    </Stack>
  )
}

export default TabPropertiesPreview