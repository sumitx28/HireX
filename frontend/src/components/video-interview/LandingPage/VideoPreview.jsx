// @author Raj Patel

import { Box, Container, IconButton, Stack } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import VideocamIcon from "@mui/icons-material/Videocam";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import MicIcon from "@mui/icons-material/Mic";
import MicOff from "@mui/icons-material/MicOff";
import CallEndIcon from "@mui/icons-material/CallEnd";
import { useNavigate } from "react-router-dom";
import {
  PROMPT_STATE,
  GREANTED_STATE,
  DENIED_STATE,
  CAMERA,
  MICROPHONE,
  CAMERA_PERMISSION_DENIED_PROMPT,
  MICROPHONE_PERMISSION_DENIED_PROMPT,
} from "../../../services/utils/Constants";
import StaticPopup from "../../shared/StaticPopup";

// Video frame preview componenet on Landing page.
const VideoPreview = ({ userData }) => {
  const [videoPermission, setVideoPermission] = useState(PROMPT_STATE);
  const [audioPermission, setAudioPermission] = useState(PROMPT_STATE);

  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [isAudioPlaying, setiIsAudioPlaying] = useState(true);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");

  const videoRef = useRef(null);
  const localStreamRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    setListeners();

    setStream();

    // cleanup
    return () => {
      if (localStreamRef.current) {
        localStreamRef.current.getTracks().forEach((track) => track.stop());
      }

      navigator.permissions.query({ name: CAMERA }).then((permissionStatus) => {
        permissionStatus.onchange = null;
      });
      navigator.permissions
        .query({ name: MICROPHONE })
        .then((permissionStatus) => {
          permissionStatus.onchange = null;
        });
    };
  }, []);

  const handleVideoToogle = () => {
    const videoTrack = localStreamRef.current
      .getTracks()
      .find((track) => track.kind === "video");
    if (isVideoPlaying) {
      videoTrack.enabled = false;
    } else {
      videoTrack.enabled = true;
    }
    setIsVideoPlaying((prev) => !prev);
  };

  const handleAudioToogle = () => {
    const audioTrack = localStreamRef.current
      .getTracks()
      .find((track) => track.kind === "audio");
    if (isAudioPlaying) {
      audioTrack.enabled = false;
    } else {
      audioTrack.enabled = true;
    }
    setiIsAudioPlaying((prev) => !prev);
  };

  const setStream = async () => {
    try {
      const cameraPermission = await navigator.permissions.query({
        name: CAMERA,
      });
      const micPermission = await navigator.permissions.query({
        name: MICROPHONE,
      });

      if (
        cameraPermission.state !== DENIED_STATE ||
        micPermission.state !== DENIED_STATE
      ) {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: cameraPermission.state !== DENIED_STATE,
          audio: micPermission.state !== DENIED_STATE,
        });
        videoRef.current.srcObject = stream;
        localStreamRef.current = stream;
      }

      if (cameraPermission.state !== DENIED_STATE) {
        setIsVideoPlaying(true);
      }

      if (micPermission.state !== DENIED_STATE) {
        setiIsAudioPlaying(true);
      }

      setVideoPermission(cameraPermission.state);
      setAudioPermission(micPermission.state);
    } catch (e) {
      console.error("Error accessing media devices:", e);
    }
  };

  const setListeners = async () => {
    try {
      const permissionStatus = await navigator.permissions.query({
        name: CAMERA,
      });
      permissionStatus.onchange = () => {
        setStream();
      };

      const audioPermissionStatus = await navigator.permissions.query({
        name: MICROPHONE,
      });
      audioPermissionStatus.onchange = () => {
        setStream();
      };
    } catch (error) {
      console.error("Error querying camera permission:", error);
    }
  };

  const handleEndCall = () => {
    navigate("/interviewschedule", {
      state: { userType: userData.role, userId: userData.userId },
    });
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleVideoPermissionClick = () => {
    setDialogMessage(CAMERA_PERMISSION_DENIED_PROMPT);
    setDialogOpen(true);
  };

  const handleAudioPermissionClick = () => {
    setDialogMessage(MICROPHONE_PERMISSION_DENIED_PROMPT);
    setDialogOpen(true);
  };

  return (
    <Container>
      <StaticPopup
        open={dialogOpen}
        handleClose={handleDialogClose}
        message={dialogMessage}
        closeMessage={"Close"}
      />
      <video
        ref={videoRef}
        playsInline
        autoPlay
        width={"100%"}
        style={{ borderRadius: "10px", backgroundColor: "black" }}
      />
      <Box
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <Stack
          direction={{ xs: "row" }}
          spacing={{ xs: 0.5, sm: 3 }}
          textAlign={"center"}
        >
          {videoPermission === GREANTED_STATE ||
          videoPermission === PROMPT_STATE ? (
            isVideoPlaying ? (
              <IconButton onClick={handleVideoToogle}>
                <VideocamIcon fontSize="medium" style={{ color: "black" }} />
              </IconButton>
            ) : (
              <IconButton onClick={handleVideoToogle}>
                <VideocamOffIcon fontSize="medium" style={{ color: "black" }} />
              </IconButton>
            )
          ) : (
            <IconButton onClick={handleVideoPermissionClick}>
              <VideocamOffIcon fontSize="medium" style={{ color: "red" }} />
            </IconButton>
          )}

          {audioPermission === GREANTED_STATE ||
          audioPermission === PROMPT_STATE ? (
            isAudioPlaying ? (
              <IconButton onClick={handleAudioToogle}>
                <MicIcon fontSize="medium" style={{ color: "black" }} />
              </IconButton>
            ) : (
              <IconButton onClick={handleAudioToogle}>
                <MicOff fontSize="medium" style={{ color: "black" }} />
              </IconButton>
            )
          ) : (
            <IconButton onClick={handleAudioPermissionClick}>
              <MicOff fontSize="medium" style={{ color: "red" }} />
            </IconButton>
          )}

          <IconButton onClick={handleEndCall}>
            <CallEndIcon fontSize="medium" style={{ color: "red" }} />
          </IconButton>
        </Stack>
      </Box>
    </Container>
  );
};

export default VideoPreview;
