// MUI ICONS
import IconAccountCircle from '@mui/icons-material/AccountCircle'
import IconDynamicForm from '@mui/icons-material/DynamicForm'
import IconHome from '@mui/icons-material/Home'
import IconSettings from '@mui/icons-material/Settings'
import IconSmartphone from '@mui/icons-material/Smartphone'

export const drawerNavigationList = [
  {
    type: 'single',
    title: 'Home',
    icon: IconHome,
    path: '/',
  },
  {
    type: 'single',
    title: 'Forms',
    icon: IconDynamicForm,
    path: '/forms',
  },
  {
    type: 'single',
    title: 'Devices',
    icon: IconSmartphone,
    path: '/devices',
  },
  {
    type: 'collection',
    title: 'Settings',
    icon: IconSettings,
    path: '/settings',
    children: [
      {
        path: '/settings/groups',
        title: 'Groups',
      },
    ],
  },
  {
    type: 'collection',
    title: 'Profile',
    icon: IconAccountCircle,
    path: '/profile',
    children: [
      {
        path: '/profile/logout',
        title: 'Log Out',
      },
    ],
  },
]
