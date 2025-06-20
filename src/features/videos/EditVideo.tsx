import { Box, Paper, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Video, FileObject } from "../../types/Video";
import { VideosForm } from "./components/VideosForm";
import { mapVideoToForm } from "./util";
import {
  useGetVideoQuery,
  initialState,
  useUpdateVideoMutation,
  useGetAllGenresQuery,
  useGetAllCastMembersQuery,
} from "./videoSlice";
import { useUniqueCategories } from "../../hooks/useUniqueCategories";

export function EditVideo() {
  const id = useParams<{ id: string }>().id as string;
  const { enqueueSnackbar } = useSnackbar();
  const { data: video, isFetching } = useGetVideoQuery({ id });
  const [videoState, setVideoState] = useState<Video>(initialState);
  const [updateVideo, status] = useUpdateVideoMutation();
  const { data: genres } = useGetAllGenresQuery();
  const { data: castMembers } = useGetAllCastMembersQuery();
  const [categories, setCategories] = useUniqueCategories(videoState, setVideoState);
  const [seletedFiles, setSelectedFiles] = useState<FileObject[]>([]);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setVideoState((state) => ({ ...state, [name]: value }));
  }

  function handleAddFile({ name, file }: FileObject) {
    setSelectedFiles([...seletedFiles, { name, file }]);
  }

  function handleRemoveFile(name: string) {
    setSelectedFiles(seletedFiles.filter((file) => file.name !== name));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await updateVideo(mapVideoToForm(videoState));
  }

  useEffect(() => {
    if (video) {
      setVideoState(video.data);
      setCategories(video.data.categories || []);
    }
  }, [video, setCategories]);

  useEffect(() => {
    if (status.isSuccess) {
      enqueueSnackbar(`Video updated`, { variant: "success" });
    }

    if (status.isError) {
      enqueueSnackbar(`Error updating Video`, { variant: "error" });
    }
  }, [status, enqueueSnackbar]);

  return (
    <Box>
      <Paper>
        <Box p={2}>
          <Box mb={2}>
            <Typography variant="h4">Edit Video</Typography>
          </Box>
        </Box>

        <VideosForm
          video={videoState}
          isLoading={isFetching}
          isDisabled={isFetching}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          handleAddFile={handleAddFile}
          handleRemoveFile={handleRemoveFile}
          categories={categories}
          genres={genres?.data}
          castMembers={castMembers?.data}
        />
      </Paper>
    </Box>
  );
}