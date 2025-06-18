import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Paper, Typography } from "@mui/material";
import { useSnackbar } from "notistack";

import { initialState, useGetCaTegoriesQuery, useGetGenreQuery, useUpdateGenreMutation } from "./genreSlice";
import { GenreForm } from "./components/GenreForm";
import { Genre } from "../../types/Genre";
import { mapGenreToForm } from "./util";

export const EditGenre = () => {
  const { enqueueSnackbar } = useSnackbar();
  const id = useParams().id ?? "";
  const { data: genre, isFetching } = useGetGenreQuery({ id });
  const { data: categories } = useGetCaTegoriesQuery();
  const [updateGenre, status] = useUpdateGenreMutation();
  const [genreState, setGenreState] = useState<Genre>(initialState)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setGenreState((state) => ({ ...state, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await updateGenre(mapGenreToForm(genreState));
  };

  useEffect(() => {
    if (genre) {
      setGenreState(genre.data);
    }
  }, [genre]);

  useEffect(() => {
    if (status.isSuccess) {
      enqueueSnackbar("Genre updated", { variant: "success" });
      setGenreState(initialState);
    } 
    if (status.isError) {
      enqueueSnackbar("Error updating genre", { variant: "error" });
    }
  }, [status, enqueueSnackbar]);

  return (
    <Box>
      <Paper>
        <Box p={4}>
          <Box mb={2}>
            <Typography variant="h4">Edit Genre</Typography>
          </Box>
        </Box>

        <GenreForm
          genre={genreState}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          categories={categories?.data}
          isDisabled={isFetching || status.isLoading}
          isLoading={status.isLoading || isFetching}
        />
      </Paper>
    </Box>
  )
};