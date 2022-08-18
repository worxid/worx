import { Routes, Route } from 'react-router-dom'

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
