import { AccountCircle } from "@mui/icons-material";
import { Grid, InputAdornment, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setPersonalDetails } from "./projectDetails.reducer";

export const Details = () => {
    const { firstName, lastName, organizationName, teamName } = useSelector(state => state.projectDetails.personalDetails)
    const dispatch = useDispatch()
    const handleChange = (e) => {
        const fieldName = e.target.name;
        const value = e.target.value;
        const payload = {
            [fieldName]: value
        }
        dispatch(setPersonalDetails(payload))
    }

    return (
        <Grid container spacing={2} marginTop={"2rem"}>
            <Grid item xs={6}>
                <TextField
                    label="FirstName"
                    name="firstName"
                    value={firstName}
                    fullWidth
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <AccountCircle />
                            </InputAdornment>
                        ),
                    }}
                    onChange={handleChange}
                    variant="outlined"
                />

            </Grid>
            <Grid item xs={6}>
                <TextField
                    label="LastName"
                    name="lastName"
                    value={lastName}
                    fullWidth
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <AccountCircle />
                            </InputAdornment>
                        ),
                    }}
                    onChange={handleChange}
                    variant="outlined"
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    label="Organization Name"
                    name="organizationName"
                    value={organizationName}
                    fullWidth
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <AccountCircle />
                            </InputAdornment>
                        ),
                    }}
                    onChange={handleChange}
                    variant="outlined"
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    label="Team Name"
                    name="teamName"
                    value={teamName}
                    fullWidth
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <AccountCircle />
                            </InputAdornment>
                        ),
                    }}
                    onChange={handleChange}
                    variant="outlined"
                />
            </Grid>
        </Grid>

    )
}
