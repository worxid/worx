import { useContext, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

// COMPONENTS
import AppBar from 'components/AppBar/AppBar'
import FormFields from './FormFields/FormFields'
import TabPropertiesPreview from './TabPropertiesPreview/TabPropertiesPreview'
import Toolbox from './Toolbox/Toolbox'
import LoadingPaper from 'components/LoadingPaper/LoadingPaper'

// CONTEXT
import { AllPagesContext } from 'contexts/AllPagesContext'
import { PageFormsCreateOrEditContext } from 'contexts/PageFormsCreateOrEditContext'

// MUIS
import Divider from '@mui/material/Divider'
import Stack from '@mui/material/Stack'

// SERVICES
import { getDetailFormTemplate, putUpdateFormTemplate } from 'services/formTemplate'

const FormsCreateOrEdit = () => {
  // NAVIGATE
  const navigate = useNavigate()

  // ABORT CONTROLLER
  const abortController = new AbortController()

  // PARAMS
  const { formTemplateId } = useParams()

  // CONTEXT
  const { setSnackbarObject } = useContext(AllPagesContext)
  const {
    formObject, listFields, setFormObject,
    setListFields, isFormLoading, setIsFormLoading,
    isFormHaveChange, setIsFormHaveChange
  } = useContext(PageFormsCreateOrEditContext)

  // FETCHING DETAIL FORM TEMPLATE
  const fetchingDetailFormTemplate = async () => {
    const response = await getDetailFormTemplate(Number(formTemplateId), abortController.signal)

    if(response?.data?.success) {
      const values = response.data.value
      const addOtherKeyToFields = values.fields.map(item => ({...item, duplicateFrom: null}))

      setFormObject({
        label: values.label,
        description: values.description,
      })
      setListFields(addOtherKeyToFields)
      setIsFormLoading(false)
    }
    else navigate('/forms')
  }

  // UPDATE FORM TEMPLATE
  const updateFormTemplate = async () => {
    // REMOVE KEY
    let listFieldsFiltered = listFields
      .map(item => removeMultipleKeyObject(
        ['chosen', 'selected'], item
      ))

    const response = await putUpdateFormTemplate(
      formTemplateId,
      abortController.signal,
      {
        ...formObject,
        fields: listFieldsFiltered,
        submit_in_zone: false,
        default: false
      }
    )

    // SUCCESS
    if(response?.data?.success) {
      setSnackbarObject({
        open: true,
        severity:'success',
        title:'',
        message:'Change have been save'
      })
    }

    setIsFormHaveChange(false)
  }

  // REMOVE MULTIPLE KEY
  const removeMultipleKeyObject = (deleteKey, item) => {
    let temp = item
    deleteKey && deleteKey.forEach(item => delete temp[item])
    return temp
  }

  // DEBOUNCE
  let timeoutDebonce
  const debounce = (callbackTimeout, time = 2000) => {
    clearTimeout(timeoutDebonce)
    timeoutDebonce = setTimeout(callbackTimeout, time)
  }

  // SIDE EFFECT GET DETAIL FORM TEMPLATE
  useEffect(() => {
    fetchingDetailFormTemplate()
  }, [formTemplateId])

  // SIDE EFFECT AUTO SAVE
  useEffect(() => {
    // TRIGGER WHEN NO CHANGE IN 2 SECS ON formObject OR listFields
    (!isFormLoading && isFormHaveChange) && debounce(() => {
      updateFormTemplate()
    },
    2000)
  }, [formObject, listFields])

  // SIDE EFFECT CLEAR
  useEffect(() => {
    return () => {
      abortController.abort()
      clearTimeout(timeoutDebonce)
    }
  }, [])

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

        <Stack direction='row' flex={1} className='overflowYauto'>
          {/* FORM FIELDS */}
          <FormFields />

          <Divider orientation='vertical' />

          {/* TAB */}
          <TabPropertiesPreview />
        </Stack>
      </LoadingPaper>
    </>
  )
}

export default FormsCreateOrEdit