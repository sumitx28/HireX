// @author Raj Patel

import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { getInterviewStartTime } from "../../../services/api/videoInterviewApis.js";
import { useNavigate } from "react-router-dom";
import CalendarImage from "../../../assets/calendar.jpg";
import StaticPopup from "../../shared/StaticPopup.jsx";


// Interview time validator component.
function InterviewTimeValidator({ userData, setInterviewStarted }) {
  const [dataFetched, setDataFetched] = useState(false);
  const [cardContent, setCardContent] = useState({});
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    getInterviewStartTime(
      userData.roomId,
      setDataFetched,
      setCardContent,
      setInterviewStarted,
      setDialogOpen
    );
  }, []);

  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate("/interviewschedule", {
      state: { userType: userData.role, userId: userData.userId },
    });
  };

  const handleDialogClose = () => {
    navigate("/interviewschedule", {
      state: { userType: userData.role, userId: userData.userId },
    });
  };

  return (
    <Grid container justifyContent="center">
      <Grid item>
        {dataFetched ? (
          <Card sx={{ maxWidth: 500 }}>
            <CardMedia
              component="img"
              height="250"
              sx={{ objectFit: "fill" }}
              image={CalendarImage}
              title="Interview Not Started"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Interview Not Started
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Interview starts at {cardContent.startTime}
              </Typography>
            </CardContent>
            <CardActions>
              <Button variant="outlined" size="small" onClick={handleHomeClick}>
                Exit
              </Button>
            </CardActions>
          </Card>
        ) : (
          <>
            {!dialogOpen && <CircularProgress />}
            <StaticPopup
              open={dialogOpen}
              handleClose={handleDialogClose}
              message={"HireX Server Down!"}
              closeMessage={"Home"}
            />
          </>
        )}
      </Grid>
    </Grid>
  );
}

export default InterviewTimeValidator;
