import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

// COMPONENTS
import AppBar from 'components/AppBar/AppBar'
import Header from './Header'
import InputComponent from './InputComponent'
import ItemGrid from './ItemGrid'
import LoadingPaper from 'components/LoadingPaper/LoadingPaper'

// CONSTANTS
import { dummyData } from './formsSubmissionsDetailConstants'

// HOOKS
import useAxiosPrivate from 'hooks/useAxiosPrivate'

// MUIS
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'

// SERVICES
import { postSearchFormSubmissionList } from 'services/form'

// STYLES
import useStyles from './formsSubmissionsDetailUseStyles'

// UTILITIES
import { didSuccessfullyCallTheApi } from 'utilities/validation'

const FormsSubmissionsDetail = () => {
  const axiosPrivate = useAxiosPrivate()
  const [ searchParams ] = useSearchParams()

  // STYLES
  const classes = useStyles()

  // CONTENT
  const [ isFormLoading, setIsFormLoading ] = useState(true)
  const [ submissionDetail, setSubmissionDetail ] = useState({})

  // HANDLE GET SUBMISSION DETAIL
  const getSubmissionDetail = async (
    inputSignal,
    inputTemplateId,
    inputSubmissionId
  ) => {
    const response = await postSearchFormSubmissionList(inputSignal.signal, {
      page: 0,
      size: 100000
    }, {
      template_id: inputTemplateId,
    }, axiosPrivate)

    if(didSuccessfullyCallTheApi(response?.status)) {
      const findDetail = response.data.content.find(item => item.id === inputSubmissionId)
      setSubmissionDetail(findDetail)
    }

    setIsFormLoading(false)
  }

  // FIND VALUES BY FIELD ID
  const findValuesByFieldId = (inputFieldId) => {
    const findValues = submissionDetail?.values[inputFieldId]
    if(Boolean(findValues)) {
      return findValues
    }
  }

  useEffect(() => {
    const abortController = new AbortController()
    getSubmissionDetail(
      abortController,
      Number(searchParams.get('formTemplateId')),
      Number(searchParams.get('submissionId'))
    )

    return () => abortController.abort()
  }, [])

  return (
    <>
      <AppBar
        hasFab={false}
        hasBack={true}
        backLink='/forms'
        pageTitle='Form Submission Detail'
        hasSearch={false}
      />

      {/* MAIN CONTENT */}
      <LoadingPaper isLoading={isFormLoading} className='overflowYauto'>
        {/* HEADER */}
        <Header title={submissionDetail?.label}/>

        <Divider />

        {/* CONTENT FORM */}
        <Grid container spacing={0} className={classes.contentForms}>
          {submissionDetail?.fields?.map((item, index) => (
            <ItemGrid
              label={item.label}
              description={item.description}
              key={index}
              isSeparator={item.type === 'separator'}
            >
              <InputComponent
                item={item}
                type={item.type}
                defaultValue={findValuesByFieldId(item.id)}
              />
            </ItemGrid>
          ))}
          {/* ITEM */}
        </Grid>
      </LoadingPaper>
    </>
  )
}

export default FormsSubmissionsDetail