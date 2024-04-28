// @author Sumit Savaliya
import React, { useEffect } from "react";
import {
  Typography,
  Button,
  Container,
  Grid,
  Divider,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Box,
  Paper,
} from "@mui/material";
import Footer from "../footer/Footer";
import CandidateImage from "../../assets/candidateImage.png";
import RecruiterImage from "../../assets/recruiterImage.png";
import AboutUsImage from "../../assets/about.png";
import AptitudeAssessment from "../../assets/aptitude_assessment.png";
import Github from "../../assets/github.png";
import Coding from "../../assets/Coding.png";
import Video from "../../assets/Video.png";
import { useNavigate } from "react-router-dom";
import { code_assessment_status, hire_x_status, video_interview_status } from "../../services/api/statusCheckService";

const HomePage = () => {
  const navigate = useNavigate();

  const sectionStyle = {
    padding: "4rem 0",
  };

  const buttonStyle = {
    margin: "1rem",
  };

  useEffect(() => {
    hire_x_status();
    code_assessment_status();
    video_interview_status();
  }, []);

  return (
    <div>
      <section style={sectionStyle}>
        <Container maxWidth="md">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="inherit"
            gutterBottom
          >
            Welcome to HireX - Faster Hiring Platform
          </Typography>
          <Typography variant="h5" align="center" color="inherit" paragraph>
            Connecting top talent with leading companies.
          </Typography>
          <Grid container spacing={2} justifyContent="center">
            <Grid item>
              <Button variant="contained" color="primary" style={buttonStyle} onClick={() => navigate("/login")}>
                Get Started
              </Button>
            </Grid>
          </Grid>
        </Container>
      </section>

      <Divider />

      <section style={sectionStyle}>
        <Container maxWidth="md">
          <Typography
            component="h1"
            variant="h4"
            align="center"
            color="inherit"
            gutterBottom
          >
            What we provide!
          </Typography>
          <Grid container spacing={2} justifyContent="center" marginTop={3}>
            <Grid item xs={12} sm={3}>

              <img
                src={AptitudeAssessment}
                alt="AptitudeAssessment"
                style={{ width: "100%", borderRadius: "8px", marginTop: '0.1rem' }}
              />
              <Typography
                component="h6"
                variant="h6"
                align="center"
                color="inherit"
                gutterBottom
              > Aptitude Assessment </Typography>
            </Grid>
            <Grid item xs={12} sm={3}>

              <img
                src={Github}
                alt="Github"
                style={{ width: "100%", borderRadius: "8px", marginTop: '0.1rem', borderStyle: 'solid', borderColor: 'grey' }}
              />
              <Typography
                component="h6"
                variant="h6"
                align="center"
                color="inherit"
                gutterBottom
              > Project Evaluation</Typography>
            </Grid>

            <Grid item xs={12} sm={3}>

              <img
                src={Coding}
                alt="Coding"
                style={{ width: "100%", borderRadius: "8px", marginTop: '0.1rem' }}
              />
              <Typography
                component="h6"
                variant="h6"
                align="center"
                color="inherit"
                gutterBottom
              > Coding Assessment </Typography>
            </Grid>
            <Grid item xs={12} sm={3}>

              <img
                src={Video}
                alt="Video"
                style={{ width: "100%", borderRadius: "8px", marginTop: '0.1rem' }}
              />
              <Typography
                component="h6"
                variant="h6"
                align="center"
                color="inherit"
                gutterBottom
              > Video Interview </Typography>
            </Grid>
          </Grid>
        </Container>
      </section>

      <Divider />

      <section style={sectionStyle}>
        <Container maxWidth="md">
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} sm={6}>
              <img
                src={RecruiterImage}
                alt="Recruiters"
                style={{ width: "100%", borderRadius: "8px" }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Card sx={{ boxShadow: "none" }}>
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    For Employers
                  </Typography>
                  <Typography variant="body1" paragraph>
                    HireX provides innovative tools and services for employers
                    to streamline their hiring process:
                  </Typography>
                  <List>
                    <ListItem disablePadding>
                      <ListItemText primary="Invite and manage interviewers efficiently" />
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemText primary="Facilitate code assessments with ease" />
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemText primary="Conduct comprehensive project evaluations" />
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemText primary="Receive real-time status notifications" />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </section>

      <Divider />

      <section style={sectionStyle}>
        <Container maxWidth="md">
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} sm={6}>
              <Card sx={{ boxShadow: "none" }}>
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    For Candidates
                  </Typography>
                  <Typography variant="body1" paragraph>
                    Candidates enjoy a seamless experience with HireX, offering:
                  </Typography>
                  <List>
                    <ListItem disablePadding>
                      <ListItemText primary="On-spot assessments for quick evaluation" />
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemText primary="Rapid response times for applications" />
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemText primary="User-friendly interface for easy navigation" />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6}>
              <img
                src={CandidateImage}
                alt="Candidates"
                style={{ width: "100%", borderRadius: "8px" }}
              />
            </Grid>
          </Grid>
        </Container>
      </section>

      <Divider />
      <section style={sectionStyle}>
        <Box py={6}>
          <Container maxWidth="xl">
            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} sm={6}>
                <Paper elevation={3} sx={{ p: 4, boxShadow: "none" }}>
                  <Typography variant="h5" gutterBottom>
                    About Us
                  </Typography>
                  <Typography variant="body1" paragraph>
                    HireX is dedicated to revolutionizing the hiring process by
                    connecting exceptional talent with leading companies. Our
                    platform provides innovative solutions for both recruiters
                    and candidates, ensuring a seamless experience for all
                    users.
                  </Typography>
                  <Typography variant="body1" paragraph>
                    We strive to make the recruitment process efficient,
                    effective, and enjoyable for both employers and job seekers
                    alike. With our user-friendly interface and advanced
                    features, we aim to streamline the hiring journey and foster
                    meaningful connections between employers and candidates.
                  </Typography>
                  <Typography variant="body1" paragraph>
                    Join HireX today and experience the future of hiring!
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6}>
                <img
                  src={AboutUsImage}
                  alt="About Us"
                  style={{ width: "100%" }}
                />
              </Grid>
            </Grid>
          </Container>
        </Box>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;
