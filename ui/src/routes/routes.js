// PAGES
import ForgotPassword from 'pages/ForgotPassword/ForgotPassword'
import Home from 'pages/Home/Home'
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
  // PRIVATE
  {
    path: '/home',
    element: <Home/>,
    routeType: 'private',
  },
]

export default routes