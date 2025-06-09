import { useState } from 'react';
import { Link, useParams } from 'react-router-dom'
import { Box, Button, FormControl, FormGroup, FormControlLabel, Grid, Paper, Switch, TextField, Typography } from '@mui/material'
import { selectCategoryById } from './categorySlice';
import { useAppSelector } from '../../app/hooks';

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

        <Box p={2}>
          <form>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <TextField
                    required
                    label="Name"
                    name="name"
                    value={category.name}
                    disabled={isDisabled}
                    onChange={handleChange}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth>
                  <TextField
                    required
                    label="Description"
                    name="description"
                    value={category.description}
                    disabled={isDisabled}
                    onChange={handleChange}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Switch
                        name="is_active"
                        color="secondary"
                        checked={category.is_active}
                        onChange={handleToggle}
                        inputProps={{ 'aria-label': 'controlled' }}
                      />
                    }
                    label="Active"
                  />
                </FormGroup>
              </Grid>

              <Grid item xs={12}>
                <Box display="flex" gap={2}>
                  <Button variant="contained" component={Link} to="/categories">
                    Back
                  </Button>

                  <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                    disabled={isDisabled}
                    onClick={() => setIsDisabled(true)}
                  >
                    Save
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Paper>
    </Box>
  )
}
