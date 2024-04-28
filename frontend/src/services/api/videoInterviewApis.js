// @author Raj Patel

import {
  GET_MESSAGES_API,
  POST_RESEND_PASSCODE_API,
  POST_VALIDATE_PASSCODE_API,
  WS_VIDEO_CONN_API,
  GET_INTERVIEW_START_TIME,
  UPDATE_INTERVIEW_STATUS,
} from "../utils/ApiConstants";
import { convertUtcToAdt, humanReadableTime } from "../../utils";
import hirexAxios from "../utils/hirexAxiosIntercepter";

// Validate passcode api
export const validatePasscode = (
  roomId,
  meetingPasscode,
  userData,
  setDialogOpen,
  setDialogMessage,
  setValidatePasswordSpinner,
  navigate
) => {
  setValidatePasswordSpinner(true);
  hirexAxios
    .post(POST_VALIDATE_PASSCODE_API, {
      roomId,
      meetingPasscode,
    })
    .then((data) => {
      setValidatePasswordSpinner(false);
      if (data.data === true) {
        navigate("/meeting-room", { state: { userData } });
      } else {
        setDialogOpen(true);
        setDialogMessage("Incorrect meeting passcode!");
      }
    })
    .catch((error) => {
      console.log(error);
      setValidatePasswordSpinner(false);
      setDialogOpen(true);
      setDialogMessage("HireX Server Error");
    });
};

// resend passcode
export const resendPasscode = (
  userId,
  roomId,
  setDialogOpen,
  setDialogMessage,
  setResendPasswordSpinner
) => {
  setResendPasswordSpinner(true);
  hirexAxios
    .get(POST_RESEND_PASSCODE_API + `${userId}/${roomId}`)
    .then((data) => {
      setDialogOpen(true);
      setResendPasswordSpinner(false);
      setDialogMessage("Check your email for meeting passcode!");
    })
    .catch((error) => {
      console.log(error);
      setDialogOpen(true);
      setResendPasswordSpinner(false);
      setDialogMessage("Error sending meeting passcode!");
    });
};

// Create websocket connection.
export const createVideoConnection = (roomId) => {
  const connection = new WebSocket(WS_VIDEO_CONN_API + roomId);
  return connection;
};

// Get all previous messages
export const getPreviousMessages = (roomId, setMessages) => {
  hirexAxios
    .get(GET_MESSAGES_API + `${roomId}`)
    .then((data) => {
      setMessages([...data.data]);
    })
    .catch((error) => {
      console.log("getPreviousMessages " + error);
    });
};

// Get interview start time.
export const getInterviewStartTime = (
  roomId,
  setDataFetched,
  setCardContent,
  setInterviewStarted,
  setDialogOpen
) => {
  hirexAxios
    .get(GET_INTERVIEW_START_TIME + `${roomId}`)
    .then((data) => {
      const startTimeAdt = new Date(convertUtcToAdt(data.data));
      const currentTime = new Date();
      console.log(startTimeAdt);
      if (currentTime >= startTimeAdt) {
        setInterviewStarted(true);
      } else {
        setCardContent({ startTime: humanReadableTime(data.data) });
        setDataFetched(true);
      }
    })
    .catch((error) => {
      console.log(error);
      setDialogOpen(true);
    });
};

// End interview API call.
export const endInterview = async (roomId, setSpinner) => {
  setSpinner(true);
  await hirexAxios
    .put(UPDATE_INTERVIEW_STATUS + `${roomId}`)
    .then((data) => {
      setSpinner(false);
      return { success: true };
    })
    .catch((error) => {
      console.log(error);
      setSpinner(false);
      return { success: false };
    });
};
