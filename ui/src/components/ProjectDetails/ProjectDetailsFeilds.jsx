import { AccountCircle, Event } from "@mui/icons-material";
import {
  Grid,
  Input,
  InputAdornment,
  InputLabel,
  TextField,
} from "@mui/material";
import { blue, grey } from "@mui/material/colors";
import { useDispatch, useSelector } from "react-redux";
import { setProjectDetails } from "./projectDetails.reducer";

export const ProjectDetailsTextBox = () => {
  const { name, description, techStack, mlLibraries, architecture } =
    useSelector((state) => state.projectDetails.projectDetails);

  const dispatch = useDispatch();
  const handleChange = (e) => {
    const fieldName = e.target.name;
    const value = e.target.value;
    const payload = {
      [fieldName]: value,
    };
    dispatch(setProjectDetails(payload));
  };

  return (
    <Grid container spacing={2} marginTop={"2rem"}>
      <Grid item xs={12}>
        <TextField
          label="Project Name"
          name="name"
          value={name}
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                {/* <AccountCircle /> */}
                {/* <Event /> */}
              </InputAdornment>
            ),
          }}
          onChange={handleChange}
          variant="outlined"
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          fullWidth
          label="Tech Stack"
          name="techStack"
          placeholder="e.g. python, Langchain"
          value={techStack}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                {/* <AccountCircle /> */}
              </InputAdornment>
            ),
          }}
          onChange={handleChange}
          variant="outlined"
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          fullWidth
          label="Names of ML libraries used"
          name="mlLibraries"
          placeholder="e.g. sci kit learn, pytorch"
          value={mlLibraries}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                {/* <AccountCircle /> */}
              </InputAdornment>
            ),
          }}
          onChange={handleChange}
          variant="outlined"
        />
      </Grid>

      <Grid item xs={12}>
        <InputLabel>Project Description</InputLabel>
        <Input
          sx={{
            minWidth: "100%",
            "&:focus": {
              borderColor: blue[400],
            },
            "&:hover": {
              borderColor: grey[400],
            },
            border: `1px solid ${grey[200]}`,
          }}
          multiline
          minRows={5}
          name="description"
          value={description}
          onChange={handleChange}
        ></Input>
      </Grid>
      <Grid item xs={12}>
        <InputLabel>Architecture</InputLabel>
        <Input
          sx={{
            minWidth: "100%",
            "&:focus": {
              borderColor: blue[400],
            },
            "&:hover": {
              borderColor: grey[400],
            },
            border: `1px solid ${grey[200]}`,
          }}
          multiline
          minRows={5}
          name="architecture"
          value={architecture}
          onChange={handleChange}
        ></Input>
      </Grid>
    </Grid>
  );
};
