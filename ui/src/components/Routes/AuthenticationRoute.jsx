import { useContext } from 'react'
import { Navigate } from 'react-router-dom'

// CONTEXTS
import { AllPagesContext } from 'contexts/AllPagesContext'

// LAYOUTS
import Authentication from 'layouts/Authentication/Authentication'

// UTILITIES
import { isObjectEmpty } from 'utilities/validation'

function AuthenticationRoute(props) {
  const { 
    children, 
    type,
  } = props

  const { auth } = useContext(AllPagesContext)

  const getAuthenticationComponent = (inputType) => {
    if (inputType === 'half') return (
      <Authentication>
        {children}
      </Authentication>
    )
    else if (inputType === 'full') return children
  }

  return (
    isObjectEmpty(auth) ? 
      getAuthenticationComponent(type) :
      <Navigate 
        replace 
        to='/home'
      />
  )
}

export default AuthenticationRoute
