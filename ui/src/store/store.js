import { configureStore } from "@reduxjs/toolkit";
import projectDetailsReducer from "../components/ProjectDetails/projectDetails.reducer";
import loginReducer from "../components/Login/login.reducer";
import chatReducer from "../components/ChatScreen/chat.reducer";

export const store = configureStore({
  reducer: {
    login: loginReducer,
    projectDetails: projectDetailsReducer,
    chat: chatReducer,
  },
});
