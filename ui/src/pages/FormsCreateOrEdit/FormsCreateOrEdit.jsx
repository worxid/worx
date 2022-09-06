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
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'

// STYLES
import useStyles from './formsCreateOrEditUseStyles'

const FormsCreateOrEdit = () => {
  // STYLES
  const classes = useStyles()

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
        extraComponent={
          <Button 
            variant='contained'
            className={classes.appBarExtraComponent}
          >
            Save
          </Button>
        }
      />

      {/* MAIN CONTENT */}
      <LoadingPaper
        isLoading={isFormLoading}
        className={`${classes.loadingPaper} overflowYauto`}
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