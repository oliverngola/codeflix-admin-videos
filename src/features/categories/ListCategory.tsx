import { Box, Button, IconButton, Typography } from '@mui/material'
import { DataGrid, GridRowsProp, GridColDef, GridRenderCellParams, GridToolbar } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom'
import { useAppSelector } from '../../app/hooks'
import { selectCategories } from './categorySlice'

export const ListCategory = () => {
  const categories = useAppSelector(selectCategories)

  const rows: GridRowsProp = categories.map((category) => ({
    id: category.id,
    name: category.name,
    description: category.description,
    isActive: category.is_active,
    createdAt: new Date(category.created_at || "").toLocaleDateString("pt-BR"),
  }));

  const columns: GridColDef[] = [
    { 
      field: 'name',
      headerName: 'Name', 
      flex: 1,
    },
    { 
      field: 'description', 
      headerName: 'Description', 
      flex: 1,
    },
    {
      field: 'isActive',
      headerName: 'Active',
      flex: 1,
      type: 'boolean',
      renderCell: renderIsActiveCell
    },
    {
      field: 'createdAt',
      headerName: 'Created At',
      flex: 1
    },
    {
      field: 'id',
      headerName: 'Actions',
      flex: 1,
      renderCell: renderActionsCell
    }
  ];

  function renderIsActiveCell(row: GridRenderCellParams) {
    return (
      <Typography color={row.value ? "primary": "secondary"}>
        {row.value ? "Active" : "Inactive"}
      </Typography>
    )
  }

  function renderActionsCell(row: GridRenderCellParams) {
    return (
      <IconButton
        color="secondary"
        onClick={() => console.log(`Clicked`)}
        aria-label="delete"
      >
        <DeleteIcon />
      </IconButton>
    )
  }

  return (
    <Box maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box display="flex" justifyContent="flex-end">
        <Button
          variant="contained"
          color="secondary"
          component={Link}
          to="/categories/create"
          style={{ marginBottom: "1rem" }}
        >
          New Category
        </Button>
      </Box>

      <div style={{ height: 300, width: '100%' }}>
        <DataGrid 
          components={{ Toolbar: GridToolbar }}
          rowsPerPageOptions={[2, 5, 10, 20, 30, 40, 50, 100]}
          disableColumnSelector={true}
          disableColumnFilter={true}
          disableDensitySelector={true}
          rows={rows} 
          columns={columns} 
          componentsProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 500 },
            },
          }}
        />
      </div>
    </Box>
  )
}
