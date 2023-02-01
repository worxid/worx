import { lazy } from 'react'

// CONTEXTS
import { PageFormsCreateOrEditContextProvider } from 'contexts/PageFormsCreateOrEditContext'
import { PrivateLayoutContextProvider } from 'contexts/PrivateLayoutContext'

// PAGES (PREVENT FROM RELOADING THE PAGE AFTER THE USER CLICKS THE NAVIGATION ITEM FROM THE DRAWER COMPONENT)
import Devices from 'pages/Devices/Devices'
import Forms from 'pages/Forms/Forms'
import Groups from 'pages/Groups/Groups'
import Home from 'pages/Home/Home'
import Settings from 'pages/Settings/Settings'

// PAGES
const AuthenticationFinish = lazy(() => import('pages/AuthenticationFinish/AuthenticationFinish'))
const Error = lazy(() => import('pages/Error'))
const FillForm = lazy(() => import('pages/FillForm/FillForm'))
const FillFormFinish = lazy(() => import('pages/FillFormFinish/FillFormFinish'))
const ForgotPassword = lazy(() => import('pages/ForgotPassword/ForgotPassword'))
const FormsCreateOrEdit = lazy(() => import('pages/FormsCreateOrEdit/FormsCreateOrEdit'))
const FormsSubmissions = lazy(() => import('pages/FormsSubmissions/FormsSubmissions'))
const ResetPassword = lazy(() => import('pages/ResetPassword/ResetPassword'))
const SignIn = lazy(() => import('pages/SignIn/SignIn'))
const SignUp = lazy(() => import('pages/SignUp/SignUp'))

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
    path: '/forms/submissions/:formTemplateId',
    element: <FormsSubmissions/>,
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
  {
    path: '/settings',
    element: <Settings/>,
    routeType: 'private',
  },
  // FILL FORM
  {
    path: '/fill-form',
    element: (
      <PrivateLayoutContextProvider>
        <FillForm />
      </PrivateLayoutContextProvider>
    ),
    routeType: 'fillForm'
  },
  {
    path: '/fill-form-finish',
    element: <FillFormFinish />,
    routeType: 'fillForm'
  },
  // FREE
  {
    path: '/error',
    element: <Error />,
    routeType: 'free',
  },
]

export default routes