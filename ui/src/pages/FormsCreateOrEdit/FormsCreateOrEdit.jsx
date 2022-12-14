import { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'

// COMPONENTS
import AppBar from 'components/AppBar/AppBar'
import FormFields from './FormFields/FormFields'
import TabPropertiesPreview from './TabPropertiesPreview/TabPropertiesPreview'
import Toolbox from './Toolbox/Toolbox'
import LoadingPaper from 'components/LoadingPaper/LoadingPaper'

// CONTEXT
import { AllPagesContext } from 'contexts/AllPagesContext'
import { PageFormsCreateOrEditContext } from 'contexts/PageFormsCreateOrEditContext'

// HOOKS
import useAxiosPrivate from 'hooks/useAxiosPrivate'

// MUIS
import Divider from '@mui/material/Divider'
import Stack from '@mui/material/Stack'

// SERVICES
import { 
  getDetailFormTemplate, 
  putUpdateFormTemplate, 
} from 'services/worx/formTemplate'

// UTILITIES
import { getDefaultErrorMessage } from 'utilities/object'
import { 
  didSuccessfullyCallTheApi, 
  wasAccessTokenExpired,
  wasRequestCanceled,
} from 'utilities/validation'

const FormsCreateOrEdit = () => {
  // PARAMS
  const { formTemplateId } = useParams()

  // CONTEXT
  const { setSnackbarObject } = useContext(AllPagesContext)
  const {
    formObject, listFields, setFormObject,
    setListFields, isFormLoading, setIsFormLoading,
    hasFormChanged, setHasFormChanged
  } = useContext(PageFormsCreateOrEditContext)

  const axiosPrivate = useAxiosPrivate()

  // FETCHING DETAIL FORM TEMPLATE
  const fetchingDetailFormTemplate = async (abortController, inputIsMounted) => {
    const response = await getDetailFormTemplate(
      Number(formTemplateId), 
      abortController.signal, 
      axiosPrivate,
    )

    if (didSuccessfullyCallTheApi(response?.status) && inputIsMounted) {
      const values = response.data.value
      const addOtherKeyToFields = values.fields.map(item => ({...item, duplicateFrom: null}))

      setFormObject({
        label: values.label,
        description: values.description,
      })
      setListFields(addOtherKeyToFields)
      setIsFormLoading(false)
    }
    else if (!wasRequestCanceled(response?.status) && !wasAccessTokenExpired(response.status)) {
      setSnackbarObject(getDefaultErrorMessage(response))
    }
  }

  // UPDATE FORM TEMPLATE
  const updateFormTemplate = async (inputIsMounted) => {
    const abortController = new AbortController()

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
      },
      axiosPrivate,
    )

    // SUCCESS
    if (didSuccessfullyCallTheApi(response?.status) && inputIsMounted) {
      setSnackbarObject({
        open: true,
        severity:'success',
        title:'',
        message:'Change have been save'
      })
    } 
    else if (!wasRequestCanceled(response?.status) && !wasAccessTokenExpired(response.status)) {
      setSnackbarObject(getDefaultErrorMessage(response))
    }

    setHasFormChanged(false)
    abortController.abort()
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
    let isMounted = true
    const abortController = new AbortController()
    fetchingDetailFormTemplate(abortController, isMounted)

    return () => {
      isMounted = false
      abortController.abort()
    }
  }, [formTemplateId])

  // SIDE EFFECT AUTO SAVE
  useEffect(() => {
    let isMounted

    // TRIGGER WHEN NO CHANGE IN 2 SECS ON formObject OR listFields
    (!isFormLoading && hasFormChanged) && debounce(() => {
      isMounted = true
      updateFormTemplate(isMounted)
    },
    2000)

    return () => isMounted = false
  }, [formObject, listFields])

  return (
    <>
      <AppBar
        hasFab={false}
        hasBack={true}
        backLink='/forms'
        pageTitle='Edit Form'
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