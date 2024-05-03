import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { grey } from "@mui/material/colors";
import { useDispatch } from "react-redux";
import { setUserCredentials } from "./login.reducer";
import { Header } from "../Header";
import { Card, CardActions, CardContent, CardMedia } from "@mui/material";

const defaultTheme = createTheme();

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const credentials = {
      username: data.get("username"),
      password: data.get("password"),
    };
    dispatch(setUserCredentials(credentials));
    navigate("/projectDetails");
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Header></Header>
      <Box sx={{ display: "flex", flexGrow: 1, mt: 10, ml: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={8} md={12} mt={"3rem"}>
            <Card component={Paper} elevation={8}>
              {/* <CardMedia
                component="img"
                height="140"
                image="Responsible-AI.png"
              /> */}
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  padding={"20px"}
                  color={"blue"}
                >
                  Responsible AI
                </Typography>
                <Typography
                  variant="body1"
                  // color="text.secondary"
                  paddingLeft={"20px"}
                >
                  Responsible Artificial Intelligence (Responsible AI) is an
                  approach to developing, assessing, and deploying AI systems in
                  a safe, trustworthy, and ethical way. AI systems are the
                  product of many decisions made by those who develop and deploy
                  them. From system purpose to how people interact with AI
                  systems, Responsible AI can help proactively guide these
                  decisions toward more beneficial and equitable outcomes. That
                  means keeping people and their goals at the center of system
                  design decisions and respecting enduring values like fairness,
                  reliability, and transparency.
                </Typography>
                <Typography
                  gutterBottom
                  variant="h5"
                  marginTop={"40px"}
                  paddingLeft={"20px"}
                  color={"blue"}
                >
                  Why Consci AI
                </Typography>
                <Typography paddingLeft={"20px"}>
                  <ol style={{ padding: "20px" }}>
                    <li>
                      <strong> Compliance with EU AI Act:</strong> We evaluate
                      your AI project in accordance with the EU AI Act, the
                      pioneering legal framework addressing AI risks.
                    </li>
                    <li style={{ marginTop: "5px" }}>
                      <strong> Interactive Virtual Assistant Analysis:</strong>{" "}
                      Utilize our virtual assistant for a comprehensive analysis
                      of your project's AI components.
                    </li>
                    <li style={{ marginTop: "5px" }}>
                      <strong>Responsible AI Report & Certification:</strong>{" "}
                      Obtain a detailed report and certification in Responsible
                      AI, aligning with EU AI Act standards.
                    </li>
                  </ol>
                </Typography>
                <Typography
                  gutterBottom
                  variant="h5"
                  marginTop={"40px"}
                  paddingLeft={"20px"}
                  color={"blue"}
                >
                  Steps to Certification
                </Typography>
                <Typography paddingLeft={"20px"}>
                  <ol style={{ padding: "20px" }}>
                    <li>
                      <strong>Provide Project Details:</strong> Fill out
                      essential information regarding your project's AI
                      implementation.
                    </li>
                    <li style={{ marginTop: "5px" }}>
                      <strong>
                        {" "}
                        Engage with our Intelligent Virtual Assistant:
                      </strong>{" "}
                      Answer questions and providing insights into your
                      project's AI design and intentions.
                    </li>
                    <li style={{ marginTop: "5px" }}>
                      <strong>Review and Generate Report:</strong> Review the
                      generated report summarizing your project's compliance
                      with Responsible AI principles.
                    </li>
                    <li style={{ marginTop: "5px" }}>
                      <strong>Receive Certification:</strong> Upon successful
                      completion, receive your certification verifying your
                      project's adherence to Responsible AI guidelines.
                    </li>
                  </ol>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          {/* <Grid item xs={6} md={6} style={{ display: "flex" }}>
            <Card component={Paper} elevation={8} style={{ height: "100%" }}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Importance of Risk Analysis / Vision
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  The AI Act is a significant step towards ensuring the
                  responsible development and deployment of AI systems in the
                  EU. The risk-based approach is essential for identifying and
                  mitigating potential risks associated with AI projects, and it
                  is critical for building trust in AI systems and ensuring that
                  they are developed and deployed in a way that respects
                  fundamental rights and promotes safety and security.
                  <ul style={{ paddingLeft: "20px" }}>
                    <li>
                      <strong>Protection of Fundamental Rights:</strong>
                    </li>
                    <li>
                      <strong>Safety and Security:</strong>
                    </li>
                    <li>
                      <strong>Transparency and Explainability:</strong>
                    </li>
                    <li>
                      <strong>Compliance and Enforcement:</strong>
                    </li>
                  </ul>
                </Typography>
              </CardContent>
            </Card>
          </Grid> */}
          {/* <Grid item xs={6} md={6} style={{ display: "flex" }}>
            <Card component={Paper} elevation={8} style={{ height: "100%" }}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  The State of AI in Business
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  According to a Forbes Advisor survey, businesses are using AI
                  tools in the following ways:
                  <ul style={{ padding: "20px" }}>
                    <li>
                      56% are using AI to improve and perfect business
                      operations.
                    </li>
                    <li>
                      51% are turning to AI to help with cybersecurity and fraud
                      management.
                    </li>
                    <li>
                      47% harness AI tools in the form of digital personal
                      assistants.
                    </li>
                    <li>
                      46% are using AI for customer relationship management.
                    </li>
                    <li>45% of firms are still in the exploration phase.</li>
                  </ul>
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Share</Button>
                <Button size="small">Learn More</Button>
              </CardActions>
            </Card>
          </Grid> */}
        </Grid>
        <Box
          sx={{
            my: 6,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="User Name"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};
