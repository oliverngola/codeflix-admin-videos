import { useEffect, useRef, useState } from "react";
import { Box, Paper, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { Video } from "../../types/Video";
import { VideosForm } from "./components/VideosForm";
import { Category } from "../../types/Category";
import { mapVideoToForm } from "./util";
import {
  initialState,
  useCreateVideoMutation,
  useGetAllCastMembersQuery,
  useGetAllCategoriesQuery,
  useGetAllGenresQuery,
} from "./videoSlice";

export const CreateVideo = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { data: genres } = useGetAllGenresQuery();
  const { data: castMembers } = useGetAllCastMembersQuery();
  const [createVideo, status] = useCreateVideoMutation();
  const [videoState, setVideoState] = useState<Video>(initialState);
  const [uniqueCategories, setUniqueCategories] = useState<Category[]>([]);
  const categoriesToKeepRef = useRef<Category[] | undefined>(undefined);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setVideoState((state) => ({ ...state, [name]: value }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const { id, ...payload } = mapVideoToForm(videoState);
    try {
      await createVideo(payload);
    } catch (e) {
      console.log(e);
    }
  }

  const filterById = (
    category: Category | undefined,
    index: number,
    self: (Category | undefined)[]  
  ): boolean => index === self.findIndex((c) => c?.id === category?.id);

  useEffect(() => {
    const uniqueCategories = videoState.genres?.flatMap(({ categories }) => categories)
      .filter(filterById) as Category[];
    setUniqueCategories(uniqueCategories);
  }, [videoState.genres]);

  useEffect(() => {
    categoriesToKeepRef.current = videoState.categories?.filter((category) => 
      uniqueCategories.find((c) => c.id === category.id)
    );
  }, [uniqueCategories, videoState.categories]);

  useEffect(() => {
    setVideoState((state) => ({
      ...state,
      categories: categoriesToKeepRef.current,
    }));
  }, [uniqueCategories, setVideoState]);

  useEffect(() => {
    if (status.isSuccess) {
      enqueueSnackbar(`Video created`, { variant: "success" });
    }

    if (status.isError) {
      enqueueSnackbar(`Error creating Video`, { variant: "error" });
    }
  }, [status, enqueueSnackbar]);

  return (
    <Box>
      <Paper>
        <Box p={2}>
          <Box mb={2}>
            <Typography variant="h4">Create Video</Typography>
          </Box>
        </Box>

        <VideosForm
          video={videoState}
          genres={genres?.data}
          isLoading={status.isLoading}
          isDisabled={status.isLoading}
          categories={uniqueCategories}
          castMembers={castMembers?.data}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      </Paper>
    </Box>
  );
};