import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import { Box, Paper, Typography } from '@mui/material'
import { useSnackbar } from 'notistack';
import { Category, initialState, useGetCategoryQuery, useUpdateCategoryMutation } from './categorySlice';
import { CategoryForm } from './components/CategoryForm';

export const EditCategory = () => {
  const { enqueueSnackbar } = useSnackbar();
  const id = useParams().id || '';
  const { data: category, isFetching } = useGetCategoryQuery({ id });
  const [isDisabled, setIsDisabled] = useState(false);
  const [updateCategory, status] = useUpdateCategoryMutation();
  const [categoryState, setCategoryState] = useState<Category>(initialState);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await updateCategory(categoryState);
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setCategoryState({...categoryState, [name]: value });
  }

  function handleToggle(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, checked } = event.target;
    setCategoryState({...categoryState, [name]: checked });
  }

  useEffect(() => {
    if (category) {
      setCategoryState(category.data);
    }
  }, [category]);

  useEffect(() => {
    if (status.isSuccess) {
      enqueueSnackbar('Category updated successfully!', { variant: 'success' });
      setIsDisabled(true);
    }
    if (status.error) {
      enqueueSnackbar('Error updating category!', { variant: 'error' });
    }
  }, [status.error, status.isSuccess, enqueueSnackbar]);

  return (
    <Box>
      <Paper>
        <Box p={4}>
          <Box mb={2}>
            <Typography variant="h4">Edit Category</Typography>
          </Box>
        </Box>

        <CategoryForm
          category={categoryState}
          isDisabled={status.isLoading}
          handleChange={handleChange}
          handleToggle={handleToggle}
          handleSubmit={handleSubmit}
        />
      </Paper>
    </Box>
  )
}
