import { Suspense, useEffect, useContext } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'

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

// SERVICES
import { getRootMetaData } from 'services/strapi/root'

// UTILITIES
import { updateMetaData } from 'utilities/dom'

const App = () => {
  const { snackbarObject, setSnackbarObject } = useContext(AllPagesContext)

  const location = useLocation()

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

  const getRootMetaDataFromAPI = async (inputIsMounted, inputAbortController) => {
    const resultMetaData = await getRootMetaData(inputAbortController.signal)
    
    if (resultMetaData.status === 200 && inputIsMounted) {
      document.getElementsByTagName('meta')['keywords'].content = resultMetaData?.data?.data?.attributes?.Keywords
    }
  }

  useEffect(() => {
    const faviconElement = document.getElementById('favicon')
    faviconElement.href = LogoProductLogoOnly

    if (location.pathname !== '/sign-up' || location.pathname !== '/sign-in') {
      updateMetaData({
        title: 'Worx',
        description: 'Worx',
      })
    }
  }, [])

  useEffect(() => {
    let isMounted = true
    const abortController = new AbortController()

    getRootMetaDataFromAPI(isMounted, abortController)

    return () => {
      isMounted = false
      abortController.abort()
    }
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
