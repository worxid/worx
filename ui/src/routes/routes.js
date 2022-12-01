import { lazy } from 'react'

// CONTEXTS
import { PageFormsCreateOrEditContextProvider } from 'contexts/PageFormsCreateOrEditContext'
import { PrivateLayoutContextProvider } from 'contexts/PrivateLayoutContext'

// PAGES
const AuthenticationFinish = lazy(() => import('pages/AuthenticationFinish/AuthenticationFinish'))
const Devices = lazy(() => import('pages/Devices/Devices'))
const Error = lazy(() => import('pages/Error'))
const FillForm = lazy(() => import('pages/FillForm/FillForm'))
const FillFormFinish = lazy(() => import('pages/FillFormFinish/FillFormFinish'))
const ForgotPassword = lazy(() => import('pages/ForgotPassword/ForgotPassword'))
const Forms = lazy(() => import('pages/Forms/Forms'))
const FormsCreateOrEdit = lazy(() => import('pages/FormsCreateOrEdit/FormsCreateOrEdit'))
const FormsSubmissions = lazy(() => import('pages/FormsSubmissions/FormsSubmissions'))
const FormsSubmissionsDetail = lazy(() => import('pages/FormsSubmissionsDetail/FormsSubmissionsDetail'))
const Groups = lazy(() => import('pages/Groups/Groups'))
const Home = lazy(() => import('pages/Home/Home'))
const ResetPassword = lazy(() => import('pages/ResetPassword/ResetPassword'))
const Settings = lazy(() => import('pages/Settings/Settings'))
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
    path: '/forms/submission-detail',
    element: <FormsSubmissionsDetail/>,
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