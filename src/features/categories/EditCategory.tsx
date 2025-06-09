import { useState } from 'react';
import { useParams } from 'react-router-dom'
import { Box, Paper, Typography } from '@mui/material'
import { selectCategoryById } from './categorySlice';
import { useAppSelector } from '../../app/hooks';
import { CategoryForm } from './components/CategoryForm';

export const EditCategory = () => {
  const id = useParams().id || '';
  const [isDisabled, setIsDisabled] = useState(false);
  const category = useAppSelector((state) => selectCategoryById(state, id));

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {}

  function handleToggle(event: React.ChangeEvent<HTMLInputElement>) {}

  return (
    <Box>
      <Paper>
        <Box p={4}>
          <Box mb={2}>
            <Typography variant="h4">Edit Category</Typography>
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
