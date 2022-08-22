import { useContext } from 'react'
import { Navigate } from 'react-router-dom'

// CONTEXTS
import { AllPagesContext } from 'contexts/AllPagesContext'

// LAYOUTS
import AuthenticationFull from 'layouts/AuthenticationFull/AuthenticationFull'
import AuthenticationHalf from 'layouts/AuthenticationHalf/AuthenticationHalf'

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
      <AuthenticationHalf>
        {children}
      </AuthenticationHalf>
    )
    else if (inputType === 'full') return (
      <AuthenticationFull>
        {children}
      </AuthenticationFull>
    )
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
