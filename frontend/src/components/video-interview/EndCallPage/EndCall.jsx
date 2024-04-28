// @author Raj Patel

import { Button, CircularProgress, Container, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CANDIDATE, INTERVIEWER } from "../../../services/utils/Constants";
import { endInterview } from "../../../services/api/videoInterviewApis";

// End call video componenet
function EndCall() {
    const [spinner, setSpinner] = useState(false);

    const navigate = useNavigate();

    let location = useLocation();
    const { userData } = location.state;
    console.log(userData);
    

    const handleRejoin = () => {
        navigate("/meeting-room", { state: { userData } });
    }

    const handleHomeScreen = async () => {
        if (userData.role === INTERVIEWER) {
            const result = await endInterview(userData.roomId, setSpinner);
            console.log(result);
        }  
        navigate("/interviewschedule", {
            state: { userType: userData.role, userId: userData.userId },
          });
    };

    return (
        <Container maxWidth="sm" sx={{
            flexDirection: 'column',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: '20vh'
        }}>
            <Typography variant="h4" sx={{
                marginBottom: '0.5rem'
            }}>
                You left the meeting
            </Typography>
            <Grid container spacing={2} sx={{ marginTop: '2vh' }}>
                <Grid item xs={12} sm={6}>
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{
                            width: '100%',
                        }}
                        onClick={handleRejoin}
                    >
                        Rejoin
                    </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                {!spinner ? <Button
                        variant="outlined"
                        color="primary"
                        sx={{
                            width: '100%'
                        }}
                        onClick={handleHomeScreen}
                    >    
                    {userData.role === CANDIDATE ? "Exit" : "End Interview"}
                    </Button>
                    : <CircularProgress />
                    }
                </Grid>
            </Grid>
        </Container >
    );
}

export default EndCall;