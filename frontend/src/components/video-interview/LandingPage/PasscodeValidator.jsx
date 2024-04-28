// @author Raj Patel

import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  resendPasscode,
  validatePasscode,
} from "../../../services/api/videoInterviewApis.js";
import { useNavigate } from "react-router-dom";
import StaticPopup from "../../shared/StaticPopup.jsx";
import {
  DENIED_STATE,
  CAMERA,
  MICROPHONE,
} from "../../../services/utils/Constants";

// Passcode validator
function PasscodeValidator({ userData }) {
  const [meetingPasscode, setMeetingPasscode] = useState("");

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [resendPasswordSpinner, setResendPasswordSpinner] = useState(false);
  const [validatePasswordSpinner, setValidatePasswordSpinner] = useState(false);
  const [cameraMicPermission, setCameraMicPermission] = useState(false);

  const navigate = useNavigate();

  const handleValidatePasscode = () => {
    if (meetingPasscode === "") {
      setDialogOpen(true);
      setDialogMessage("Enter a valid meeting passcode!");
      return;
    }

    if (cameraMicPermission === false) {
      setDialogOpen(true);
      setDialogMessage("Webcam and Mic permission required!");
      return;
    }
    validatePasscode(
      userData.roomId,
      meetingPasscode,
      userData,
      setDialogOpen,
      setDialogMessage,
      setValidatePasswordSpinner,
      navigate
    );
  };

  const handleResendPasscode = () => {
    resendPasscode(
      userData.userId,
      userData.roomId,
      setDialogOpen,
      setDialogMessage,
      setResendPasswordSpinner
    );
  };

  useEffect(() => {
    setListeners();
    checkCameraMicPermsission();
  }, []);

  async function checkCameraMicPermsission() {
    const cameraPermission = await navigator.permissions.query({
      name: CAMERA,
    });
    const micPermission = await navigator.permissions.query({
      name: MICROPHONE,
    });

    if (
      cameraPermission.state === DENIED_STATE ||
      micPermission.state === DENIED_STATE
    ) {
      setCameraMicPermission(false);
      return;
    }
    setCameraMicPermission(true);
  }

  const setListeners = async () => {
    try {
      const permissionStatus = await navigator.permissions.query({
        name: CAMERA,
      });
      permissionStatus.onchange = () => {
        checkCameraMicPermsission();
      };

      const audioPermissionStatus = await navigator.permissions.query({
        name: MICROPHONE,
      });
      audioPermissionStatus.onchange = () => {
        checkCameraMicPermsission();
      };
    } catch (error) {
      console.error("Error querying camera permission:", error);
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        flexDirection: "column",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <StaticPopup
        open={dialogOpen}
        handleClose={() => setDialogOpen(false)}
        message={dialogMessage}
        closeMessage={"Close"}
      />
      <Typography
        variant="h6"
        sx={{
          marginBottom: "0.5rem",
        }}
      >
        Ready to Join?
      </Typography>
      <TextField
        label="Meeting Passcode"
        variant="outlined"
        required
        type="password"
        value={meetingPasscode}
        onChange={(e) => setMeetingPasscode(e.target.value)}
        sx={{
          width: "100%",
          marginBottom: "0.5rem",
        }}
      />
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Box textAlign={"center"}>
            {!validatePasswordSpinner && (
              <Button
                variant="contained"
                color="primary"
                sx={{
                  width: "100%",
                }}
                onClick={handleValidatePasscode}
              >
                Join
              </Button>
            )}
            {validatePasswordSpinner && <CircularProgress />}
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box textAlign={"center"}>
            {!resendPasswordSpinner && (
              <Button
                variant="outlined"
                color="primary"
                sx={{
                  width: "100%",
                }}
                onClick={handleResendPasscode}
              >
                Resend Passcode
              </Button>
            )}
            {resendPasswordSpinner && <CircularProgress />}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default PasscodeValidator;
