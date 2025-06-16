import { Box, Button, Typography } from '@mui/material'
import { Link } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { useDeleteCastMemberMutation, useGetCastMembersQuery } from './castMembersSlice'
import { useEffect, useState } from 'react';
import { CastMembersTable } from './components/CastMembersTable';
import { GridFilterModel } from '@mui/x-data-grid';

export const ListCastMembers = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [options, setOptions] = useState({
    page: 1,
    search: "",
    perPage: 10,
    rowsPerPage: [10, 20, 30],
  });
  const { data, isFetching, error } = useGetCastMembersQuery(options)
  const [deleteCastMember, { error: deleteError, isSuccess: deleteSuccess }] = useDeleteCastMemberMutation();

  function handleOnPageChange(page: number) {
    setOptions({ ...options, page: page + 1 });
  }

  function handleOnPageSizeChange(perPage: number) {
    setOptions({ ...options, perPage });
  }

  function handleFilterChange(filterModel: GridFilterModel) {
    if (!filterModel.quickFilterValues?.length) {
      return setOptions({ ...options, search: "" });
    }

    const search = filterModel.quickFilterValues.join("");
    setOptions({ ...options, search });
  }

  async function handleDeleteCastMember(id: string) {
    await deleteCastMember({ id });
  }

  useEffect(() => {
    if (deleteSuccess) {
      enqueueSnackbar('CastMember deleted successfully!', { variant: 'success' });
    } else if (deleteError) {
      enqueueSnackbar('Error deleting CastMember!', { variant: 'error' });
    }
  }, [deleteSuccess, deleteError, enqueueSnackbar]);

  if (error) {
    return <Typography>Error Fetching CastMembers</Typography>
  }

  return (
    <Box maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box display="flex" justifyContent="flex-end">
        <Button
          variant="contained"
          color="secondary"
          component={Link}
          to="/cast-members/create"
          style={{ marginBottom: "1rem" }}
        >
          New CastMember
        </Button>
      </Box>

      <CastMembersTable
        data={data}
        isFetching={isFetching}
        perPage={options.perPage}
        rowsPerPage={options.rowsPerPage}
        handleOnPageChange={handleOnPageChange}
        handleFilterChange={handleFilterChange}
        handleOnPageSizeChange={handleOnPageSizeChange}
        handleDelete={handleDeleteCastMember}
      />
    </Box>
  )
}