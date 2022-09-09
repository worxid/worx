import { createContext, useState, useRef } from 'react'

const PrivateLayoutContext = createContext()

const PrivateLayoutContextProvider = (props) => {
  // DIALOG ADD OR EDIT
  const pageRef = useRef()
  const [ isDialogAddOrEditOpen, setIsDialogAddOrEditOpen ] = useState(false)
  const [ dataDialogEdit, setDataDialogEdit ] = useState(null)
      
  // DRAWER
  const [ isDrawerExpanded, setIsDrawerExpanded ] = useState(true) // BOOLEAN

  return (
    <PrivateLayoutContext.Provider
      value={{
        // APP BAR
        isDialogAddOrEditOpen, setIsDialogAddOrEditOpen,
        // DRAWER
        isDrawerExpanded, setIsDrawerExpanded,
        // DATA
        dataDialogEdit, setDataDialogEdit,
        // LAYOUT
        pageRef,
      }}
    >
      {props.children}
    </PrivateLayoutContext.Provider>
  )
}

export { PrivateLayoutContextProvider, PrivateLayoutContext }