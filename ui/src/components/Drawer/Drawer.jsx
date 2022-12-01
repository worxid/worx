import { Fragment, useState, useContext } from 'react'
import { useLocation } from 'react-router-dom'

// ASSETS
import LogoProduct from 'assets/images/logos/product-logo-with-text-white.svg'

// COMPONENTS
import DialogConfirmation from 'components/DialogConfirmation/DialogConfirmation'
import NavigationTooltip from './NavigationTooltip'

// CONTEXTS
import { AllPagesContext } from 'contexts/AllPagesContext'
import { PrivateLayoutContext } from 'contexts/PrivateLayoutContext'

// CUSTOM COMPONENTS
import CustomDrawer, { DrawerHeader } from 'components/Customs/CustomDrawer'

// DATA
import { 
  bottomNavigationList,
  drawerNavigationList, 
} from './drawerNavigationList'

// MUIS
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Typography from '@mui/material/Typography'

// MUI ICONS
import IconAccountCircle from '@mui/icons-material/AccountCircle'
import IconArrowDropDown from '@mui/icons-material/ArrowDropDown'
import IconArrowDropUp from '@mui/icons-material/ArrowDropUp'
import IconCircle from '@mui/icons-material/Circle'
import IconContentCopy from '@mui/icons-material/ContentCopy'
import IconMenuOpen from '@mui/icons-material/MenuOpen'

// STYLES
import useStyles from './drawerUseStyles'

// UTILTIIES
import { signOutUser } from 'utilities/authentication'
import { setDrawerStateToLocalStorage } from 'utilities/localStorage'

