import { createContext, useState } from 'react'

const PrivateLayoutContext = createContext()

const PrivateLayoutContextProvider = (props) => {
  // DRAWER
  const [ isDrawerExpanded, setIsDrawerExpanded ] = useState(true) // BOOLEAN

  return (
    <PrivateLayoutContext.Provider
      value={{
        // DRAWER
        isDrawerExpanded, setIsDrawerExpanded,
      }}
    >
      {props.children}
    </PrivateLayoutContext.Provider>
  )
}

export { PrivateLayoutContextProvider, PrivateLayoutContext }