// @author Raj Patel

import { Typography, Box } from "@mui/material";
import React from "react";
import { getTimeFromDate } from "../../../utils";

// Single chat message component
function ChatMessage({ message }) {
  return (

    <Box
      textAlign={'right'}
      sx={{
        padding: '16px',
        borderRadius: '10px',
        maxWidth: '90%',
        alignSelf: 'flex-end',
        marginBottom: '8px',
        marginLeft: 'auto'
      }}
    >
      <Typography variant="caption" sx={{ paddingBottom: '4px', color: '#546e7a' }}>
        {message.senderName} - {getTimeFromDate(message.sentAt)}
      </Typography>
      <Typography variant="body1" sx={{ wordBreak: "break-word", whiteSpace: 'pre-line', color: '#263238' }}>
        {message.content}
      </Typography>
    </Box>
  );
}

export default ChatMessage;