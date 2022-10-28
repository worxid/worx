// CONTEXTS
import { PageFormsCreateOrEditContextProvider } from 'contexts/PageFormsCreateOrEditContext'
import { PrivateLayoutContextProvider } from 'contexts/PrivateLayoutContext'

// PAGES
import AuthenticationFinish from 'pages/AuthenticationFinish/AuthenticationFinish'
import Devices from 'pages/Devices/Devices'
import Error from 'pages/Error'
import FillForm from 'pages/FillForm/FillForm'
import ForgotPassword from 'pages/ForgotPassword/ForgotPassword'
import Forms from 'pages/Forms/Forms'
import FormsCreateOrEdit from 'pages/FormsCreateOrEdit/FormsCreateOrEdit'
import FormsSubmissions from 'pages/FormsSubmissions/FormsSubmissions'
import FormsView from 'pages/FormsView/FormsView'
import Groups from 'pages/Groups/Groups'
import Home from 'pages/Home/Home'
import ResetPassword from 'pages/ResetPassword/ResetPassword'
import SignIn from 'pages/SignIn/SignIn'
import SignUp from 'pages/SignUp/SignUp'


const routes = [
  // AUTHENTICATION
  {
    path: '/forgot-password',
    element: <ForgotPassword/>,
    routeType: 'authentication',
  },
  {
    path: '/reset-password',
    element: <ResetPassword/>,
    routeType: 'authentication',
  },
  {
    path: '/sign-in',
    element: <SignIn/>,
    routeType: 'authentication',
  },
  {
    path: '/sign-up',
    element: <SignUp/>,
    routeType: 'authentication',
  },
  {
    path: '/authentication-finish',
    element: <AuthenticationFinish/>,
    routeType: 'authentication',
  },
  // PRIVATE
  {
    path: '/',
    element: <Home/>,
    routeType: 'private',
  },
  {
    path: '/forms',
    element: <Forms/>,
    routeType: 'private',
  },
  {
    path: '/forms/edit/:formTemplateId',
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
    path: '/groups',
    element: <Groups/>,
    routeType: 'private',
  },
  // FREE
  {
    path: '/fill-form',
    element: (
      <PrivateLayoutContextProvider>
        <FillForm />
      </PrivateLayoutContextProvider>
    ),
    routeType: 'free'
  },
  {
    path: '/error',
    element: <Error />,
    routeType: 'free',
  },
]

export default routes