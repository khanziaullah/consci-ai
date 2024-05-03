import { Grid, Input, InputLabel } from "@mui/material";
import { blue, grey } from "@mui/material/colors";
import { useDispatch, useSelector } from "react-redux";
import { setArchitectureDetails } from "./projectDetails.reducer";

export const Architechture = () => {
    const { summary } = useSelector(state => state.projectDetails.architecture)

    const dispatch = useDispatch()
    const handleChange = (e) => {
        const fieldName = e.target.name;
        const value = e.target.value;
        const payload = {
            [fieldName]: value
        }
        dispatch(setArchitectureDetails(payload))
    }

    return (
        <Grid container spacing={2} marginTop={"2rem"}>
            <Grid item xs={12}>
                <InputLabel>Architecture</InputLabel>
                <Input sx={{
                    minWidth: "100%",
                    "&:focus": {
                        borderColor: blue[400]
                    },
                    "&:hover": {
                        borderColor: grey[400]
                    },
                    border: `1px solid ${grey[200]}`,
                }} multiline minRows={5} name="summary" value={summary} onChange={handleChange}></Input>
            </Grid>
        </Grid>

    )
}