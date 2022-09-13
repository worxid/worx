// CONTEXTS
import { PageFormsCreateOrEditContextProvider } from 'contexts/PageFormsCreateOrEditContext'

// PAGES
import AuthenticationFinish from 'pages/AuthenticationFinish/AuthenticationFinish'
import Devices from 'pages/Devices/Devices'
import ForgotPassword from 'pages/ForgotPassword/ForgotPassword'
import Forms from 'pages/Forms/Forms'
import FormsCreateOrEdit from 'pages/FormsCreateOrEdit/FormsCreateOrEdit'
import FormsSubmissions from 'pages/FormsSubmissions/FormsSubmissions'
import FormsView from 'pages/FormsView/FormsView'
import Home from 'pages/Home/Home'
import ResetPassword from 'pages/ResetPassword/ResetPassword'
import SettingsGroup from 'pages/SettingsGroup/SettingsGroup'
import SignIn from 'pages/SignIn/SignIn'
import SignUp from 'pages/SignUp/SignUp'


const routes = [
  // AUTHENTICATION
  {
    path: '/forgot-password',
    element: <ForgotPassword/>,
    routeType: 'authentication',
    authenticationType: 'half',
  },
  {
    path: '/reset-password',
    element: <ResetPassword/>,
    routeType: 'authentication',
    authenticationType: 'half',
  },
  {
    path: '/sign-in',
    element: <SignIn/>,
    routeType: 'authentication',
    authenticationType: 'half',
  },
  {
    path: '/sign-up',
    element: <SignUp/>,
    routeType: 'authentication',
    authenticationType: 'half',
  },
  {
    path: '/authentication-finish',
    element: <AuthenticationFinish/>,
    routeType: 'authentication',
    authenticationType: 'full',
  },
  // PRIVATE
  {
    path: '/home',
    element: <Home/>,
    routeType: 'private',
  },
  {
    path: '/forms',
    element: <Forms/>,
    routeType: 'private',
  },
  {
    path: '/forms/create',
    element: (
      <PageFormsCreateOrEditContextProvider>
        <FormsCreateOrEdit />
      </PageFormsCreateOrEditContextProvider>
    ),
    routeType: 'private',
  },
  {
    path: '/forms/edit/:id',
    element: (
      <PageFormsCreateOrEditContextProvider>
        <FormsCreateOrEdit />
      </PageFormsCreateOrEditContextProvider>
    ),
    routeType: 'private',
  },
  {
    path: '/forms/:id/submissions',
    element: <FormsSubmissions/>,
    routeType: 'private',
  },
  {
    path: '/forms/:id/view',
    element: <FormsView/>,
    routeType: 'private',
  },
  {
    path: '/devices',
    element: <Devices/>,
    routeType: 'private',
  },
  {
    path: '/settings/groups',
    element: <SettingsGroup/>,
    routeType: 'private',
  },
]

export default routes