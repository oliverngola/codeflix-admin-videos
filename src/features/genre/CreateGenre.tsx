import { useEffect, useState } from "react";
import { Box, Paper, Typography } from "@mui/material";
import { useSnackbar } from "notistack";

import { initialState, useCreateGenreMutation, useGetCaTegoriesQuery } from "./genreSlice";
import { GenreForm } from "./components/GenreForm";
import { Genre } from "../../types/Genre";
import { mapGenreToForm } from "./util";

export const CreateGenre = () => {
  const { enqueueSnackbar } = useSnackbar();
  const {data: categories} = useGetCaTegoriesQuery();
  const [createGenre, status] = useCreateGenreMutation();
  const [genreState, setGenreState] = useState<Genre>(initialState)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setGenreState((state) => ({ ...state, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await createGenre(mapGenreToForm(genreState));
  };

  useEffect(() => {
    if (status.isSuccess) {
      enqueueSnackbar("Genre created", { variant: "success" });
      setGenreState(initialState);
    } 
    if (status.isError) {
      enqueueSnackbar("Error creating genre", { variant: "error" });
    }
  }, [status, enqueueSnackbar]);

  return (
    <Box>
      <Paper>
        <Box p={4}>
          <Box mb={2}>
            <Typography variant="h4">Create Genre</Typography>
          </Box>
        </Box>

        <GenreForm
          genre={genreState}
          categories={categories?.data}
          isLoading={status.isLoading}
          isDisabled={status.isLoading}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      </Paper>
    </Box>
  )
};