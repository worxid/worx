import { useContext } from 'react'
import { Navigate } from 'react-router-dom'

// CONTEXTS
import { AllPagesContext } from 'contexts/AllPagesContext'

// LAYOUTS
import Authentication from 'layouts/Authentication/Authentication'

// UTILITIES
import { isObjectEmpty } from 'utilities/validation'

function AuthenticationRoute(props) {
  const { children } = props

  const { auth } = useContext(AllPagesContext)

  return (
    isObjectEmpty(auth) ? 
      <Authentication>
        {children}
      </Authentication> :
      <Navigate 
        replace 
        to='/'
      />
  )
}

export default AuthenticationRoute
