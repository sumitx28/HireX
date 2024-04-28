// @author Raj Patel

import { Box, Container, Grid, IconButton, Stack } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import MicIcon from '@mui/icons-material/Mic';
import MicOff from "@mui/icons-material/MicOff";
import CallEndIcon from '@mui/icons-material/CallEnd';
import ScreenShareIcon from '@mui/icons-material/ScreenShare';
import { createVideoConnection, getPreviousMessages } from "../../../services/api/videoInterviewApis.js";
import { STUN_SERVERS } from "../../../services/utils/Constants.js";
import ChatPane from "./ChatPane.jsx";
import MessageIcon from '@mui/icons-material/Message';
import { PROMPT_STATE, DENIED_STATE, CAMERA, MICROPHONE } from "../../../services/utils/Constants";
import StaticPopup from "../../shared/StaticPopup.jsx";
import { useAuth } from "../../../authUtility/authprovider.jsx";

// Meeting room component
function MeetingRoom() {
  const [videoPermission, setVideoPermission] = useState(PROMPT_STATE);
  const [audioPermission, setAudioPermission] = useState(PROMPT_STATE);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [isAudioPlaying, setIsAudioPlaying] = useState(true);
  const [messages, setMessages] = useState([]);
  const [showChatDrawer, setShowChatDrawer] = useState(false);
  const [chatDialogOpen, setChatDialogOpen] = useState(false);
  const [serverError, setServerError] = useState(false);
  const [serverStartupError, setServerStartupError] = useState(false);
  const { jwtToken } = useAuth();
  const remoteStreamRef = useRef(null);
  const localStreamRef = useRef(null);
  const webSocketRef = useRef(null);
  const peerRef = useRef(null);
  const senders = useRef([]);

  const navigate = useNavigate();
  let location = useLocation();
  const { userData } = location.state;

  useEffect(() => {
    setListeners();

    const createConnection = async () => {
      await setStream();
      try {
        if (!webSocketRef.current) {
          createWebSocketConnection();
        }
      } catch (error) {
        console.error('Error creating websocket connection:', error);
        setServerError(true);
      }
    };

    createConnection();

    return () => {
      if (localStreamRef.current) {
        localStreamRef.current.getTracks().forEach((track) => track.stop());
      }

      if (webSocketRef.current) {
        webSocketRef.current.close(1000, 'Closing Connection!');
        webSocketRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    getPreviousMessages(userData.roomId, setMessages);
  }, []);

  const setListeners = async () => {
    try {
      const permissionStatus = await navigator.permissions.query({ name: CAMERA });
      permissionStatus.onchange = () => {
        console.log("camera:" + permissionStatus.state);
        setStream();
      };

      const audioPermissionStatus = await navigator.permissions.query({ name: MICROPHONE });
      audioPermissionStatus.onchange = () => {
        console.log("camera:" + audioPermissionStatus.state);
        setStream();
      };
    } catch (error) {
      console.error('Error querying camera permission:', error);
    }
  }

  const setStream = async () => {
    try {
      const cameraPermission = await navigator.permissions.query({ name: CAMERA });
      const micPermission = await navigator.permissions.query({ name: MICROPHONE });

      if (cameraPermission.state !== DENIED_STATE || micPermission.state !== DENIED_STATE) {
        const stream = await navigator.mediaDevices.getUserMedia({ video: cameraPermission.state !== DENIED_STATE, audio: micPermission.state !== DENIED_STATE });
        localStreamRef.current = stream;
      }

      if (cameraPermission.state !== DENIED_STATE) {
        setIsVideoPlaying(true);
      }

      if (micPermission.state !== DENIED_STATE) {
        setIsAudioPlaying(true);
      }

      setVideoPermission(cameraPermission.state);
      setAudioPermission(micPermission.state);
    } catch (e) {
      console.error('Error accessing media devices:', e);
    }
  }

  const createWebSocketConnection = () => {
    webSocketRef.current = createVideoConnection(userData.roomId);

    webSocketRef.current.addEventListener("open", () => {
      webSocketRef.current.send(JSON.stringify({ join: true }))
    });

    webSocketRef.current.addEventListener('error', (event) => {
      console.error('WebSocket error:', event);
      setServerError(true);
    });

    webSocketRef.current.addEventListener('close', (event) => {
      console.log('WebSocket connection is closed:', event);
      setServerError(true);
    });

    webSocketRef.current.addEventListener("message", async (e) => {
      const message = JSON.parse(e.data);


      if (message.join) {
        createRTCConnection();
      }

      if (message.iceCandidate) {
        try {
          await peerRef.current.addIceCandidate(message.iceCandidate);
        } catch (err) {
          console.log("Error In ICE Candidate", err);
        }
      }

      if (message.offer) {
        handleOfferFromRemote(message.offer);
      }

      if (message.answer) {
        peerRef.current.setRemoteDescription(new RTCSessionDescription(message.answer));
      }

      if (message.sentAt && message.senderName) {
        setMessages(prevItems => [...prevItems, message]);
      }

      if (message.error) {
        setChatDialogOpen(true);
      }

      if (message.close) {
        remoteStreamRef.current.srcObject = null;
      }
    });
  }

  // create Web RTC connection
  const createRTCConnection = () => {
    peerRef.current = createPeer();

    localStreamRef.current.getTracks().forEach((track) => {
      senders.current.push(peerRef.current.addTrack(track, localStreamRef.current));
    });
  }

  const createPeer = () => {
    const peerConnection = new RTCPeerConnection(STUN_SERVERS);

    peerConnection.onnegotiationneeded = handleNegotiation;
    peerConnection.onicecandidate = handleIceCandidates;
    peerConnection.ontrack = handleTrack;

    return peerConnection;
  }

  const handleNegotiation = async () => {
    try {
      const offer = await peerRef.current.createOffer();
      await peerRef.current.setLocalDescription(offer);
      webSocketRef.current.send(JSON.stringify({ offer: peerRef.current.localDescription }));
    } catch (err) {
      console.log("Error in handleNegotiation ", err);
    }
  }

  const handleIceCandidates = (e) => {
    if (e.candidate) {
      console.log("Keep sending ice candidates when found");
      webSocketRef.current.send(JSON.stringify({ iceCandidate: e.candidate }));
    }
  }

  const handleTrack = (e) => {
    remoteStreamRef.current.srcObject = e.streams[0];
  }

  const handleOfferFromRemote = async (offer) => {
    peerRef.current = createPeer();

    await peerRef.current.setRemoteDescription(new RTCSessionDescription(offer));
    localStreamRef.current.getTracks().forEach((track) => {
      senders.current.push(peerRef.current.addTrack(track, localStreamRef.current));
    });

    const answer = await peerRef.current.createAnswer();
    await peerRef.current.setLocalDescription(answer);

    webSocketRef.current.send(JSON.stringify({ answer: peerRef.current.localDescription }));
  }


  const handleVideoToogle = () => {
    const videoTrack = localStreamRef.current.getTracks().find(track => track.kind === 'video');
    if (isVideoPlaying) {
      videoTrack.enabled = false;
    } else {
      videoTrack.enabled = true;
    }
    setIsVideoPlaying((prev) => !prev);
  }

  const handleAudioToogle = () => {
    const audioTrack = localStreamRef.current.getTracks().find(track => track.kind === 'audio');
    if (isAudioPlaying) {
      audioTrack.enabled = false;
    } else {
      audioTrack.enabled = true;
    }
    setIsAudioPlaying((prev) => !prev);
  }

  const handleShareScreen = () => {
    navigator.mediaDevices.getDisplayMedia({ cursor: true })
      .then(stream => {
        const screenTrack = stream.getTracks()[0];
        senders.current.find(sender => sender.track.kind === 'video').replaceTrack(screenTrack);
        screenTrack.onended = () => {
          senders.current.find(sender => sender.track.kind === 'video').replaceTrack(localStreamRef.current.getTracks()[1]);
        }
      })
      .catch(e => console.log('getDisplayMedia error' + e));
  }

  const handleMessageClick = () => {
    setShowChatDrawer((prev) => !prev)
  }

  const handleSendMessage = (content) => {
    try {
      const newMessage = { senderId: userData.userId, senderName: userData.name, roomId: userData.roomId, content: content, sentAt: new Date().toISOString(), jwtToken: jwtToken };
      webSocketRef.current.send(JSON.stringify(newMessage));
    } catch (e) {
      console.log('startup error' + e)
      setServerStartupError(true);
    }
  }

  const handleEndCall = () => {
    navigate("/end-call/", { state: { userData } });
  }

  return (
    <Container sx={{ minWidth: '80%', marginTop: '0.5vh' }}>
      <Grid container spacing={2} >
        <Grid item sm={12} md={9} sx={{ display: { xs: showChatDrawer ? 'none' : 'block', sm: showChatDrawer ? 'none' : 'block', md: 'block' } }}>
          <Box style={{ borderRadius: '10px', width: '100%', height: '75vh', objectFit: 'initial', backgroundColor: 'black' }}>
            <video ref={remoteStreamRef} playsInline autoPlay style={{ borderRadius: '10px', width: '100%', height: '75vh', objectFit: 'initial' }} />
          </Box>
          <Box style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', flexDirection: 'column' }}>
            <Stack direction={{ xs: 'row' }} spacing={{ xs: 0.5, sm: 3 }} textAlign={'center'}>
              {isVideoPlaying ? (<IconButton onClick={handleVideoToogle}>
                <VideocamIcon fontSize="medium" style={{ color: 'black' }} />
              </IconButton>) :
                (<IconButton onClick={handleVideoToogle}>
                  <VideocamOffIcon fontSize="medium" style={{ color: 'black' }} />
                </IconButton>)}

              {isAudioPlaying ?
                (<IconButton onClick={handleAudioToogle}>
                  <MicIcon fontSize="medium" style={{ color: 'black' }} />
                </IconButton>) :
                (<IconButton onClick={handleAudioToogle}>
                  <MicOff fontSize="medium" style={{ color: 'black' }} />
                </IconButton>)}

              <Grid item xs={3}>
                <IconButton onClick={handleShareScreen} style={{ color: 'black' }}>
                  <ScreenShareIcon fontSize="medium" />
                </IconButton>
              </Grid>
              <IconButton onClick={handleMessageClick} sx={{ display: { xs: 'block', sm: 'block', md: 'none' } }} style={{ color: '#003691' }}>
                <MessageIcon fontSize="medium" />
              </IconButton>
              <IconButton onClick={handleEndCall} style={{ color: 'red' }}>
                <CallEndIcon fontSize="medium" />
              </IconButton>
            </Stack>
          </Box>
        </Grid >
        <Grid item md={3} sx={{ display: { xs: showChatDrawer ? 'block' : 'none', sm: showChatDrawer ? 'block' : 'none', md: 'block' } }}>
          <ChatPane messages={messages} handleSendMessage={handleSendMessage} handleMessageClick={handleMessageClick} />
        </Grid >
      </Grid >
      <StaticPopup open={serverError} handleClose={() => { setServerError(false); navigate("/"); }} message={'Server Error!'} closeMessage={'Close'} />
      <StaticPopup open={serverStartupError} handleClose={() => { setServerStartupError(false); navigate("/interviewschedule", {
            state: { userType: userData.role, userId: userData.userId }, }) }} message={'Server cold start error'} closeMessage={'Rejoin'} />
      <StaticPopup open={chatDialogOpen} handleClose={() => setChatDialogOpen(false)} message={'Chat Server Down!'} closeMessage={'Close'} />
    </Container >

  );
}

export default MeetingRoom;