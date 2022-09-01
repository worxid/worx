import { useContext } from 'react'
import { Navigate } from 'react-router-dom'

// CONTEXTS
import { AllPagesContext } from 'contexts/AllPagesContext'
import { PrivateLayoutContextProvider } from 'contexts/PrivateLayoutContext'

// LAYOUT
import Private from 'layouts/Private/Private'

// UTILITIES
import { isObjectEmpty } from 'utilities/validation'

function PrivateRoute(props) {
  const { children } = props

  const { auth } = useContext(AllPagesContext)

  return (
    !auth ?
      <Navigate 
        replace 
        to='/sign-in'
      /> :
      <PrivateLayoutContextProvider>
        <Private>   
          {children}
        </Private> 
      </PrivateLayoutContextProvider> 
  )
}

export default PrivateRoute
