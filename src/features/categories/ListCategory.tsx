import { Box, Button } from '@mui/material'
import { Link } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { useDeleteCategoryMutation, useGetCategoriesQuery } from './categorySlice'
import { useEffect, useState } from 'react';
import { CategoriesTable } from './components/CategoryTable';
import { GridFilterModel } from '@mui/x-data-grid';

export const ListCategory = () => {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [search, setSearch] = useState('');
  const [rowsPerPage] = useState([5, 10, 25, 50, 100]);

  const { data, isFetching, error } = useGetCategoriesQuery()
  const [deleteCategory, deleteCategoryStatus] = useDeleteCategoryMutation();
  const { enqueueSnackbar } = useSnackbar();

  function handleOnPageChange(page: number) {
    console.log(`Page changed to: ${page}`);
  }

  function handleFilterChange(filterModel: GridFilterModel) {
    console.log('Filter changed:', filterModel);
  }

  function handleOnPageSizeChange(perPage: number) {
    console.log(`Page size changed to: ${perPage}`);
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

      <CategoriesTable
        data={data}
        isFetching={isFetching}
        perPage={perPage}
        rowsPerPage={rowsPerPage}
        handleOnPageChange={handleOnPageChange}
        handleFilterChange={handleFilterChange}
        handleOnPageSizeChange={handleOnPageSizeChange}
        handleDelete={handleDeleteCategory}
      />
    </Box>
  )
}
