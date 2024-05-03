import React from "react";
import { Header } from "../Header";
import {
  Box,
  Drawer,
  Toolbar,
  List,
  Divider,
  ListItem,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Paper,
} from "@mui/material";
import "./index.css";
import { useSelector } from "react-redux";
import { ChatBox } from "./ChatBox";
import { EnterSmsField } from "./EnterSMSField";
import { useNavigate } from "react-router-dom";

const drawerWidth = 500;

export const ChatScreen = () => {
  const navigate = useNavigate();

  const { name, description } = useSelector(
    (state) => state.projectDetails.projectDetails
  );

  const IsGenerateReportButtonVisible = useSelector(
    (state) => state.chat.IsgenerateReportButtonVisible
  );

  const handleClick = () => {
    navigate("/projectReport");
  };

  return (
    <Box sx={{ display: "flex", height: "100%" }}>
      <Header></Header>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Box>
          <Box sx={{ overflow: "auto" }}>
            <List sx={{ padding: "10px", marginTop: "4rem" }}>
              <ListItem
                sx={{ marginBottom: "20px" }}
                key={"name"}
                disablePadding
              >
                <Paper elevation={4}>
                  <Card sx={{ width: 480 }}>
                    <CardContent>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        color={"blue"}
                      >
                        {/* {name} */}
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                        <strong>Disclaimer</strong>: Note you are interacting
                        with an AI intelligent assistant. Please do not disclose
                        any personal or sensitive information.
                      </Typography>
                    </CardContent>
                  </Card>
                </Paper>
              </ListItem>
              <ListItem
                sx={{ marginBottom: "20px" }}
                key={"name"}
                disablePadding
              >
                <Paper elevation={4}>
                  <Card sx={{ width: 480 }}>
                    <CardContent>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        color={"blue"}
                      >
                        {name}
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                        We are conducting a thorough risk analysis of the
                        project in accordance with the regulations outlined in
                        the <strong>EU AI Act</strong>.
                      </Typography>
                    </CardContent>
                    <CardActions>
                      {/* <Button size="small">Share</Button> */}
                      {/* <Button size="small" onClick={handleClick}>
                        Report
                      </Button> */}
                      {/* <Button size="small">Learn More</Button> */}
                    </CardActions>
                  </Card>
                </Paper>
              </ListItem>
              <ListItem key={"name"} disablePadding>
                <Paper elevation={4}>
                  <Card sx={{ maxWidth: 480 }}>
                    <CardContent>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        color={"blue"}
                      >
                        Project Description
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {description}
                      </Typography>
                    </CardContent>
                    {/* <CardActions>
                      <Button size="small">Share</Button>
                      <Button size="small">Learn More</Button>
                    </CardActions> */}
                  </Card>
                </Paper>
              </ListItem>
            </List>
            <Divider />
          </Box>
          <Button
            sx={{ top: "absolute", top: "3rem", m: 2 }}
            variant="contained"
            onClick={handleClick}
            enabled={IsGenerateReportButtonVisible}
          >
            Generate Report
          </Button>
        </Box>
      </Drawer>
      <Box width={"70%"}>
        <Box
          sx={{
            flexGrow: 1,
            p: 4,
            height: "80vh",
            overflow: "auto",
            marginTop: "30px",
          }}
        >
          <Toolbar />
          {/* <df-messenger
                    location="us-central1"
                    project-id="zl-chatbot"
                    agent-id="1dfebb4b-fdc5-420d-a62f-4c661f71b84c"
                    language-code="en"
                    max-query-length="-1">
                    <df-messenger-chat-bubble
                    chat-title="">
                    </df-messenger-chat-bubble>
                </df-messenger> */}
          <ChatBox></ChatBox>
        </Box>
        <Box sx={{ flexGrow: 1, p: 4, overflow: "auto",}}>
          <EnterSmsField></EnterSmsField>
        </Box>
      </Box>
    </Box>
  );
};
