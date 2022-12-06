import { createContext, useState, useRef } from 'react'

// UTILITIES
import { readDrawerStateFromLocalStorage } from 'utilities/localStorage'

const PrivateLayoutContext = createContext()

const PrivateLayoutContextProvider = (props) => {
  // DIALOG ADD OR EDIT
  const pageRef = useRef()
  const [ isDialogAddOrEditOpen, setIsDialogAddOrEditOpen ] = useState(false)
  
  // DIALOG FORM
  const [ isDialogFormOpen, setIsDialogFormOpen ] = useState(false)

  // DRAWER
  const [ drawerState, setDrawerState ] = useState(readDrawerStateFromLocalStorage())

  return (
    <PrivateLayoutContext.Provider
      value={{
        // APP BAR
        isDialogAddOrEditOpen, setIsDialogAddOrEditOpen,
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