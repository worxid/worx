import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

// ASSETS
import LogoProduct from 'assets/images/logos/product-logo-with-text-white.svg'

// CONTEXTS
import { PrivateLayoutContext } from 'contexts/PrivateLayoutContext'

// CUSTOM COMPONENTS
import CustomDrawer, { DrawerHeader } from 'components/Customs/CustomDrawer'

// DATA
import { drawerNavigationList } from './drawerNavigationList'

// MUIS
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Typography from '@mui/material/Typography'

// MUI ICONS
import IconMenuOpen from '@mui/icons-material/MenuOpen'

// STYLES
import useStyles from './drawerUseStyles'

const Drawer = () => {
  const classes = useStyles()

  const navigate = useNavigate()

  const { isDrawerExpanded, setIsDrawerExpanded } = useContext(PrivateLayoutContext)

  const handleParentItemClick = (inputParentItem) => {
    navigate(inputParentItem.path)
  }

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

      {/* NAVIGATION LIST */}
      <List>
        {drawerNavigationList.map((parentItem, parentIndex) => (
          <ListItemButton
            key={parentIndex}
            className={classes.navigationItem}
            onClick={() => handleParentItemClick(parentItem)}
          >
            {/* ICON */}
            <ListItemIcon>
              <parentItem.icon className={classes.navigationItemInactive}/>
            </ListItemIcon>

            {/* TEXT */}
            <ListItemText primary={
              <Typography
                variant='inherit'
                className={classes.navigationItemInactive}
              >
                {parentItem.title}
              </Typography>
            }/>
          </ListItemButton>
        ))}
      </List>
    </CustomDrawer>
  )
}

export default Drawer