import { useContext } from 'react'

// ASSETS
import LogoProduct from 'assets/images/logos/product-logo-with-text-white.svg'

// CONTEXTS
import { PrivateLayoutContext } from 'contexts/PrivateLayoutContext'

// CUSTOM COMPONENTS
import CustomDrawer, { DrawerHeader } from 'components/Customs/CustomDrawer'

// MUIS
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'

// MUI ICONS
import IconMenuOpen from '@mui/icons-material/MenuOpen'

// STYLES
import useStyles from './drawerUseStyles'

const Drawer = () => {
  const classes = useStyles()

  const { isDrawerExpanded, setIsDrawerExpanded } = useContext(PrivateLayoutContext)

  return (
    <CustomDrawer 
      variant='permanent' 
      open={isDrawerExpanded}
      className='zoom'
    >
      {/* HEADER */}
      <DrawerHeader>
        {/* TOGGEL DRAWER ICON */}
        <IconButton   
          className={classes.headerIconToggle}
          onClick={() => setIsDrawerExpanded(current => !current)}
        >
          <IconMenuOpen/>
        </IconButton>
        
        {/* COMPANY LOGO */}
        {isDrawerExpanded &&
        <Box
          component='img'
          src={LogoProduct}
          alt=''
          className={classes.headerLogoProduct}
        />}
      </DrawerHeader>
    </CustomDrawer>
  )
}

export default Drawer