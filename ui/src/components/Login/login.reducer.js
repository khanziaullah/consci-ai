import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
  password: "",
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setUserCredentials: (state, action) => {
      const { username, password } = action.payload;
      return {
        ...state,
        username,
        password,
      };
    },
  },
});

export const { setUserCredentials } = loginSlice.actions;
export default loginSlice.reducer;
