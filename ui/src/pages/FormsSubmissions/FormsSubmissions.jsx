import { useState } from 'react'

// COMPONENTS
import AppBar from 'components/AppBar/AppBar'
import DataGridFilters from 'components/DataGridFilters/DataGridFilters'
import DataGridTable from 'components/DataGridTable/DataGridTable'
import LoadingPaper from 'components/LoadingPaper/LoadingPaper'

// CONSTANTS
import { dummyTableData } from './FormsSubmissionsConstants'

// MUIS
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

// MUI ICONS
import LinkIcon from '@mui/icons-material/Link'

// STYLES
import useStyles from './formsSubmissionsUseStyles'

const FormsSubmissions = () => {
  // STYLES
  const classes = useStyles()

  // INITS
  const initialColumns = [
    {
      field: 'source',
      headerName: 'Source',
      headerClassName: 'cell-source-custom',
      cellClassName: 'cell-source-custom',
      flex: 0,
      width: 140,
      hide: false,
      areFilterAndSortShown: true,
    },
    {
      field: 'submissionDate',
      headerName: 'Submission Date',
      flex: 0,
      minWidth: 200,
      hide: false,
      areFilterAndSortShown: true,
    },
    {
      field: 'submissionAddress',
      headerName: 'Submission Address',
      flex: 1,
      minWidth: 200,
      hide: false,
      areFilterAndSortShown: true,
    },
    {
      field: 'submissionPlaces',
      headerName: 'Submission Places',
      flex: 1,
      minWidth: 200,
      hide: false,
      areFilterAndSortShown: true,
    },
    {
      field: 'form',
      headerName: 'Form',
      flex: 0,
      minWidth: 180,
      hide: false,
      areFilterAndSortShown: true,
    },
  ]
  const initialFilters = {}

  // CONTENT
  const [ isDataGridLoading, setIsDataGridLoading ] = useState(false)
  // DATA GRID - BASE
  const [ selectedColumnList, setSelectedColumnList ] = useState(initialColumns)
  const [ tableData, setTableData ] = useState(dummyTableData)
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
  // DATA GRID - SELECTION
  const [ selectionModel, setSelectionModel ] = useState([])

  // SET URL TEXT FIELD
  const setUrlTextfield = (url) => {
    if(url.length <= 24) return url
    else return `${url.slice(0, 24)}...`
  }

  // HANDLE BUTTON COPY CLICK
  const handleButtonCopyClick = (event, url) => {
    navigator.clipboard.writeText(url)
  }

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
                Valid Form
              </Typography>

              {/* DESCRIPTION */}
              <Typography
                color='text.secondary'
                variant='caption'
              >
                Ini adalah deskripsi form
              </Typography>
            </Box>

            {/* HEADER RIGHT */}
            <Stack
              className={classes.headerRight}
              alignItems='center'
              direction='row'
              flexWrap='nowrap'
            >
              <Stack
                className={classes.iconCopyWrap}
                alignItems='center'
                justifyContent='center'
              >
                <LinkIcon className={classes.iconCopy}/>
              </Stack>

              <Typography
                className={classes.fieldUrl}
                color='text.secondary'
                variant='caption'
              >
                {setUrlTextfield('http://www.worx.id/xform-submit')}
              </Typography>

              <Button
                className={classes.buttonCopy}
                onClick={(event) => handleButtonCopyClick(event, 'http://www.worx.id/xform-submit')}
              >
                Copy
              </Button>
            </Stack>
          </Stack>

          <DataGridFilters
            // COLUMN
            columns={initialColumns}
            selectedColumnList={selectedColumnList}
            setSelectedColumnList={setSelectedColumnList}
            // FILTER
            isFilterOn={isFilterOn}
            setIsFilterOn={setIsFilterOn}
            // TEXT
            //contentTitle=''
            // EDIT
            //isEditButtonEnabled={selectionModel.length === 1}
            //handleEditButtonClick={() => console.log('edit')}
            // EDIT
            //isDeleteButtonEnabled={selectionModel.length > 0}
            //handleDeleteButtonClick={() => console.log('delete')}
          />

          <DataGridTable
            // BASE
            initialColumns={initialColumns}
            selectedColumnList={selectedColumnList}
            setSelectedColumnList={setSelectedColumnList}
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
          />
        </LoadingPaper>
      </Stack>
    </>
  )
}

export default FormsSubmissions