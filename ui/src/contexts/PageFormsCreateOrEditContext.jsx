import { createContext, useState } from 'react'

// CONSTANTS
import { dataListComponents } from 'pages/FormsCreateOrEdit/formsCreateOrEditConstants'

const PageFormsCreateOrEditContext = createContext()

const PageFormsCreateOrEditContextProvider = (props) => {
  // BOOLEAN
  const [isFormLoading, setIsFormLoading] = useState(false)
  // DRAG AND DROP
  const [listFields, setListFields] = useState([])
  const [listToolbox, setListToolbox] = useState(dataListComponents)
  const [selectedFields, setSelectedFields] = useState('')

  return (
    <PageFormsCreateOrEditContext.Provider
      value={{
        // BOOLEAN
        isFormLoading, setIsFormLoading,
        // DRAG AND DROP
        listFields, setListFields,
        listToolbox, setListToolbox,
        selectedFields, setSelectedFields
      }}
    >
      {props.children}
    </PageFormsCreateOrEditContext.Provider>
  )
}

export { PageFormsCreateOrEditContextProvider, PageFormsCreateOrEditContext }