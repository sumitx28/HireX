// @author Raj Patel

import { Grid, Paper, TextField, IconButton, Box } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import SendIcon from '@mui/icons-material/Send';
import ChatMessage from "./ChatMessage";
import CloseIcon from '@mui/icons-material/Close';

// Side chat bar component
function ChatPane({ messages, handleSendMessage, handleMessageClick }) {
  const [inputText, setInputText] = useState('');
  const [sendButtonEnabled, setSendButtonEnabled] = useState(false);
  const scrollableRef = useRef(null);

  const handeInputChange = (e) => {
    setInputText(e.target.value);
    if (e.target.value === '') {
      setSendButtonEnabled(false);
    } else {
      setSendButtonEnabled(true);
    }
  }

  const handleMessageSendClick = () => {
    handleSendMessage(inputText);
    setInputText('');
    setSendButtonEnabled(false);
  }

  useEffect(() => {
    if (scrollableRef.current) {
      scrollableRef.current.scrollTop = scrollableRef.current.scrollHeight;
    }
  });

  return (
    <Box>
      <Paper ref={scrollableRef} style={{ borderRadius: '10px', width: '100%', height: '75vh', objectFit: 'initial', overflowY: 'auto', border: '1px solid #003691' }}>
        {messages.map(element => <ChatMessage message={element} />)}
      </Paper >
      <Grid container sx={{ margin: '10px' }}>
        <Grid item xs={8} >
          <TextField value={inputText} onChange={handeInputChange} multiline maxRows={2} size="small" variant="outlined" label='' placeholder="Your message" sx={{
            input: { color: 'black', fontFamily: "Montserrat", fontSize: "1.1rem" }, width: '100%', textAlign: "center"
          }} />
        </Grid>
        <Grid item xs={2} sx={{ textAlign: 'center' }}>
          <IconButton sx={{ color: "#003691", opacity: sendButtonEnabled ? 1 : 0.5 }} disabled={!sendButtonEnabled} onClick={handleMessageSendClick} >
            <SendIcon sx={{ color: "#003691" }} fontSize="medium" />
          </IconButton>
        </Grid>
        <IconButton xs={2} onClick={handleMessageClick} sx={{ display: { xs: 'block', sm: 'block', md: 'none' }, color: 'black' }}>
          <CloseIcon fontSize="medium" />
        </IconButton>
      </Grid>
    </ Box >
  );
}

export default ChatPane;