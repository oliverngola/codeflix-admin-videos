import { Box, Button, IconButton, Typography } from '@mui/material'
import { DataGrid, GridRowsProp, GridColDef, GridRenderCellParams, GridToolbar } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { useAppDispatch } from '../../app/hooks'
import { useDeleteCategoryMutation, useGetCategoriesQuery } from './categorySlice'
import { useEffect } from 'react';

export const ListCategory = () => {
  const { data, isFetching, error } = useGetCategoriesQuery()
  const [deleteCategory, deleteCategoryStatus] = useDeleteCategoryMutation();

  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const componentProps = {
    toolbar: {
      showQuickFilter: true,
      quickFilterProps: { debounceMs: 500 },
    },
  }

  const rows: GridRowsProp = data ? data.data.map((category) => ({
    id: category.id,
    name: category.name,
    description: category.description,
    isActive: category.is_active,
    createdAt: new Date(category.created_at || "").toLocaleDateString("pt-BR"),
  })) : [];

  const columns: GridColDef[] = [
    { 
      field: 'name',
      headerName: 'Name', 
      flex: 1,
      renderCell: renderNameCell
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

  function renderNameCell(rowData: GridRenderCellParams) {
    return (
      <Link 
        style={{textDecoration: 'none'}}
        to={`/categories/edit/${rowData.id}`}
      >
        <Typography color="primary">
          {rowData.value}
        </Typography>
      </Link>
    )
  }

  function renderIsActiveCell(row: GridRenderCellParams) {
    return (
      <Typography color={row.value ? "primary": "secondary"}>
        {row.value ? "Active" : "Inactive"}
      </Typography>
    )
  }

  async function handleDeleteCategory(id: string) {
    await deleteCategory({ id });
  }

  useEffect(() => {
    if (deleteCategoryStatus.isSuccess) {
      enqueueSnackbar('Category deleted successfully!', { variant: 'success' });
    } else if (deleteCategoryStatus.error) {
      enqueueSnackbar('Error deleting category!', { variant: 'error' });
    }
  }, [deleteCategoryStatus, enqueueSnackbar]);

  function renderActionsCell(params: GridRenderCellParams) {
    return (
      <IconButton
        color="secondary"
        onClick={() => handleDeleteCategory(params.value)}
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

      <Box sx={{ display: "flex", height: 600 }}>
        <DataGrid 
          rows={rows} 
          columns={columns} 
          disableColumnFilter={true}
          disableColumnSelector={true}
          disableDensitySelector={true}
          disableSelectionOnClick={true}
          componentsProps={componentProps}
          components={{ Toolbar: GridToolbar }}
          rowsPerPageOptions={[5, 10, 20, 30, 40, 50, 100]}
        />
      </Box>
    </Box>
  )
}
