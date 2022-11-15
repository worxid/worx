import { useState, useEffect, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'

// COMPONENTS
import AppBar from 'components/AppBar/AppBar'
import Header from './Header'
import InputComponent from './InputComponent'
import ItemGrid from './ItemGrid'
import LoadingPaper from 'components/LoadingPaper/LoadingPaper'

// HOOKS
import useAxiosPrivate from 'hooks/useAxiosPrivate'

// MUIS
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'

// REACT TO PRINT
import { useReactToPrint } from 'react-to-print'

// SERVICES
import { postSearchFormSubmissionList } from 'services/form'

// STYLES
import useStyles from './formsSubmissionsDetailUseStyles'

// UTILITIES
import { didSuccessfullyCallTheApi } from 'utilities/validation'

const FormsSubmissionsDetail = () => {
  const axiosPrivate = useAxiosPrivate()
  const [ searchParams ] = useSearchParams()
  const downloadComponentRef = useRef()

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

  const handleDownloadButtonClick = useReactToPrint({
    content: () => downloadComponentRef.current.cloneNode(true),
    documentTitle: submissionDetail?.label,
    pageStyle: `
      @page {
        size: 210mm 297mm;
        margin: 2.54cm,
      }
      @media all {
        .pagebreak {
          display: none;
        }
      }
      @media print {
        .pagebreak {
          page-break-before: always;
        }
        .no-print {
          display: none !important;
        }
      }
    `,
  })

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
        backLink={`/forms/submissions/${searchParams.get('formTemplateId')}`}
        pageTitle='Form Submission Detail'
        hasSearch={false}
      />

      {/* MAIN CONTENT */}
      <LoadingPaper isLoading={isFormLoading} className='overflowYauto'>
        {/* HEADER */}
        <Header
          title={submissionDetail?.label}
          onClickDownload={() => handleDownloadButtonClick()}
        />

        <Divider />

        {/* CONTENT FORM */}
        <Grid ref={downloadComponentRef} container spacing={0} className={classes.contentForms}>
          {submissionDetail?.fields?.map((item, index) => (
            <ItemGrid
              label={item.label}
              description={item.description}
              key={index}
              isSeparator={item.type === 'separator'}
            >
              <Stack width='100%' maxWidth='400px'>
                <InputComponent
                  item={item}
                  type={item.type}
                  defaultValue={findValuesByFieldId(item.id)}
                />
              </Stack>
            </ItemGrid>
          ))}
          {/* ITEM */}
        </Grid>
      </LoadingPaper>
    </>
  )
}

export default FormsSubmissionsDetail