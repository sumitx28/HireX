// @author Raj Patel

import { Container, Grid } from "@mui/material";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import PasscodeValidator from "./PasscodeValidator.jsx";
import VideoPreview from "./VideoPreview.jsx";
import InterviewTimeValidator from "./InterviewTimeValidator.jsx";

// Landing page componenet
function VideoInterview() {
  const [interviewStarted, setInterviewStarted] = useState(false);

  let location = useLocation();
  const { userData } = location.state;

  return (
    <React.Fragment>
      <Container sx={{ paddingTop: { xs: "5vh", md: "10vh" } }}>
        {interviewStarted ? (
          <Grid container>
            <Grid item xs={12} md={7}>
              <VideoPreview userData={userData}/>
            </Grid>
            <Grid
              item
              xs={12}
              md={5}
              sx={{ paddingTop: { xs: "5vh", md: "15vh" } }}
            >
              <PasscodeValidator userData={userData} />
            </Grid>
          </Grid>
        ) : (
          <Grid container>
            <Grid item xs={12} md={12}>
              <InterviewTimeValidator
                userData={userData}
                setInterviewStarted={setInterviewStarted}
              />
            </Grid>
          </Grid>
        )}
      </Container>
    </React.Fragment>
  );
}

export default VideoInterview;
