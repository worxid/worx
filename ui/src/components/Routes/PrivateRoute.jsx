import { useContext } from 'react'
import { Navigate } from 'react-router-dom'

// CONTEXTS
import { AllPagesContext } from 'contexts/AllPagesContext'

// LAYOUT
import Private from 'layouts/Private/Private'

// UTILITIES
import { isObjectEmpty } from 'utilities/validation'

function PrivateRoute(props) {
  const { children } = props

  const { auth } = useContext(AllPagesContext)

  return (
    isObjectEmpty(auth) ?
      <Navigate 
        replace 
        to='/sign-in'
      /> :
      <Private>   
        {children}
      </Private> 
  )
}

export default PrivateRoute
