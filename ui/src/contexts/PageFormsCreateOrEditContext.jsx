import { createContext, useState } from 'react'

// CONSTANTS
import { dataListComponents, initObjectForm } from 'pages/FormsCreateOrEdit/formsCreateOrEditConstants'

const PageFormsCreateOrEditContext = createContext()

const PageFormsCreateOrEditContextProvider = (props) => {
  // BOOLEAN
  const [isFormLoading, setIsFormLoading] = useState(true)
  const [isFormHaveChange, setIsFormHaveChange] = useState(false)
  // DRAG AND DROP
  const [listFields, setListFields] = useState([])
  const [listToolbox, setListToolbox] = useState(dataListComponents)
  const [selectedFieldsId, setSelectedFieldsId] = useState(0) // STRING | NUMBER
  const [selectedFieldsType, setSelectedFieldsType] = useState('formHeader')
  // FORM
  const [formObject, setFormObject] = useState(initObjectForm)

  return (
    <PageFormsCreateOrEditContext.Provider
      value={{
        // BOOLEAN
        isFormLoading, setIsFormLoading,
        isFormHaveChange, setIsFormHaveChange,
        // DRAG AND DROP
        listFields, setListFields,
        listToolbox, setListToolbox,
        selectedFieldsId, setSelectedFieldsId,
        selectedFieldsType, setSelectedFieldsType,
        // FORM
        formObject, setFormObject,
      }}
    >
      {props.children}
    </PageFormsCreateOrEditContext.Provider>
  )
}

export { PageFormsCreateOrEditContextProvider, PageFormsCreateOrEditContext }