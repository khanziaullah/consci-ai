import { IconButton, InputAdornment, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToMessageList,
  fetchFinalResponse,
  fetchFollowupQuestions,
  setIsGenerateReportButtonVisible,
  setSummary,
} from "./chat.reducer";

export function EnterSmsField() {
  const messages = useSelector((state) => state.chat.messages);
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setInput(e.target.value);
  };
  const handleSubmit = () => {
    const payload = { text: input, isReceived: false };
    dispatch(addToMessageList(payload));
    if (messages.length < 7) {
      dispatch(fetchFollowupQuestions(payload));
    } else {
      dispatch(fetchFinalResponse(payload));
      
    }
    setInput("");
  };

  useEffect(() => {
    console.log(messages);
    if (messages && messages.length > 9) {
      console.log("summary: ", messages[9].text);
      dispatch(setSummary(messages[9].text));
      dispatch(setIsGenerateReportButtonVisible(true));
    }
  }, [messages]);
  return (
    <TextField
      sx={{
        zIndex: 1,
        backgroundColor: "#fffee0",
      }}
      fullWidth
      InputProps={{
        endAdornment: (
          <IconButton onClick={handleSubmit}>
            <InputAdornment>
              <SendIcon />
            </InputAdornment>
          </IconButton>
        ),
      }}
      onChange={handleChange}
      value={input}
      placeholder="Enter your query"
    ></TextField>
  );
}
