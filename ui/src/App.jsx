import { Suspense, useEffect, useContext } from 'react'
import { Routes, Route } from 'react-router-dom'

// ASSETS
import LogoProductLogoOnly from 'assets/images/logos/product-logo-only.svg'

// COMPONENTS
import AuthenticationRoute from 'components/Routes/AuthenticationRoute'
import FillForm from 'layouts/FillForm/FillForm'
import PrivateRoute from 'components/Routes/PrivateRoute'
import Snackbar from 'components/Snackbar/Snackbar'

// CONTEXTS
import { AllPagesContext } from 'contexts/AllPagesContext'

// ROUTES
import routes from 'routes/routes'

const App = () => {
  const { snackbarObject, setSnackbarObject } = useContext(AllPagesContext)

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
    else if (inputItem.routeType === 'fillForm') {
      return (
        <FillForm>
          {inputItem.element}
        </FillForm>
      )
    }
    else if (inputItem.routeType === 'free') return inputItem.element
  }

  // CHANGE THE FAVICON
  useEffect(() => {
    const faviconElement = document.getElementById('favicon')
    faviconElement.href = LogoProductLogoOnly
  }, [])

  return (
    <Suspense fallback={<div/>}>
      <Routes>
        {routes.map((item, index) => (
          <Route 
            key={index}
            path={item.path} 
            element={getRouteComponent(item)}
          />
        ))}
      </Routes>

      {/* SNACKBAR */}
      <Snackbar
        open={snackbarObject.open}
        setToast={setSnackbarObject}
        severity={snackbarObject.severity}
        title={snackbarObject.title}
        message={snackbarObject.message}
      />
    </Suspense>
  )
}

export default App