const Drawer = () => {
  const classes = useStyles()

  const location = useLocation()

  const { 
    auth, setAuth, 
    setSnackbarObject,
  } = useContext(AllPagesContext)
  const { drawerState, setDrawerState } = useContext(PrivateLayoutContext)

  const [ dialogLogOut, setDialogLogOut ] = useState({})

  const handleIdButtonClick = () => {
    navigator.clipboard.writeText(auth?.user?.organization_code)
    
    setSnackbarObject({
      open: true,
      severity: 'info',
      title: '',
      message: 'Copied to clipboard',
    })
  }

  const getListItemButtonClassName = (inputPath) => {
    return isNavigationActive(inputPath)
      ? `${classes.navigationItem} ${classes.navigationItemActive}`
      : classes.navigationItem
  }

  const getListItemTextClassName = (inputPath) => {
    return isNavigationActive(inputPath)
      ? classes.navigationItemContentActive
      : classes.navigationItemContentInactive
  }

  const isNavigationActive = (inputPath) => {
    if (inputPath === '/' && location.pathname === '/') return true 
    else if (inputPath !== '/' && location.pathname.includes(inputPath)) return true
    else return false
  }

  const handleParentItemClick = (inputParentItem) => {
    let newDrawerState

    if (inputParentItem.type === 'single') {
      newDrawerState = {
        ...drawerState,
        lastClicked: 'parent',
      }
    }
    else if(inputParentItem.type === 'collection' && drawerState.isDrawerExpanded) {
      if (drawerState.expandParent === inputParentItem.title) {
        newDrawerState = {
          ...drawerState,
          expandParent: null,
          lastClicked: 'parent',
        }
      }
      else {
        newDrawerState = {
          ...drawerState,
          expandParent: inputParentItem.title,
          lastClicked: 'parent',
        }
      }
    }

    setDrawerStateToLocalStorage(newDrawerState)
    setDrawerState(newDrawerState)
  }

  const handleChildrenItemClick = (inputEvent, inputChildrenItem) => {
    if (inputChildrenItem.title === 'Log Out') signOutUser(setAuth)
    else {
      const newDrawerState = {
        ...drawerState,
        lastClicked: 'children',
      }
      
      setDrawerStateToLocalStorage(newDrawerState)
      setDrawerState(newDrawerState)
    }
  }

  const handleToggleDrawerIconClick = () => {
    const newDrawerState = {
      ...drawerState,
      isDrawerExpanded: !drawerState.isDrawerExpanded,
    }

    setDrawerStateToLocalStorage(newDrawerState)
    setDrawerState(newDrawerState)
  }

  return (
    <CustomDrawer 
      variant='permanent' 
      open={drawerState.isDrawerExpanded}
      className='zoom'
    >
      {/* HEADER */}
      <DrawerHeader>
        {/* TOGGEL DRAWER ICON */}
        <IconButton   
          className={`${classes.headerIconToggle} no-zoom`}
          onClick={handleToggleDrawerIconClick}
        >
          <IconMenuOpen/>
        </IconButton>
        
        {/* COMPANY LOGO */}
        {drawerState.isDrawerExpanded &&
        <Box
          component='img'
          src={LogoProduct}
          alt=''
          className={classes.headerLogoProduct}
        />}
      </DrawerHeader>

      {/* ID BUTTON */}
      <List disablePadding>
        <NavigationTooltip 
          placement='right'
          sx={drawerState.isDrawerExpanded ? { display: 'none' } : {}}
          title={
            <ListItemButton
              className={`${classes.navigationItem} ${classes.navigationTooltipItem} no-zoom`}
              onClick={handleIdButtonClick}
            >
              {/* TEXT */}
              <ListItemText primary={
                <Typography
                  variant='inherit'
                  className={`${classes.navigationItemContentInactive} zoom`}
                >
                  Code: {auth?.user?.organization_code}
                </Typography>
              }/>
            </ListItemButton>
          }
        >
          <ListItemButton 
            className={classes.navigationItem}
            onClick={handleIdButtonClick}
          >
            {/* ICON */}
            <ListItemIcon className='zoom'>
              <IconContentCopy className={`${classes.navigationItemContentInactive} no-zoom`}/>
            </ListItemIcon>

            {/* TEXT */}
            <ListItemText primary={
              <Typography
                variant='inherit'
                className={`${classes.navigationItemContentInactive} zoom`}
              >
                Code: {auth?.user?.organization_code}
              </Typography>
            }/>
          </ListItemButton>
        </NavigationTooltip>
      </List>

      {/* NAVIGATION LIST */}
      <List>
        {drawerNavigationList.map((parentItem, parentIndex) => (
          <Fragment key={parentIndex}>
            {/* EXTRA ITEMS FOR PARENT IF IT'S HOVERED AND THE DRAWER IS COLLAPSED */}
            <NavigationTooltip 
              placement='right'
              sx={drawerState.isDrawerExpanded ? { display: 'none' } : {}}
              title={
                <ListItemButton
                  href={parentItem.type === 'single' ? parentItem.path : null}
                  className={`${getListItemButtonClassName(parentItem.path)} ${classes.navigationTooltipItem} no-zoom`}
                  onClick={(event) => handleParentItemClick(parentItem)}
                >
                  {/* TEXT */}
                  <ListItemText primary={
                    <Typography
                      variant='inherit'
                      className={`${getListItemTextClassName(parentItem.path)} zoom`}
                    >
                      {parentItem.title}
                    </Typography>
                  }/>
                </ListItemButton>
              }
            >
              {/* NAVIGATION ITEM - PARENT */}
              <ListItemButton
                href={parentItem.type === 'single' ? parentItem.path : null}
                className={getListItemButtonClassName(parentItem.path)}
                onClick={(event) => handleParentItemClick(parentItem)}
              >
                {/* ICON */}
                <ListItemIcon className='zoom'>
                  <parentItem.icon className={isNavigationActive(parentItem.path)
                    ? `${classes.navigationItemContentActive} no-zoom`
                    : `${classes.navigationItemContentInactive} no-zoom`
                  }/>
                </ListItemIcon>

                {/* TEXT */}
                <ListItemText primary={
                  <Typography
                    variant='inherit'
                    className={`${getListItemTextClassName(parentItem.path)} zoom`}
                  >
                    {parentItem.title}
                  </Typography>
                }/>
                
                {/* EXPAND/COLLAPSE ICON */}
                {(parentItem.type === 'collection' && drawerState.isDrawerExpanded) &&
                (drawerState.expandParent === parentItem.text
                  ? <IconArrowDropUp className={classes.navigationItemContentInactive}/>
                  : <IconArrowDropDown className={classes.navigationItemContentInactive}/>
                )}
              </ListItemButton>
            </NavigationTooltip>

            {/* NAVIGATION ITEM - CHILDREN */}
            <Collapse 
              in={(parentItem.children && drawerState.expandParent === parentItem.title) && drawerState.isDrawerExpanded} 
              timeout='auto' 
            >
              {parentItem.children &&
              parentItem.children.map((childrenItem, childrenIndex) => (
                <ListItemButton 
                  key={childrenIndex}
                  href={childrenItem.title !== 'Log Out' ? childrenItem.path : null}
                  className={getListItemButtonClassName(childrenItem.path)}
                  onClick={(event) => handleChildrenItemClick(event, childrenItem)}
                >
                  {/* ICON */}
                  <ListItemIcon>
                    <IconCircle className={isNavigationActive(childrenItem.path)
                      ? `${classes.navigationChilrenIcon} ${classes.navigationItemContentActive}`
                      : `${classes.navigationChilrenIcon} ${classes.navigationItemContentInactive}`
                    }/>
                  </ListItemIcon>

                  {/* TEXT */}
                  <ListItemText primary={
                    <Typography
                      variant='inherit'
                      className={getListItemTextClassName(childrenItem.path)}
                    >
                      {childrenItem.title}
                    </Typography>
                  }/>
                </ListItemButton>
              ))}
            </Collapse>
          </Fragment>
        ))}
      </List>

      {/* BOTTOM NAVIGATION */}
      <List className='marginTopAuto'>
        {bottomNavigationList.map((parentItem, parentIndex) => (
          <Fragment key={parentIndex}>
            <NavigationTooltip 
              placement='right'
              sx={drawerState.isDrawerExpanded ? { display: 'none' } : {}}
              title={
                <ListItemButton
                  href={(parentItem.type === 'single' && parentItem.path) ? parentItem.path : null}
                  className={`${getListItemButtonClassName(parentItem.path)} ${classes.navigationTooltipItem} no-zoom`}
                  onClick={(event) => parentItem.title !== 'Log Out' ? handleParentItemClick(parentItem) : setDialogLogOut({ show: true })}
                >
                  {/* TEXT */}
                  <ListItemText primary={
                    <Typography
                      variant='inherit'
                      className={`${getListItemTextClassName(parentItem.path)} zoom`}
                    >
                      {parentItem.title}
                    </Typography>
                  }/>
                </ListItemButton>
              }
            >
              {/* NAVIGATION ITEM - PARENT */}
              <ListItemButton
                href={(parentItem.type === 'single' && parentItem.path) ? parentItem.path : null}
                className={getListItemButtonClassName(parentItem.path)}
                onClick={(event) => parentItem.title !== 'Log Out' ? handleParentItemClick(parentItem) : setDialogLogOut({ show: true })}
              >
                {/* ICON */}
                <ListItemIcon className='zoom'>
                  {parentItem.title !== 'Log Out' ? (
                    // LOG OUT ICON
                    <parentItem.icon className={isNavigationActive(parentItem.path)
                      ? `${classes.navigationItemContentActive} no-zoom`
                      : `${classes.navigationItemContentInactive} no-zoom`
                    }/>
                  ) : (
                    // NON-LOG OUT ICON
                    <Avatar className={classes.logOutAvatar}>
                      <IconAccountCircle 
                        fontSize='small'
                        color='primary'
                        className='no-zoom'
                      />
                    </Avatar>
                  )}
                </ListItemIcon>

                {/* TEXT */}
                <ListItemText primary={
                  <Typography
                    variant='inherit'
                    className={`${getListItemTextClassName(parentItem.path)} zoom`}
                  >
                    {parentItem.title}
                  </Typography>
                }/>
                
                {/* EXPAND/COLLAPSE ICON */}
                {(parentItem.type === 'collection' && drawerState.isDrawerExpanded) &&
                (drawerState.expandParent === parentItem.text
                  ? <IconArrowDropUp className={classes.navigationItemContentInactive}/>
                  : <IconArrowDropDown className={classes.navigationItemContentInactive}/>
                )}
              </ListItemButton>
            </NavigationTooltip>
          </Fragment>
        ))}
      </List>

      {/* DIALOG LOG OUT */}
      <DialogConfirmation
        title='Log Out'
        caption='Are you sure you want to leave this app?'
        dialogConfirmationObject={dialogLogOut}
        setDialogConfirmationObject={setDialogLogOut}
        cancelButtonText='Cancel'
        continueButtonText='Leave'
        onContinueButtonClick={() => signOutUser(setAuth)}
        onCancelButtonClick={() => setDialogLogOut({})}
      />
    </CustomDrawer>
  )
}

export default Drawer