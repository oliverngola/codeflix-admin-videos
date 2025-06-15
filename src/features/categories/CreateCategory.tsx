import { useEffect, useState } from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import { Category, initialState, useCreateCategoryMutation } from './categorySlice';
import { CategoryForm } from './components/CategoryForm';

export const CreateCategory = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [createCategory, status] = useCreateCategoryMutation()
  const [isDisabled, setIsDisabled] = useState(false);
  const [categoryState, setCategoryState] = useState<Category>(initialState)
  
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await createCategory(categoryState);
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
    if (status.isSuccess) {
      enqueueSnackbar('Category created successfully!', {variant: 'success'});
      setIsDisabled(true);
    }
    if (status.error) {
      enqueueSnackbar('Error creating category!', {variant: 'error'});
    }
  }, [status.error, status.isSuccess, enqueueSnackbar]);

  return (
    <Box>
      <Paper>
        <Box p={4}>
          <Box mb={2}>
            <Typography variant="h4">Create Category</Typography>
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
