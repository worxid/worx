import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'

// ASSETS
import LogoFavicon from 'assets/images/logos/favicon.png'

// COMPONENTS
import AuthenticationRoute from 'components/Routes/AuthenticationRoute'
import PrivateRoute from 'components/Routes/PrivateRoute'

// ROUTES
import routes from 'routes/routes'

const App = () => {
  const getRouteComponent = (inputItem) => {
    if (inputItem.routeType === 'authentication') {
      return (
        <AuthenticationRoute>
          {inputItem.element}
        </AuthenticationRoute>
      )
    }
    else if (inputItem.routeType === 'private') {
      return (
        <PrivateRoute>
          {inputItem.element}
        </PrivateRoute>
      )
    }
    else if (inputItem.routeType === 'free') return inputItem.element
  }

  // CHANGE THE FAVICON
  useEffect(() => {
    const faviconElement = document.getElementById('favicon')
    faviconElement.href = LogoFavicon
  }, [])

  return (
    <Routes>
      {routes.map((item, index) => (
        <Route 
          key={index}
          path={item.path} 
          element={getRouteComponent(item)}
        />
      ))}
    </Routes>
  )
}

export default App
