import { Fragment, useState, useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

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
import { drawerNavigationList } from './drawerNavigationList'

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
import IconLogout from '@mui/icons-material/Logout'
import IconMenuOpen from '@mui/icons-material/MenuOpen'

// STYLES
import useStyles from './drawerUseStyles'

// UTILTIIES
import { signOutUser } from 'utilities/authentication'

const Drawer = () => {
  const classes = useStyles()

  const navigate = useNavigate()
  const location = useLocation()

  const { 
    auth, setAuth, 
    setSnackbarObject,
  } = useContext(AllPagesContext)
  const { isDrawerExpanded, setIsDrawerExpanded } = useContext(PrivateLayoutContext)

  const [ expandParent, setExpandParent ] = useState(location.state?.expandParent
    ? location.state.expandParent
    : null
  )
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

  const handleParentItemClick = (inputEvent, inputParentItem) => {
    inputEvent.preventDefault()

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

  const handleChildrenItemClick = (inputEvent, inputChildrenItem) => {
    inputEvent.preventDefault()

    if (inputChildrenItem.title === 'Log Out') signOutUser(setAuth)
    else {
      navigate(inputChildrenItem.path, {
        state: {
          expandParent,
          isDrawerExpanded, 
          lastClicked: 'children',
        },
      })
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
          className={`${classes.headerIconToggle} no-zoom`}
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

      {/* ID BUTTON */}
      <List disablePadding>
        <NavigationTooltip 
          placement='right'
          sx={isDrawerExpanded ? { display: 'none' } : {}}
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
                className={classes.navigationItemContentInactive}
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
              sx={isDrawerExpanded ? { display: 'none' } : {}}
              title={
                <ListItemButton
                  className={`${getListItemButtonClassName(parentItem.path)} ${classes.navigationTooltipItem} no-zoom`}
                  onClick={(event) => handleParentItemClick(event, parentItem)}
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
                onClick={(event) => handleParentItemClick(event, parentItem)}
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
                    className={getListItemTextClassName(parentItem.path)}
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
            </NavigationTooltip>

            {/* NAVIGATION ITEM - CHILDREN */}
            <Collapse 
              in={(parentItem.children && expandParent === parentItem.title) && isDrawerExpanded} 
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
        {/* LOGOUT BUTTON */}
        <NavigationTooltip 
          placement='right'
          sx={isDrawerExpanded ? { display: 'none' } : {}}
          title={
            <ListItemButton
              className={`${classes.navigationItem} ${classes.navigationTooltipItem} no-zoom`}
              onClick={() => setDialogLogOut({ show: true })}
            >
              {/* TEXT */}
              <ListItemText primary={
                <Typography
                  variant='inherit'
                  className={`${classes.navigationItemContentInactive} zoom`}
                >
                  Log Out
                </Typography>
              }/>
            </ListItemButton>
          }
        >
          <ListItemButton
            className={`${classes.navigationItem} ${classes.logOutItemButton}`}
            onClick={() => setDialogLogOut({ show: true })}
          >
            {/* ICON */}
            <ListItemIcon className='zoom'>
              <Avatar className={classes.logOutAvatar}>
                <IconAccountCircle 
                  fontSize='small'
                  color='primary'
                  className='no-zoom'
                />
              </Avatar>
            </ListItemIcon>

            {/* TEXT */}
            <ListItemText primary={
              <Typography
                variant='inherit'
                className={classes.navigationItemContentActive}
              >
                Log Out
              </Typography>
            }/>
            
            {/* ICON */}
            <IconLogout
              fontSize='small' 
              className={classes.navigationItemContentActive}
            />
          </ListItemButton>
        </NavigationTooltip>
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