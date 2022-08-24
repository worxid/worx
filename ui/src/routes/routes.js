// PAGES
import ForgotPassword from 'pages/ForgotPassword/ForgotPassword'
import Home from 'pages/Home/Home'
import ResetPassword from 'pages/ResetPassword/ResetPassword'
import ResetPasswordFinish from 'pages/ResetPasswordFinish/ResetPasswordFinish'
import SignIn from 'pages/SignIn/SignIn'
import SignUp from 'pages/SignUp/SignUp'
import SignUpFinish from 'pages/SignUpFinish/SignUpFinish'

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
    path: '/reset-password-finish',
    element: <ResetPasswordFinish/>,
    routeType: 'authentication',
    authenticationType: 'full',
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
    path: '/sign-up-finish',
    element: <SignUpFinish/>,
    routeType: 'authentication',
    authenticationType: 'full',
  },
  // PRIVATE
  {
    path: '/home',
    element: <Home/>,
    routeType: 'private',
  },
]

export default routes