import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  personalDetails: {
    firstName: "",
    lastName: "",
    organizationName: "",
    teamName: "",
  },
  projectDetails: {
    name: "",
    techStack: "",
    mlLibraries: "",
    description: "",
    architecture:""
  }
};

export const projectDetailsSlice = createSlice({
  name: "projectDetails",
  initialState,
  reducers: {
    setPersonalDetails: (state, action) => {
      return {
        ...state,
        personalDetails: {
          ...state.personalDetails,
          ...action.payload,
        },
      };
    },
    setProjectDetails: (state, action) => {
      return {
        ...state,
        projectDetails: {
          ...state.projectDetails,
          ...action.payload,
        },
      };
    },
    setArchitectureDetails: (state, action) => {
      console.log(action.payload);
      return {
        ...state,
        architecture: {
          ...state.architecture,
          ...action.payload,
        },
      };
    },
    resetState: (action, state) => {
      return {
        ...initialState,
      };
    },
  },
});

export const {
  setPersonalDetails,
  setProjectDetails,
  setArchitectureDetails,
  resetState,
} = projectDetailsSlice.actions;
export default projectDetailsSlice.reducer;
