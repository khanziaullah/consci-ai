import React, { useEffect, useState } from "react";
import { Header } from "../Header";
import {
  Container,
  Typography,
  List,
  ListItem,
  Grid,
  Paper,
  Button,
} from "@mui/material";
import Pyramid from "./Pyramid";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ReportPage = () => {
  const { projectDetails } = useSelector((state) => state.projectDetails);
  // const projectSummary = useSelector((state) => state.chat.finalMessage);
  const chat = useSelector((state) => state.chat);
  const [classifiedRiskCategory, setClassifiedRiskCategory] =
    useState("not defined");
  const [sumup, setSumup] = useState("");
  const nextStepsToShow = useSelector((state) => state.nextSteps);

  const navigate = useNavigate();
  const [parts, setParts] = useState("");
  const summary = parts[2];
  // const summary =
  //   "Our AI project aims to develop a natural language processing model capable of understanding and generating human-like text. \
  //   Leveraging state - of - the - art deep learning techniques, our model analyzes vast amounts of text data to learn patterns \
  //   and semantics, ultimately enabling it to generate coherent and contextually relevant responses. ";

  const handleClick = () => {
    navigate("/certificate");
  };

  useEffect(() => {
    if (!chat) return;
    console.log(chat.classified_risk_category);
    setClassifiedRiskCategory(chat.classified_risk_category);
    if (chat.messages && chat.messages.length > 9)
      setSumup(chat.messages[9].text.split("**")[2]);
  }, [chat]);

  return (
    <>
      <Header />
      <Grid container spacing={0}>
        <Grid
          item
          xs={12}
          style={{
            marginTop: "180px",
            paddingLeft: "300px",
            paddingRight: "300px",
            // borderLeft: "2px solid blue",
            // backgroundColor: "rgba(130, 200, 240, 0.5)",
          }}
        >
          <Typography
            variant="h4"
            align="left"
            gutterBottom
            style={{ color: "blue" }}
          >
            <strong>Project Overview</strong>
          </Typography>
          <Typography
            variant="body1"
            align="left"
            gutterBottom
            style={{
              marginTop: "30px",
              // borderLeft: "2px solid blue",
              // backgroundColor: "rgba(130, 200, 240, 0.5)",
            }}
          >
            <strong>Summary of Conversation: </strong> {sumup}
          </Typography>
        </Grid>
        <Grid
          container
          spacing={2}
          item
          xs={12}
          style={{
            marginTop: "50px",
            paddingLeft: "300px",
            paddingRight: "300px",
            height: "auto",
            minHeight: "380px",
            // backgroundColor: "rgba(130, 200, 240, 0.8",
            // marginTop: "10px",
          }}
        >
          <Grid item xs={12} md={6} style={{ paddingRight: "20px" }}>
            <Typography
              variant="h4"
              align="left"
              gutterBottom
              style={{ marginBottom: "40px", color: "blue" }}
            >
              <strong>Risk Category</strong>
            </Typography>
            <Pyramid classifiedRiskCategory={classifiedRiskCategory} />
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            style={{ marginTop: "80px", paddingLeft: "80px" }}
          >
            <Typography variant="body1" align="left" gutterBottom>
              Following the guidelines outlined in the EU AI Act, your project
              has been categorized as{" "}
              <strong> {classifiedRiskCategory}. </strong> Detailed explanations
              of the risks associated with each category are_
            </Typography>
            <Typography
              variant="body1"
              align="left"
              gutterBottom
              style={{ marginTop: "10px", paddingLeft: "20px" }}
            >
              <ol>
                <li>
                  {" "}
                  <strong>Unacceptable Risk: </strong>
                  Violation of EU fundamental rights and values, Prohibition.
                </li>
                <li>
                  {" "}
                  <strong>High Risk: </strong>
                  Impact on health, safety or fundamental rights. Conformity
                  assessment, post-market monitoring, etc.
                </li>
                <li>
                  {" "}
                  <strong>Limited (Transparency) Risk: </strong>
                  Risks of Impersonation, manipulation or deception. Information
                  & Transparency Obligation
                </li>
                <li>
                  {" "}
                  <strong>Minimal Risk: </strong>
                  Common AI systems. No specific regulation.
                </li>
              </ol>
            </Typography>
          </Grid>
        </Grid>

        <Grid
          item
          xs={12}
          style={{
            marginTop: "100px",
            paddingLeft: "300px",
            paddingRight: "300px",
            // backgroundColor: "rgba(130, 200, 240, 0.5)",
            flexGrow: 1,
            minHeight: "300px",
            height: "auto",
          }}
        >
          <Typography
            variant="h4"
            align="left"
            gutterBottom
            style={{ color: "blue" }}
          >
            <strong>Further guidelines</strong>
          </Typography>
          <Typography style={{ marginTop: "30px", paddingLeft: "20px" }}>
            <ol>
              <li style={{ marginTop: "10px" }}>
                <strong>Review and Implement Recommendations:</strong>{" "}
                Thoroughly review the report findings and recommendations
                provided by Consci AI and implement any suggested actions to
                address identified risks and improve AI models.
              </li>
              <li style={{ marginTop: "10px" }}>
                <strong>Stay Informed:</strong> Stay updated on developments in
                AI regulations and best practices, both globally and locally, to
                ensure compliance with evolving standards.
              </li>
              <li style={{ marginTop: "10px" }}>
                <strong>Contribute to the AI Community:</strong> Share learnings
                and experiences with the broader AI community to contribute to
                the advancement of responsible AI practices and foster
                collaboration.
              </li>
              <li style={{ marginTop: "10px" }}>
                <strong>Regular Audits and Reviews:</strong> Conduct regular
                audits and reviews of AI systems to identify and address any
                emerging risks or issues proactively.
              </li>
            </ol>
          </Typography>
          <Button
            variant="contained"
            onClick={handleClick}
            style={{
              marginTop: "30px",
              alignContent: "center",
              marginBottom: "30px",
            }}
          >
            Get Certificate
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default ReportPage;
