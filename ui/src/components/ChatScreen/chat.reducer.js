import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  messages: [
    {
      text: "Hello, I am your Intelligent Responsible AI auditor, Consci-AI. Thank you for submitting your project details. I'll be asking you a few questions to analyze your project further. ",
      isReceived: true,
    },
  ],
  classified_risk_category: "In Progress",
  IsgenerateReportButtonVisible: false,
  finalMessage: "",
};

export const fetchInitialQuestions = createAsyncThunk(
  "chat/fetchInitialQuestions",
  async (query) => {
    let payload = {
      method: "POST",
      body: JSON.stringify(query),
      headers: {
        "Content-Type": "application/json",
      },
    };
    console.log(payload);
    const response = await fetch("http://192.168.1.7:8000/answer", payload);
    return await response.json();
  }
);

export const fetchFollowupQuestions = createAsyncThunk(
  "chat/fetchFollowupQuestions",
  async (query) => {
    let payload = {
      method: "POST",
      body: JSON.stringify(query),
      headers: {
        "Content-Type": "application/json",
      },
    };
    console.log(payload);
    const response = await fetch(
      "http://192.168.1.7:8000/generateQuestions",
      payload
    );
    return await response.json();
  }
);

export const fetchFinalResponse = createAsyncThunk(
  "chat/fetchFinalResponse",
  async (query, { dispatch }) => {
    let payload = {
      method: "POST",
      body: JSON.stringify(query),
      headers: {
        "Content-Type": "application/json",
      },
    };
    console.log(payload);
    const response = await fetch(
      "http://192.168.1.7:8000/generateFinalResponse",
      payload
    );
    return await response.json();
  }
);

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addToMessageList: (state, action) => {
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };
    },
    setIsGenerateReportButtonVisible: (state, action) => {
      return {
        ...state,
        IsgenerateReportButtonVisible: action.payload,
      };
    },
    setSummary: (state, action) => {
      return {
        ...state,
        finalMessage: action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchInitialQuestions.fulfilled, (state, action) => {
      const regex = /{([^{}]+)}/;
      const match = action.payload.match(regex);
      let question = "";
      let category = "";
      if (match) {
        const extractedJsonString = match[1];
        console.log("extractedJsonString ", extractedJsonString);
        const extractedJsonObject = JSON.parse("{" + extractedJsonString + "}");
        console.log("extractedJsonObject ", extractedJsonObject);
        question = extractedJsonObject.question;
        category = extractedJsonObject.category;
        console.log("category: ", category);
      } else {
        console.log("No JSON found between {} signs.");
      }
      const messageObject = {
        text: question,
        isReceived: true,
      };
      console.log("classified_risk_category set: ", category);
      return {
        ...state,
        messages: [...state.messages, messageObject],
        classified_risk_category: category,
      };
    });
    builder.addCase(fetchInitialQuestions.rejected, (state, action) => {
      console.log("rejected fetchInitialQuestions", action.payload);
      return { ...state };
    });
    builder.addCase(fetchFollowupQuestions.fulfilled, (state, action) => {
      const response = action.payload;
      const messageObject = {
        text: response,
        isReceived: true,
      };
      return { ...state, messages: [...state.messages, messageObject] };
    });
    builder.addCase(fetchFollowupQuestions.rejected, (state, action) => {
      console.log("rejected fetchFollowupQuestions", action.payload);
      return { ...state };
    });
    builder.addCase(fetchFinalResponse.fulfilled, (state, action) => {
      const response = action.payload;
      const messageObject = {
        text: response,
        isReceived: true,
      };
      console.log("generated Final Response", action.payload);

      return { ...state, messages: [...state.messages, messageObject] };
    });
    builder.addCase(fetchFinalResponse.rejected, (state, action) => {
      console.log("rejected fetchFinalResponse", action.payload);
      return { ...state };
    });
  },
});

export const {
  addToMessageList,
  setIsGenerateReportButtonVisible,
  setSummary,
} = chatSlice.actions;
export default chatSlice.reducer;
