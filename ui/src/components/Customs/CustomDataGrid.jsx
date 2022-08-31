// MUIS
import { styled } from '@mui/material/styles'

// MUI DATA GRID
import { DataGrid } from '@mui/x-data-grid'

const checkboxCellWidth = 64

const CustomDataGrid = styled(({ className, componentsProps, ...props }) => (
  <DataGrid
    checkboxSelection
    //checkboxSelectionVisibleOnly
    rowHeight={48}
    headerHeight={48}
    pagination
    rowsPerPageOptions={[ 5, 10, 15, 25, 50, 100, 250, 500, 1000 ]}
    disableColumnMenu
    componentsProps={{
      ...componentsProps,
      pagination: {
        SelectProps: {
          MenuProps: {
            sx: {
              '& .MuiMenuItem-root': {
                fontSize: 12,
              },
            },
          },
        },
      },
    }}
    {...props}
    className={className}
  />
))(({ theme }) => ({
  border: 'none',
  fontSize: 12,
  color: theme.palette.text.primary,

  // HEADER
  '& .MuiDataGrid-columnHeader:focus': {
    outline: 'none',
  },
  '& .MuiDataGrid-columnHeader:focus-within': {
    outline: 'none',
  },
  '& .MuiDataGrid-sortIcon': {
    color: theme.palette.primary.main,
  },
  '& .MuiDataGrid-columnHeaderTitleContainer': {
    padding: 0,
  },
  '& .MuiDataGrid-columnHeaderTitle': {
    fontWeight: 500,
  },
  '& .MuiDataGrid-pinnedColumnHeaders': {
    boxShadow: 'none',
    backgroundColor: 'transparent',
  },
  '& .MuiDataGrid-iconSeparator': {
    display: 'none',
  },
  '& .MuiDataGrid-columnHeaderCheckbox': {
    minWidth: `${checkboxCellWidth}px !important`,
  },

  // COLUMN (INTENTIONALLY COMMENTED)
  // '& .MuiDataGrid-pinnedColumns': {
  //   boxShadow: 'none',
  //   backgroundColor: 'unset',
  //   '& .MuiDataGrid-cell': {
  //     padding: 0,
  //   },
  // },
  // '[data-field="actions"] > *': {
  //   display: 'none',
  // },
  // '.MuiDataGrid-row.Mui-hovered [data-field="actions"] > *': {
  //   display: 'flex',
  // },

  // ROW (INTENTIONALLY COMMENTED)
  // '& .MuiDataGrid-row:hover': {
  //   backgroundColor: theme.palette.grey[100],
  // },
  // '& .MuiDataGrid-row.Mui-hovered': {
  //   backgroundColor: theme.palette.grey[100],
  // },
  // '& .MuiDataGrid-row.Mui-selected': {
  //   // NOTE: THIS MUST BE SET MANUALLY
  //   backgroundColor: '#FFF3F1',
  // },
  // '& .MuiDataGrid-row.Mui-selected:hover': {
  //   backgroundColor: theme.palette.grey[100],
  // },
  // '& .MuiDataGrid-row.Mui-selected.Mui-hovered': {
  //   backgroundColor: theme.palette.grey[100],
  // },

  // CELL
  '& .MuiDataGrid-cellCheckbox': {
    minWidth: `${checkboxCellWidth}px !important`,
  },
  '& .MuiDataGrid-cell:focus': {
    outline: 'none',
  },
  '& .MuiDataGrid-cell:focus-within': {
    outline: 'none',
  },

  // PAGINATION
  '& .MuiTablePagination-selectLabel': {
    fontSize: 12,
  },
  '& .MuiTablePagination-select': {
    fontSize: 12,
  },
  '& .MuiTablePagination-displayedRows': {
    fontSize: 12,
  },
  '& .MuiIconButton-root': {
    padding: 8,
  },
}))

export default CustomDataGrid