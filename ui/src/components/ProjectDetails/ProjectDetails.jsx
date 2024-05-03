import {
  Box,
  Button,
  Step,
  StepConnector,
  StepLabel,
  Stepper,
  Typography,
  stepConnectorClasses,
  styled,
} from "@mui/material";
import React, { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { Header } from "../Header";
import { useNavigate } from "react-router-dom";
import ContactEmergencyIcon from "@mui/icons-material/ContactEmergency";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import { Architechture } from "./ArchitectureField";
import { Details } from "./PersonalDetailsFields";
import { ProjectDetailsTextBox } from "./ProjectDetailsFeilds";
import { resetState } from "./projectDetails.reducer";
import { fetchInitialQuestions } from "../ChatScreen/chat.reducer";

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor:
      theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled("div")(({ theme, ownerState }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? theme.palette.grey[700] : "#ccc",
  zIndex: 1,
  color: "#fff",
  width: 50,
  height: 50,
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  ...(ownerState.active && {
    backgroundImage:
      "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
  }),
  ...(ownerState.completed && {
    backgroundImage:
      "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
  }),
}));

function ColorlibStepIcon(props) {
  const { active, completed, className } = props;
  const icons = {
    1: <ContactEmergencyIcon />,
    2: <SettingsSuggestIcon />,
    3: <AccountTreeIcon />,
  };

  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}
    >
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

ColorlibStepIcon.propTypes = {
  /**
   * Whether this step is active.
   * @default false
   */
  active: PropTypes.bool,
  className: PropTypes.string,
  /**
   * Mark the step as completed. Is passed to child components.
   * @default false
   */
  completed: PropTypes.bool,
  /**
   * The label displayed in the step icon.
   */
  icon: PropTypes.node,
};

const steps = [
  {
    name: "Project Description",
    component: <ProjectDetailsTextBox />,
  },
];

export const ProjectDetails = () => {
  const { projectDetails } = useSelector((state) => state.projectDetails);

  const [activeStep, setActiveStep] = useState(0);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSubmit = () => {
    const query = `Project Name:${projectDetails.name}\nProject Description:${projectDetails.description}\nTech Stack Used:${projectDetails.techStack}\nmachine learning Libraries used:${projectDetails.mlLibraries}\nArchitecture:${projectDetails.architecture}`;
    const payload = {
      text: query,
    };
    dispatch(fetchInitialQuestions(payload));
    navigate("/chatScreen");
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        minHeight: "100vh",
        alignItems: "center",
      }}
    >
      <Header></Header>
      <Box width={"100vw"} height={"70vh"}>
        <Box
          sx={{
            width: "100vw",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            color: "blue",
          }}
        >
          <Stepper
            activeStep={activeStep}
            sx={{ width: "60vw" }}
            connector={<ColorlibConnector />}
          >
            {steps.map(({ name }, index) => {
              const stepProps = {};
              return (
                <Step key={name} {...stepProps}>
                  <StepLabel
                    StepIconComponent={ColorlibStepIcon}
                    style={{ color: "blue", fontSize: "20px" }}
                  >
                    <Typography
                      gutterBottom
                      variant="h5"
                      padding={"20px"}
                      color={"blue"}
                    >
                      {name}
                    </Typography>
                  </StepLabel>
                </Step>
              );
            })}
          </Stepper>
          <React.Fragment>
            <Box sx={{ flexGrow: 1, width: "50%", justifyContent: "center" }}>
              {steps[activeStep].component}
            </Box>

            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button
                variant="contained"
                onClick={
                  activeStep === steps.length - 1 ? handleSubmit : handleNext
                }
              >
                {activeStep === steps.length - 1 ? "Submit" : "Next"}
              </Button>
            </Box>
          </React.Fragment>
        </Box>
      </Box>
    </Box>
  );
};
