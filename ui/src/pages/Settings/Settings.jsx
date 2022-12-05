import { useContext, useState } from 'react'

// COMPONENTS
import LoadingPaper from 'components/LoadingPaper/LoadingPaper'
import UpdateProfile from './Updates/UpdateProfile'
import UpdatePassword from './Updates/UpdatePassword'

// CONTEXTS
import { AllPagesContext } from 'contexts/AllPagesContext'

// MUIS
import Stack from '@mui/material/Stack'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import Typography from '@mui/material/Typography'

// MUI ICONS
import IconManageAccounts from '@mui/icons-material/ManageAccounts'
import IconPassword from '@mui/icons-material/Password'

// STYLES
import useStyles from './settingsUseStyles'


const Settings = () => {
  const classes = useStyles()

  const a11yProps = (index) => ({
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  })

  // CONTEXT
  const { breakpointType } = useContext(AllPagesContext)

  const [ currentTab, setCurrentTab ] = useState(0)
  
  return (
    <>
      {/* TITLE */}
      <Typography
        variant='h6'
        className='fontWeight500'
      >
        Personal Settings
      </Typography>
      {
        currentTab === 0 ? (
          <Typography variant='body1' className={classes.subtitle}>
            Make change to your access settings and prefences
          </Typography>
        ) : (
          <Typography variant='body1' className={classes.subtitle}>
            Make change to your password
          </Typography>
        )
      }

      {/* CONTENTS */}
      <Tabs className={classes.tabs} value={currentTab} onChange={(event, newValue) => setCurrentTab(newValue)}>
        <Tab icon={breakpointType !== 'xs' && <IconManageAccounts fontSize='small'/>} iconPosition='start' label='User Details' {...a11yProps(0)} className={classes.tab} />
        <Tab icon={breakpointType !== 'xs' && <IconPassword fontSize='small'/>} iconPosition='start' label='Password' {...a11yProps(1)} className={classes.tab} />
      </Tabs>
      <Stack 
        direction='row'
        position='relative'
        flex='1'
        height={0}
      >
        {/* MAIN CONTENT */}
        <LoadingPaper className={classes.mainContent}>
          {currentTab === 0 && (<UpdateProfile />)}
          {currentTab === 1 && (<UpdatePassword />)}
        </LoadingPaper>
      </Stack>
    </>
  )
}

export default Settings