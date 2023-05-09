import { Box, SxProps } from '@mui/material'
import { DataGrid, GridColumnVisibilityModel } from '@mui/x-data-grid'

interface KiboDataTableProps {
  columns: any[]
  rows: any[]
  columnVisibilityModel?: GridColumnVisibilityModel
  loading?: boolean
  sx?: SxProps<any>
}

const KiboDataTable = (props: KiboDataTableProps) => {
  const { columns, rows, columnVisibilityModel, loading, sx } = props

  return (
    <Box
      sx={{
        width: '100%',
        '& .MuiDataGrid-root': {
          border: 'none',
        },
        '& .MuiDataGrid-columnHeadersInner .div': {
          width: '100%',
        },
        '& .super-app-theme--header': {
          backgroundColor: '#F7F7F7',
        },
        '& .MuiDataGrid-columnSeparator': {
          display: 'none',
        },
        ...sx,
      }}
    >
      <DataGrid
        columnVisibilityModel={columnVisibilityModel}
        columns={columns}
        disableColumnMenu
        hideFooterPagination
        hideFooterSelectedRowCount
        rows={rows}
        loading={loading}
      />
    </Box>
  )
}

export default KiboDataTable
