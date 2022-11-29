import { useState, useEffect, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

// COMPONENTS
import AppBar from 'components/AppBar/AppBar'
import DialogExport from 'components/DialogExport/DialogExport'
import DataGridFilters from 'components/DataGridFilters/DataGridFilters'
import DataGridTable from 'components/DataGridTable/DataGridTable'
import DialogMediasPreview from './DialogMediasPreview/DialogMediasPreview'
import DialogShareLink from 'components/DialogShareLink/DialogShareLink'
import DialogQrCode from 'components/DialogQrCode/DialogQrCode'
import LoadingPaper from 'components/LoadingPaper/LoadingPaper'

// CONTEXTS
import { PrivateLayoutContext } from 'contexts/PrivateLayoutContext'

// HOOKS
import useAxiosPrivate from 'hooks/useAxiosPrivate'

// LODASH
import lodash from 'lodash'

// MUIS
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Link from '@mui/material/Link'
import Rating from '@mui/material/Rating'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

// MUI ICONS
import IconGesture from '@mui/icons-material/Gesture'
import IconImage from '@mui/icons-material/Image'
import IconInsertDriveFile from '@mui/icons-material/InsertDriveFile'

// SERVICES
import { postSearchFormSubmissionList } from 'services/form'
import { getDetailFormTemplate } from 'services/formTemplate'

// STYLES
import useStyles from './formsSubmissionsUseStyles'

// UTILITIES
import { 
  convertDate, 
  getLast30Days,
} from 'utilities/date'

const FormsSubmissions = () => {
  // CONTEXT
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
      minWidth: 200,
      hide: false,
      isFilterShown: false,
      isSortShown: true,
      headerClassName: 'cell-source-custom',
      cellClassName: 'cell-source-custom',
      renderCell: (params) => (
        <Stack
          minHeight={48}
          justifyContent='center'
        >
          {/* DATE */}
          <Typography variant='inherit'>
            {convertDate(params.value, 'dd-MM-yyyy')}
          </Typography>

          {/* TIME */}
          <Typography 
            variant='inherit'
            color='text.secondary'
          >
            {convertDate(params.value, 'hh:mm a')}
          </Typography>
        </Stack>
      ),
    },
    {
      field: 'submissionAddress',
      headerName: 'Submission Address',
      flex: 1,
      minWidth: 300,
      hide: false,
      isFilterShown: true,
      isSortShown: true,
      headerClassName: 'cell-source-custom',
      cellClassName: 'cell-source-custom',
      renderCell: (params) => (
        <Link
          underline='hover'
          className={classes.columnLink}
          href={`https://maps.google.com/?q=${params.row.submissionLatitude},${params.row.submissionLongitude}`}
        >
          {params.value ? params.value : 'No address found'}
        </Link>
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
  const [ areDynamicColumnTitlesAdded, setAreDynamicColumnTitlesAdded ] = useState(false)
  const [ areDynamicColumnsValuesAdded, setAreDynamicColumnsValuesAdded ] = useState(false)
  // DATA GRID - BASE
  const [ columnList, setColumnList ] = useState(initialColumns)
  const [ tableData, setTableData ] = useState([])
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
  const [ dateRangeTimeValue, setDateRangeTimeValue ] = useState([ 
    getLast30Days().startTime,
    getLast30Days().endTime,
  ])
  // DATA GRID - SELECTION
  const [ selectionModel, setSelectionModel ] = useState([])
  // DIALOG MEDIA PREVIEW
  const [ mediasPreviewObject, setMediasPreviewObject ] = useState(null)

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

    if (resultSubmissionList.status === 200 && inputIsMounted) {
      const submissionList = resultSubmissionList?.data?.content?.map(submissionItem => {
        return {
          id: submissionItem?.id,
          source: submissionItem?.source ?? '-',
          submissionDate: submissionItem?.submit_date ?? '-',
          submissionAddress: submissionItem?.submit_location?.address ?? '-',
          submissionLatitude: submissionItem?.submit_location?.lat ?? null,
          submissionLongitude: submissionItem?.submit_location?.lng ?? null,
          values: submissionItem?.values,
        }
      })

      setTableData(submissionList)
      setTotalRow(resultSubmissionList?.data?.totalElements)
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
    else return 150
  }

  const getRenderCellByColumnType = (inputParams) => {
    if (inputParams?.value?.type === 'text' || inputParams?.value?.type === 'date') {
      return (
        <Typography variant='inherit'>
          {inputParams?.value?.value}
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
      inputParams?.value?.type === 'signature'
    ) {
      let valueList = inputParams?.value?.file_ids
      if (inputParams?.value?.type === 'signature') valueList = [ inputParams?.value?.file_id ]

      let columnIcon
      if (inputParams?.value?.type === 'file') columnIcon = (
        <IconInsertDriveFile 
          color='primary'
          fontSize='small'
        />
      )
      else if (inputParams?.value?.type === 'photo') columnIcon = (
        <IconImage 
          color='primary'
          fontSize='small'
        />
      )
      else if (inputParams?.value?.type === 'signature') columnIcon = (
        <IconGesture 
          color='primary'
          fontSize='small'
        />
      )
      
      return (
        <Stack
          spacing='8px'
          padding='8px 0px'
          className='cursorPointer'
          onClick={() => setMediasPreviewObject(inputParams.value)}
        >
          {valueList?.slice(0, 1)?.map((item, index) => (
            <Stack
              key={index}
              direction='row'
              spacing='8px'
              alignItems='center'
            >
              {/* ICON */}
              {columnIcon}

              {/* TEXT */}
              <Typography 
                variant='inherit'
                className='heightFitContent'
                color='primary.main'
              >
                {item}
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
    if (
      formTemplateDetail && formTemplateDetail?.fields?.length > 0 &&
      !areDynamicColumnTitlesAdded
    ) {
      const newColumnList = [ ...columnList, ...formTemplateDetail?.fields?.map(item => {
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

      setColumnList(newColumnList)
      setAreDynamicColumnTitlesAdded(true)
    }
  }

  const updateTableDataDynamically = () => {
    // NOTE: DYNAMIC COLUMNS START FROM THE 3RD INDEX
    if (
      columnList.length > 3 && tableData.length > 0 && 
      areDynamicColumnTitlesAdded && !areDynamicColumnsValuesAdded
    ) {
      const dynamicColumnList = columnList.filter((item, index) => index > 2)

      const newTableData = tableData.map((tableRowItem) => {
        const columnWithValueObject = dynamicColumnList.reduce((result, columnItem) => {
          result[columnItem.field] = tableRowItem?.values?.[columnItem.field]
          return result
        }, {})

        return {
          ...tableRowItem,
          ...columnWithValueObject,
        }
      })

      setAreDynamicColumnsValuesAdded(true)
      setTableData(newTableData)
    }
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

    getSubmissionList(isMounted, abortController)

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
  }, [columnList, tableData, areDynamicColumnTitlesAdded])

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
            rows={tableData}
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
        mediasPreviewObject={mediasPreviewObject}
        setMediasPreviewObject={setMediasPreviewObject}
      />
    </>
  )
}

export default FormsSubmissions