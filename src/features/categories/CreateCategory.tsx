import { useState } from 'react';
import { Box, Paper, Typography } from '@mui/material'
import { Category } from './categorySlice';
import { CategoryForm } from './components/CategoryForm';

export const CreateCategory = () => {
  const [isDisabled, setIsDisabled] = useState(false);
  const [category, setCategory] = useState<Category>({
    id: "",
    name: "",
    description: "",
    is_active: false,
    deleted_at: null,
    created_at: "",
    updated_at: "",
  })

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {}

  function handleToggle(event: React.ChangeEvent<HTMLInputElement>) {}

  return (
    <Box>
      <Paper>
        <Box p={4}>
          <Box mb={2}>
            <Typography variant="h4">Create Category</Typography>
          </Box>
        </Box>

        <CategoryForm
          category={category}
          isDisabled={isDisabled}
          handleChange={handleChange}
          handleToggle={handleToggle}
          onSubmit={(e) => {
            e.preventDefault();
          }}
        />
      </Paper>
    </Box>
  )
}
