// MUI ICONS
import IconDynamicForm from '@mui/icons-material/DynamicForm'
import IconGroups from '@mui/icons-material/Groups'
import IconHome from '@mui/icons-material/Home'
import IconLogout from '@mui/icons-material/Logout'
import IconSmartphone from '@mui/icons-material/Smartphone'
import IconSettings from '@mui/icons-material/Settings'

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
    type: 'single',
    title: 'Groups',
    icon: IconGroups,
    path: '/groups',
  },
  // {
  //   type: 'collection',
  //   title: 'Settings',
  //   icon: IconSettings,
  //   path: '/settings',
  //   children: [
  //     {
  //       path: '/settings/groups',
  //       title: 'Groups',
  //     },
  //   ],
  // },
]

export const bottomNavigationList = [
  {
    type: 'single',
    title: 'Settings',
    icon: IconSettings,
    path: '/settings',
  },
  {
    type: 'single',
    title: 'Log Out',
    icon: IconLogout,
    path: null,
  },
]