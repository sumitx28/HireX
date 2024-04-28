// @author Raj Patel

import {
  Box,
  Button,
  Container,
  Grid,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import Footer from "../footer/Footer";
import { useState } from "react";
import * as utils from "../../utils.js";

function ContactUs() {
  const [name, setName] = useState({
    text: "",
    showError: false,
    errorMessage: "",
  });
  const [email, setEmail] = useState({
    text: "",
    showError: false,
    errorMessage: "",
  });
  const [subject, setSubject] = useState({
    text: "",
    showError: false,
    errorMessage: "",
  });
  const [message, setMessage] = useState({
    text: "",
    showError: false,
    errorMessage: "",
  });

  const [snakOpen, setSnakOpen] = useState(false);

  const handleClick = () => {
    if (utils.validateFirstName(name.text) === false) {
      setName({ text: "", showError: true, errorMessage: "Invalid Name" });
      return;
    }
    if (message.text === "" || message.text === undefined) {
      setMessage({
        text: "",
        showError: true,
        errorMessage: "Message cannot be empty",
      });
      return;
    }
    if (subject.text === "" || subject.text === undefined) {
      setSubject({
        text: "",
        showError: true,
        errorMessage: "Subject cannot be empty",
      });
      return;
    }
    if (utils.validateEmail(email.text) === false) {
      setEmail({ text: "", showError: true, errorMessage: "Invalid Email" });
      return;
    }
    setName({ text: "", showError: false, errorMessage: "" });
    setEmail({ text: "", showError: false, errorMessage: "" });
    setSubject({ text: "", showError: false, errorMessage: "" });
    setMessage({ text: "", showError: false, errorMessage: "" });

    setSnakOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnakOpen(false);
  };

  return (
    <Box>
      <Container fixed sx={{ marginTop: "5vh", maxWidth: "90vw" }}>
        <Typography variant="h3">Contact Us</Typography>

        <Grid container spacing={2} sx={{ marginTop: "5vh" }}>
          <Grid item xs={6}>
            <TextField
              value={name.text}
              onChange={(e) => setName({ ...name, text: e.target.value })}
              error={name.showError}
              helperText={!name.showError ? "" : name.errorMessage}
              onBlur={(e) => {
                setName({
                  text: e.target.value,
                  showError: e.target.value ? false : true,
                  errorMessage: e.target.value ? "" : "Name cannot be empty",
                });
              }}
              required
              id="name"
              label="Name"
              placeholder="Name"
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              value={email.text}
              onChange={(e) => setEmail({ ...email, text: e.target.value })}
              error={email.showError}
              helperText={!email.showError ? "" : email.errorMessage}
              onBlur={(e) => {
                setEmail({
                  text: e.target.value,
                  showError: e.target.value ? false : true,
                  errorMessage: e.target.value ? "" : "Email cannot be empty",
                });
              }}
              required
              id="email"
              label="Email"
              placeholder="Email"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              value={subject.text}
              onChange={(e) => setSubject({ ...subject, text: e.target.value })}
              error={subject.showError}
              helperText={!subject.showError ? "" : subject.errorMessage}
              onBlur={(e) => {
                setSubject({
                  text: e.target.value,
                  showError: e.target.value ? false : true,
                  errorMessage: e.target.value ? "" : "Subject cannot be empty",
                });
              }}
              required
              id="subject"
              label="Subject"
              placeholder="Subject"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              value={message.text}
              onChange={(e) => setMessage({ ...message, text: e.target.value })}
              error={message.showError}
              helperText={!message.showError ? "" : message.errorMessage}
              onBlur={(e) => {
                setMessage({
                  text: e.target.value,
                  showError: e.target.value ? false : true,
                  errorMessage: e.target.value ? "" : "Message cannot be empty",
                });
              }}
              required
              id="message"
              label="Message"
              placeholder="Message"
              fullWidth
              multiline
              rows={7}
            />
          </Grid>
          <Grid item xs={1.5}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              onClick={handleClick}
            >
              Send
            </Button>
            <Snackbar
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
              open={snakOpen}
              autoHideDuration={1000}
              onClose={handleClose}
              message="Thank you for contacting us! We will get back to you."
            />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </Box>
  );
}

export default ContactUs;
