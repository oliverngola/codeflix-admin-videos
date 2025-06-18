import { Box, Grid, FormControl, TextField, Button, Autocomplete } from "@mui/material";
import { Link } from "react-router-dom";
import { Category } from "../../../types/Category";
import { Genre } from "../../../types/Genre";

type Props = {
  genre: Genre;
  categories?: Category[];
  isLoading?: boolean;
  isDisabled?: boolean;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};

export const GenreForm = ({
  genre,
  categories,
  isLoading=false,
  isDisabled=false,
  handleChange,
  handleSubmit,
}: Props) => {
  return (
    <Box p={2}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <TextField
                required
                name="name"
                label="Name"
                value={genre.name}
                disabled={isDisabled}
                onChange={handleChange}
                inputProps={{ "data-testid": "name" }}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <Autocomplete
              multiple
              data-testid="categories-search"
              loading={isLoading}
              options={categories || []}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              value={genre.categories}
              disabled={isDisabled || !categories}
              getOptionLabel={(option) => option.name}
              renderOption={(props, option) => (
                <li {...props} key={option.id}>
                  {option.name}
                </li>
              )}
              onChange={(e, newValue) => {
                handleChange({
                  target: { name: "categories", value: newValue },
                } as any);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Categories"
                  data-testid="categories-input"
                />
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <Box display="flex" gap={2}>
              <Button variant="contained" component={Link} to="/genres">
                Back
              </Button>

              <Button
                type="submit"
                variant="contained"
                color="secondary"
                disabled={isDisabled || isLoading}
              >
                {isLoading ? "Loading..." : "Save"}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}