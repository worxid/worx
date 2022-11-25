import { useState, useEffect, useRef, useContext } from 'react'
import { useSearchParams } from 'react-router-dom'

// COMPONENTS
import AppBar from 'components/AppBar/AppBar'
import Flyout from 'components/Flyout/Flyout'
import FormFlyout from './FormsFlyout/FormsFlyout'
import Header from './Header'
import InputComponent from './InputComponent'
import ItemGrid from './ItemGrid'
import LoadingPaper from 'components/LoadingPaper/LoadingPaper'

// CONSTANTS
import { values } from 'constants/values'

// CONTEXTS
import { AllPagesContext } from 'contexts/AllPagesContext'

// HOOKS
import useAxiosPrivate from 'hooks/useAxiosPrivate'

// MUIS
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

// REACT TO PRINT
import { useReactToPrint } from 'react-to-print'

// SERVICES
import { getSubmissionListDetail } from 'services/form'

// STYLES
import useStyles from './formsSubmissionsDetailUseStyles'

// UTILITIES
import { didSuccessfullyCallTheApi, wasRequestCanceled } from 'utilities/validation'

const FormsSubmissionsDetail = () => {
  const axiosPrivate = useAxiosPrivate()
  const [ searchParams ] = useSearchParams()
  const downloadComponentRef = useRef()

  // CONTEXT
  const { breakpointZoomBoundary, setSnackbarObject } = useContext(AllPagesContext)

  // STYLES
  const classes = useStyles()

  // STATE
  const [ isFormLoading, setIsFormLoading ] = useState(true)
  const [ submissionDetail, setSubmissionDetail ] = useState({})
  const [ isFlyoutShown, setIsFlyoutShown ] = useState(false)

  // HANDLE GET SUBMISSION DETAIL
  const getSubmissionDetail = async (inputSignal, inputSubmissionId) => {
    const response = await getSubmissionListDetail(
      inputSignal.signal,
      inputSubmissionId,
      axiosPrivate
    )

    if(didSuccessfullyCallTheApi(response?.status)) {
      setSubmissionDetail(response?.data?.value)
    } else if (!wasRequestCanceled(response?.status)) {
      setSnackbarObject({
        open: true,
        severity:'error',
        title: response?.data?.error?.status?.replaceAll('_', ' ') || '',
        message: response?.data?.error?.message || 'Something went wrong',
      })
    }

    setIsFormLoading(false)
  }

  // FIND VALUES BY FIELD ID
  const findValuesByFieldId = (inputFieldId) => {
    const findValues = submissionDetail?.values[inputFieldId]
    if(Boolean(findValues)) {
      return findValues
    } else {
      return null
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
        hasFlyout={true}
        isFlyoutShown={isFlyoutShown}
        flyoutTitle='Information'
        flyoutTitleMargin={breakpointZoomBoundary ? 300 : 232}
        onToggleFlyoutClick={() => setIsFlyoutShown((current) => !current)}
      />

      <Stack 
        direction='row'
        position='relative'
        flex='1'
        height={0}
        className='contentContainer'
        sx={{ paddingRight: isFlyoutShown ? `${values.flyoutWidth + 24}px` : 0 }}
      >
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
                {Boolean(findValuesByFieldId(item.id)) ? (
                  <Stack width='100%' maxWidth='400px'>
                    <InputComponent
                      item={item}
                      type={item.type}
                      defaultValue={findValuesByFieldId(item.id)}
                    />
                  </Stack>)
                  : (
                    <Typography variant='body2'>{item.type !== 'separator' && 'No data'}</Typography>
                  )}
              </ItemGrid>
            ))}
            {/* ITEM */}
          </Grid>
        </LoadingPaper>

        {/* SIDE CONTENT */}
        <Flyout
          isFlyoutShown={isFlyoutShown}
          flyoutWidth={values.flyoutWidth}
        >
          <FormFlyout submissionDetail={submissionDetail}/>
        </Flyout>
      </Stack>
    </>
  )
}

export default FormsSubmissionsDetail