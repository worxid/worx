import { useContext } from 'react'

// COMPONENTS
import AppBar from 'components/AppBar/AppBar'
import FormFields from './FormFields/FormFields'
import TabPropertiesPreview from './TabPropertiesPreview/TabPropertiesPreview'
import Toolbox from './Toolbox/Toolbox'
import LoadingPaper from 'components/LoadingPaper/LoadingPaper'

// CONTEXT
import { PageFormsCreateOrEditContext } from 'contexts/PageFormsCreateOrEditContext'

// MUIS
import Divider from '@mui/material/Divider'

const FormsCreateOrEdit = () => {
  // CONTEXT
  const { isFormLoading, setIsFormLoading } = useContext(PageFormsCreateOrEditContext)

  return (
    <>
      <AppBar
        hasFab={false}
        hasBack={true}
        backLink='/forms'
        pageTitle='Add New Form'
        hasSearch={false}
      />

      {/* MAIN CONTENT */}
      <LoadingPaper
        isLoading={isFormLoading}
        className='flexDirectionRow overflowYauto'
      >
        {/* TOOLBOX */}
        <Toolbox />

        <Divider orientation='vertical' />

        {/* FORM FIELDS */}
        <FormFields />

        <Divider orientation='vertical' />

        {/* TAB */}
        <TabPropertiesPreview />
      </LoadingPaper>
    </>
  )
}

export default FormsCreateOrEdit