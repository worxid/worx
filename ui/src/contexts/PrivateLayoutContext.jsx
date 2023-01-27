import { createContext, useState, useRef } from 'react'

// UTILITIES
import { readDrawerStateFromLocalStorage } from 'utilities/localStorage'

const PrivateLayoutContext = createContext()

const PrivateLayoutContextProvider = (props) => {
  // DIALOG FORM
  const [ isDialogFormOpen, setIsDialogFormOpen ] = useState(false)
  
  // DRAWER
  const [ drawerState, setDrawerState ] = useState(readDrawerStateFromLocalStorage())
  
  // FLYOUT
  const pageRef = useRef()
  const [ isFlyoutOpen, setIsFlyoutOpen ] = useState(false)

  return (
    <PrivateLayoutContext.Provider
      value={{
        // APP BAR
        isFlyoutOpen, setIsFlyoutOpen,
        // DRAWER
        drawerState, setDrawerState,
        // DIALOG FORM
        isDialogFormOpen, setIsDialogFormOpen,
        // LAYOUT
        pageRef,
      }}
    >
      {props.children}
    </PrivateLayoutContext.Provider>
  )
}

export { PrivateLayoutContextProvider, PrivateLayoutContext }