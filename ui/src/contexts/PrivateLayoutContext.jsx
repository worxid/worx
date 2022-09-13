import { createContext, useState, useRef } from 'react'

const PrivateLayoutContext = createContext()

const PrivateLayoutContextProvider = (props) => {
  // DIALOG ADD OR EDIT
  const pageRef = useRef()
  const [ isDialogAddOrEditOpen, setIsDialogAddOrEditOpen ] = useState(false)
  
  // DIALOG FORM
  const [ isDialogFormOpen, setIsDialogFormOpen ] = useState(false)

  // DRAWER
  const [ isDrawerExpanded, setIsDrawerExpanded ] = useState(true) // BOOLEAN

  return (
    <PrivateLayoutContext.Provider
      value={{
        // APP BAR
        isDialogAddOrEditOpen, setIsDialogAddOrEditOpen,
        // DRAWER
        isDrawerExpanded, setIsDrawerExpanded,
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