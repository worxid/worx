import { useState, useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

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
import IconArrowDropDown from '@mui/icons-material/ArrowDropDown'
import IconArrowDropUp from '@mui/icons-material/ArrowDropUp'
import IconMenuOpen from '@mui/icons-material/MenuOpen'

// STYLES
import useStyles from './drawerUseStyles'

const Drawer = () => {
  const classes = useStyles()

  const navigate = useNavigate()
  const location = useLocation()

  const { isDrawerExpanded, setIsDrawerExpanded } = useContext(PrivateLayoutContext)

  const [ expandParent, setExpandParent ] = useState(location.state?.expandParent
    ? location.state.expandParent
    : null
  )

  const isNavigationActive = (inputPath) => {
    if (location.pathname.includes(inputPath)) return true
    else return false
  }

  const handleParentItemClick = (inputParentItem) => {
    if (inputParentItem.type === 'single') {
      navigate(inputParentItem.path, {
        state: {
          expandParent: null,
          isDrawerExpanded,
          lastClicked: 'parent',
        },
      })
    }
    else if(inputParentItem.type === 'collection' && isDrawerExpanded) {
      if (expandParent === inputParentItem.title) setExpandParent(null)
      else setExpandParent(inputParentItem.title)
    }
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
            className={isNavigationActive(parentItem.path)
              ? `${classes.navigationItem} ${classes.navigationItemActive}`
              : classes.navigationItem
            }
            onClick={() => handleParentItemClick(parentItem)}
          >
            {/* ICON */}
            <ListItemIcon>
              <parentItem.icon className={isNavigationActive(parentItem.path)
                ? classes.navigationItemContentActive
                : classes.navigationItemContentInactive
              }/>
            </ListItemIcon>

            {/* TEXT */}
            <ListItemText primary={
              <Typography
                variant='body2'
                className={isNavigationActive(parentItem.path)
                  ? classes.navigationItemContentActive
                  : classes.navigationItemContentInactive
                }
              >
                {parentItem.title}
              </Typography>
            }/>
            
            {/* EXPAND/COLLAPSE ICON */}
            {(parentItem.type === 'collection' && isDrawerExpanded) &&
            (expandParent === parentItem.text
              ? <IconArrowDropUp className={classes.navigationItemContentInactive}/>
              : <IconArrowDropDown className={classes.navigationItemContentInactive}/>
            )}
          </ListItemButton>
        ))}
      </List>
    </CustomDrawer>
  )
}

export default Drawer