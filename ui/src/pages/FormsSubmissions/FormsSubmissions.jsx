import { useState, useEffect, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

// COMPONENTS
import AppBar from 'components/AppBar/AppBar'
import DataGridFilters from 'components/DataGridFilters/DataGridFilters'
import DataGridTable from 'components/DataGridTable/DataGridTable'
import DialogExport from './DialogExport/DialogExport'
import DialogMediasPreview from 'components/DialogMediasPreview/DialogMediasPreview'
import DialogShareLink from 'components/DialogShareLink/DialogShareLink'
import DialogQrCode from 'components/DialogQrCode/DialogQrCode'
import LoadingPaper from 'components/LoadingPaper/LoadingPaper'

// CONTEXTS
import { AllPagesContext } from 'contexts/AllPagesContext'
import { PrivateLayoutContext } from 'contexts/PrivateLayoutContext'

// HOOKS
import useAxiosPrivate from 'hooks/useAxiosPrivate'

// LODASH
import lodash from 'lodash'

// MUIS
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import IconButton from '@mui/material/IconButton'
import Rating from '@mui/material/Rating'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

// MUI ICONS
import IconBrush from '@mui/icons-material/Brush'
import IconGesture from '@mui/icons-material/Gesture'
import IconImage from '@mui/icons-material/Image'
import IconInsertDriveFile from '@mui/icons-material/InsertDriveFile'
import IconMap from '@mui/icons-material/Map'

// SERVICES
import { postSearchFormSubmissionList } from 'services/worx/form'
import { getDetailFormTemplate } from 'services/worx/formTemplate'
import { postDetailMediaFiles } from 'services/worx/media'

// STYLES
import useStyles from './formsSubmissionsUseStyles'

// UTILITIES
import { convertDate } from 'utilities/date'
import { getDefaultErrorMessage } from 'utilities/object'
import { 
  didSuccessfullyCallTheApi, 
  wasAccessTokenExpired,
  wasRequestCanceled,
} from 'utilities/validation'

const FormsSubmissions = () => {
  // CONTEXT
  const { setSnackbarObject } = useContext(AllPagesContext)
  const { setIsDialogFormOpen } = useContext(PrivateLayoutContext)

  // STYLES
  const classes = useStyles()

  // NAVIGATE
  const navigate = useNavigate()
  const { formTemplateId } = useParams()

  const axiosPrivate = useAxiosPrivate()

  // INITS
  let initialColumns = [
    {
      field: 'source',
      headerName: 'Source',
      headerClassName: 'cell-source-custom',
      cellClassName: 'cell-source-custom',
      flex: 0,
      width: 140,
      hide: false,
      isFilterShown: true,
      isSortShown: true,
      valueGetter: (params) => lodash.startCase(params.row.source.label),
    },
    {
      field: 'submissionDate',
      headerName: 'Submission Date',
      flex: 0,
      minWidth: 210,
      hide: false,
      isFilterShown: false,
      isSortShown: true,
      headerClassName: 'cell-source-custom',
      cellClassName: 'cell-source-custom',
      valueGetter: (params) => convertDate(params.value),
    },
    {
      field: 'submissionAddress',
      headerName: 'Map',
      headerAlign: 'center',
      flex: 1,
      minWidth: 80,
      hide: false,
      isFilterShown: false,
      isSortShown: false,
      headerClassName: 'cell-source-custom',
      cellClassName: 'cell-source-custom',
      renderCell: (params) => (
        <Stack
          width='100%'
          alignItems='center'
        >
          <IconButton onClick={() => window.open(`https://maps.google.com/?q=${params.row.submissionLatitude},${params.row.submissionLongitude}`, '_blank', 'noopener,noreferrer')}>
            <IconMap
              color='primary'
              fontSize='small'
            />
          </IconButton>
        </Stack>
      ),
    },
  ]
    
  const initialFilters = {
    source: '',
    submissionAddress: '',
  }

  // CONTENT
  const [ formTemplateDetail, setFormTemplateDetail ] = useState(null)
  const [ isDataGridLoading, setIsDataGridLoading ] = useState(false)
  // const [ areDynamicColumnsValuesAdded, setAreDynamicColumnsValuesAdded ] = useState(false)
  // DATA GRID - BASE
  const [ columnList, setColumnList ] = useState(initialColumns)
  const [ rawTableData, setRawTableData ] = useState([])
  const [ finalTableData, setFinalTableData ] = useState([])
  // DATA GRID - PAGINATION
  const [ totalRow, setTotalRow ] = useState(0)
  const [ pageNumber, setPageNumber ] = useState(0)
  const [ pageSize, setPageSize ] = useState(100)
  // DATA GRID - ORDER
  const [ order, setOrder ] = useState(null)
  const [ orderBy, setOrderBy ] = useState(null)
  // DATA GRID - FILTER
  const [ isFilterOn, setIsFilterOn ] = useState(false)
  const [ filters, setFilters ] = useState(initialFilters)
  const [ isDateRangeTimePickerOpen, setIsDateRangeTimePickerOpen ] = useState(false)
  const [ dateRangeTimeValue, setDateRangeTimeValue ] = useState(['', ''])
  // DATA GRID - SELECTION
  const [ selectionModel, setSelectionModel ] = useState([])
  // DIALOG MEDIAS PREVIEW
  const [ isDialogMediasPreviewOpen, setIsDialogMediasPreviewOpen ] = useState(false)
  const [ mediaPreviewList, setMediaPreviewList ] = useState([])
  const [ mediaPreviewType, setMediaPreviewType ] = useState(null)
  const [ mediaPreviewActiveStep, setMediaPreviewActiveStep ] = useState(0)

  const handleSelectDateRangePickerButtonClick = (newValue) => {
    setDateRangeTimeValue(newValue)
    setIsDateRangeTimePickerOpen(false)
  }

  const getFormTemplateDetail = async (inputIsMounted, inputAbortController) => {
    setIsDataGridLoading(true)

    const resultFormTemplateDetail = await getDetailFormTemplate(
      formTemplateId,
      inputAbortController.signal,
      axiosPrivate,
    )

    if (resultFormTemplateDetail.status === 200 && inputIsMounted) {
      setFormTemplateDetail({ ...resultFormTemplateDetail.data.value })
    }
    else if (!wasRequestCanceled(resultFormTemplateDetail?.status) && !wasAccessTokenExpired(resultFormTemplateDetail.status)) {
      setSnackbarObject(getDefaultErrorMessage(resultFormTemplateDetail))
    }

    setIsDataGridLoading(false)
  }

  const getSubmissionList = async (inputIsMounted, inputAbortController) => {
    setIsDataGridLoading(true)

    let requestParams = {
      size: pageSize,
      page: pageNumber,
    }
    if (order && orderBy) requestParams.sort = `${orderBy},${order}`

    let bodyParams = { 
      submit_address: filters.submissionAddress,
      source: {
        type: null,
        label: filters.source,
      },
      template_id: formTemplateId, 
      from: dateRangeTimeValue[0],
      to: dateRangeTimeValue[1],
    }

    const resultSubmissionList = await postSearchFormSubmissionList(
      inputAbortController.signal,
      requestParams,
      bodyParams,
      axiosPrivate
    )

    if (didSuccessfullyCallTheApi(resultSubmissionList?.status) && inputIsMounted) {
      const submissionList = resultSubmissionList?.data?.content?.map(submissionItem => {
        return {
          id: submissionItem?.id,
          source: submissionItem?.source ?? '-',
          submissionDate: submissionItem?.submit_date ?? '-',
          submissionAddress: submissionItem?.submit_location?.address ?? '-',
          submissionLatitude: submissionItem?.submit_location?.lat ?? null,
          submissionLongitude: submissionItem?.submit_location?.lng ?? null,
          values: submissionItem?.values,
          attachments: submissionItem.attachments,
        }
      })

      setRawTableData(submissionList)
      setTotalRow(resultSubmissionList?.data?.totalElements)
    }
    else if (!wasRequestCanceled(resultSubmissionList?.status) && !wasAccessTokenExpired(resultSubmissionList.status)) {
      setSnackbarObject(getDefaultErrorMessage(resultSubmissionList))
    }

    setIsDataGridLoading(false)
  }

  const getMininumColumnWidthByColumnType = (inputItem) => {
    if (inputItem.type === 'rating') {
      if (inputItem.max_stars <= 5) return 30 * inputItem.max_stars
      else return 28 * inputItem.max_stars
    }
    else if (
      inputItem.type === 'radio_group' || 
      inputItem.type === 'dropdown' || 
      inputItem.type === 'checkbox_group'
    ) return 175
    else if (
      inputItem.type === 'file' || 
      inputItem.type === 'photo' || 
      inputItem.type === 'barcode'
    ) return 280
    else if (
      inputItem.type === 'signature' ||
      inputItem.type === 'sketch'
    ) return 240
    else if (inputItem.type === 'boolean') return 100
    else if (inputItem.type === 'time') return 120
    else return 150
  }

  const handleMediaTypeCellClick = async (inputValue) => {
    const abortController = new AbortController()

    const resultMediaFilesData = await postDetailMediaFiles(
      abortController.signal,
      { media_ids: inputValue?.fileList?.map(item => item.media_id) },
      axiosPrivate,
    )

    if (didSuccessfullyCallTheApi(resultMediaFilesData.status)) {
      setMediaPreviewType(inputValue.type)
      setMediaPreviewList(resultMediaFilesData.data.list)
      setMediaPreviewActiveStep(0)
      setIsDialogMediasPreviewOpen(true)
    }
    else if (!wasRequestCanceled(resultMediaFilesData?.status) && !wasAccessTokenExpired(resultMediaFilesData.status)) {
      setSnackbarObject(getDefaultErrorMessage(resultMediaFilesData))
    }
  }

  const getRenderCellByColumnType = (inputParams) => {
    if (
      inputParams?.value?.type === 'text' || 
      inputParams?.value?.type === 'date' ||
      inputParams?.value?.type === 'boolean' ||
      inputParams?.value?.type === 'time' ||
      inputParams?.value?.type === 'integer' ||
      inputParams?.value?.type === 'barcode'
    ) {
      let selectedValue = inputParams?.value?.value

      if (inputParams?.value?.type === 'boolean') selectedValue = inputParams?.value?.value.toString()

      return (
        <Typography 
          variant='inherit' 
          noWrap
        >
          {selectedValue}
        </Typography>
      )
    }
    else if (inputParams?.value?.type === 'rating') {
      const maxStars = inputParams?.colDef?.fieldInformation?.max_stars

      return (
        <Rating
          defaultValue={inputParams?.value?.value ?? 0} 
          max={maxStars}
          readOnly
        />
      )
    }
    else if (inputParams?.value?.type === 'radio_group' || inputParams?.value?.type === 'dropdown') {
      const optionList = formTemplateDetail?.fields?.find(item => item.id === inputParams?.field)?.options
      const selectedOption = optionList.find((item, index) => index === inputParams?.value?.value_index)

      return (
        <Chip
          label={selectedOption.label}
          size='small'
          className={classes.columnChip}
        />
      )
    }
    else if (inputParams?.value?.type === 'checkbox_group') {
      const optionList = formTemplateDetail?.fields?.find(item => item.id === inputParams?.field)?.group
      const selectedOptionList = optionList.filter((item, index) => inputParams?.value?.values[index])
      
      return (
        <Stack 
          spacing='8px'
          padding='8px 0px'
          direction='row'
        >
          {selectedOptionList?.slice(0, 1)?.map((item, index) => (
            <Chip
              key={index}
              label={item.label}
              size='small'
              className={classes.columnChip}
            />
          ))}

          {selectedOptionList?.length >= 2 && (
            <Chip
              label={`${selectedOptionList.length-1}+`}
              size='small'
              className={classes.columnChip}
            />
          )}
        </Stack>
      )
    }
    else if (
      inputParams?.value?.type === 'file' || 
      inputParams?.value?.type === 'photo' || 
      inputParams?.value?.type === 'signature' ||
      inputParams?.value?.type === 'sketch'
    ) {
      let valueList = inputParams?.value?.fileList

      let ColumnIcon
      if (inputParams?.value?.type === 'file') ColumnIcon = IconInsertDriveFile
      else if (inputParams?.value?.type === 'photo') ColumnIcon = IconImage
      else if (inputParams?.value?.type === 'signature') ColumnIcon = IconGesture
      else if (inputParams?.value?.type === 'sketch') ColumnIcon = IconBrush
      
      return (
        <Stack
          spacing='8px'
          padding='8px 0px'
          className='cursorPointer'
          onClick={() => handleMediaTypeCellClick(inputParams.value)}
        >
          {valueList?.slice(0, 1)?.map((item, index) => (
            <Stack
              key={index}
              direction='row'
              spacing='8px'
              alignItems='center'
            >
              {/* ICON */}
              <ColumnIcon 
                color='primary'
                fontSize='small'
              />

              {/* TEXT */}
              <Typography 
                variant='inherit'
                className='heightFitContent'
                color='primary.main'
              >
                {item.name}
              </Typography>

              {valueList?.length >= 2 && (
                <Chip
                  label={`${valueList.length-1}+`}
                  size='small'
                  className={`${classes.columnChip} red`}
                />
              )}
            </Stack>
          ))}
        </Stack>
      )
    }
  }

  const updateColumnsDynamically = () => {
    if (formTemplateDetail && formTemplateDetail?.fields?.length > 0) {
      let newColumnList = [ ...columnList, ...formTemplateDetail?.fields?.map(item => {
        return {
          field: item.id,
          headerName: item.label,
          flex: 1,
          minWidth: getMininumColumnWidthByColumnType(item),
          hide: false,
          isFilterShown: false,
          isSortShown: false,
          headerClassName: 'cell-source-custom',
          cellClassName: 'cell-source-custom',
          fieldInformation: {...item},
          renderCell: (params) => getRenderCellByColumnType(params),
        }
      })]

      // DELETE THE SEPARATOR TYPE COLUMNS
      newColumnList = newColumnList.filter(item => item?.fieldInformation?.type !== 'separator')

      setColumnList(newColumnList)
    }
  }

  const updateTableDataDynamically = () => {
    // NOTE: DYNAMIC COLUMNS START FROM THE 3RD INDEX
    const dynamicColumnList = columnList.filter((item, index) => index > 2)

    const newFinalTableData = rawTableData.map((tableRowItem) => {
      const columnWithValueObject = dynamicColumnList.reduce((result, columnItem) => {
        const fileType = tableRowItem?.values?.[columnItem.field]?.type

        if (fileType === 'file' || fileType === 'photo') {
          result[columnItem.field] = {
            type: fileType,
            fileList: tableRowItem?.values?.[columnItem.field]?.file_ids?.map(fileId => {
              return tableRowItem?.attachments?.find(attachmentItem => fileId === attachmentItem.file_id)
            })
          }
        }
        else if (fileType === 'signature' || fileType === 'sketch') {
          result[columnItem.field] = {
            type: fileType,
            fileList: [ tableRowItem?.attachments?.find(attachmentItem => 
              tableRowItem?.values?.[columnItem.field]?.file_id === attachmentItem.file_id) 
            ]
          }
        }
        else result[columnItem.field] = tableRowItem?.values?.[columnItem.field]

        return result
      }, {})

      return {
        ...tableRowItem,
        ...columnWithValueObject,
      }
    })

    setFinalTableData(newFinalTableData)
  }

  const handleSubmissionDateSortChange = () => {
    let newFinalTableData = [...finalTableData]

    if (order === 'asc') newFinalTableData.sort((a, b) => (a.submissionDate > b.submissionDate) ? -1 : 1)
    else if (order === 'desc') newFinalTableData.sort((a, b) => (a.submissionDate > b.submissionDate) ? 1 : -1)
    else newFinalTableData.sort((a, b) => (a.id > b.id) ? 1 : -1)

    setFinalTableData(newFinalTableData)
  }
  
  useEffect(() => {
    let isMounted = true
    const abortController = new AbortController()

    getFormTemplateDetail(isMounted, abortController)

    return () => {
      isMounted = false
      abortController.abort()
    }
  }, [])

  useEffect(() => {
    let isMounted = true
    const abortController = new AbortController()

    if (orderBy === 'submissionDate') handleSubmissionDateSortChange()
    else getSubmissionList(isMounted, abortController)

    return () => {
      isMounted = false
      abortController.abort()
    }
  }, [pageNumber, pageSize, filters, order, orderBy, dateRangeTimeValue])

  useEffect(() => {
    updateColumnsDynamically()
  }, [formTemplateDetail])

  useEffect(() => {
    updateTableDataDynamically()
  }, [columnList, rawTableData])

  return (
    <>
      {/* APP BAR */}
      <AppBar
        hasFab={false}
        hasBack={true}
        backLink='/forms'
        pageTitle='Submissions'
        hasSearch={false}
        hasFlyout={false}
      />

      {/* CONTENTS */}
      <Stack 
        direction='row'
        position='relative'
        flex='1'
        height='100%'
      >
        {/* MAIN CONTENT */}
        <LoadingPaper isLoading={isDataGridLoading}>
          {/* HEADER */}
          <Stack
            className={classes.header}
            alignItems='center'
            direction='row'
            flexWrap='nowrap'
          >
            {/* HEADER LEFT */}
            <Box className={classes.headerLeft}>
              {/* TITLE */}
              <Typography
                className={classes.headerTitle}
                variant='subtitle1'
              >
                {formTemplateDetail?.label ?? 'No Title for This Form'}
              </Typography>

              {/* DESCRIPTION */}
              <Typography
                color='text.secondary'
                variant='caption'
              >
                {formTemplateDetail?.description !== '' 
                  ? formTemplateDetail?.description 
                  : 'No Description for This Form'}
              </Typography>
            </Box>

            {/* HEADER RIGHT */}
            <Stack
              className={classes.headerRight}
              alignItems='center'
              direction='row'
              flexWrap='nowrap'
            >
              <Button
                size='small'
                variant='contained'
                className={`${classes.buttonRedPrimary} heightFitContent`}
                onClick={() => setIsDialogFormOpen('dialogShareLink')}
              >
                Share
              </Button>
            </Stack>
          </Stack>

          <DataGridFilters
            contentTitle='Submission List'
            // COLUMN
            columns={initialColumns}
            selectedColumnList={columnList}
            setSelectedColumnList={setColumnList}
            // DATE RANGE TIME
            isWithDateTimePicker={true}
            isWithTimePicker={false}
            dateRangeValue={dateRangeTimeValue}
            isDateRangeTimePickerOpen={isDateRangeTimePickerOpen} 
            setIsDateRangeTimePickerOpen={setIsDateRangeTimePickerOpen}
            handleSelectDateRangePickerButtonClick={handleSelectDateRangePickerButtonClick}
            handleCancelDateRangePickerButtonClick={() => setIsDateRangeTimePickerOpen(false)}
            // FILTER
            isFilterOn={isFilterOn}
            setIsFilterOn={setIsFilterOn}
            // DOWNLOAD
            isDownloadButtonEnabled={true}
            handleDownloadButtonClick={(event) => setIsDialogFormOpen('dialogExport')}
          />

          <DataGridTable
            // BASE
            initialColumns={initialColumns}
            selectedColumnList={columnList}
            setSelectedColumnList={setColumnList}
            rows={finalTableData}
            // PAGINATION
            total={totalRow}
            page={pageNumber}
            setPage={setPageNumber}
            pageSize={pageSize}
            setPageSize={setPageSize}
            // ORDER
            setOrder={setOrder}
            order={order}
            setOrderBy={setOrderBy}
            orderBy={orderBy}
            // FILTER
            setFilters={setFilters}
            isFilterOn={isFilterOn}
            // SELECTION
            selectionModel={selectionModel} 
            setSelectionModel={setSelectionModel}
            // CHECKBOX
            checkboxSelection={false}
            // CLASSES
            className={classes.tableFormsSubmissions}
            // ROW
            onRowDoubleClick={(params, event, details) => navigate(`/forms/submission-detail?formTemplateId=${formTemplateId}&submissionId=${params.row.id}`)}
          />
        </LoadingPaper>
      </Stack>

      {/* DIALOG SHARE LINK */}
      <DialogShareLink id={Number(formTemplateId)} />

      {/* DIALOG EXPORT */}
      <DialogExport id={Number(formTemplateId)} title={formTemplateDetail?.label ?? ''} />

      {/* DIALOG QR CODE */}
      <DialogQrCode id={Number(formTemplateId)} />

      {/* DIALOG MEDIAS PREVIEW */}
      <DialogMediasPreview 
        isDialogOpen={isDialogMediasPreviewOpen}
        setIsDialogOpen={setIsDialogMediasPreviewOpen}
        mediaList={mediaPreviewList}
        setMediaList={setMediaPreviewList}
        mediaPreviewType={mediaPreviewType}
        activeStep={mediaPreviewActiveStep}
        setActiveStep={setMediaPreviewActiveStep}
      />
    </>
  )
}

export default FormsSubmissions