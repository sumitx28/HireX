// @author Sumit Savaliya
import { CircularProgress, Typography, Snackbar, Button, Pagination } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { Grid, Card, CardContent, CardMedia, Box } from '@mui/material';
import { useEffect, useState } from "react";
import { deactivateJobHiring, getAllJobsByRecruiter, activateJobHiring, getAllJobsByInterviewer } from "../../../services/api/jobApis";
import { jwtDecode } from 'jwt-decode';
import { useAuth } from "../../../authUtility/authprovider";

const SkeletonJob = ({ job, onJobUpdate, role }) => {
  const navigate = useNavigate();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const { user } = useAuth();

  const handleViewJob = () => {
    navigate(`/recruiter/job/${job.jobId}`);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleDeactivate = async (jobId) => {
    const response = await deactivateJobHiring(jobId);

    if (response) {
      setSnackbarMessage("Hiring Deactivated");
      setSnackbarOpen(true);
      onJobUpdate();
    } else {
      setSnackbarMessage("Internal Server Error");
      setSnackbarOpen(true);
    }
  };

  const handleActivate = async (jobId) => {
    const response = await activateJobHiring(jobId);
    if (response) {
      setSnackbarMessage("Hiring Activated");
      setSnackbarOpen(true);
      onJobUpdate();
    } else {
      setSnackbarMessage("Internal Server Error");
      setSnackbarOpen(true);
    }
  };

  return (
    <Card sx={{ maxWidth: 345, margin: '10px' }}>
      <CardMedia
        component="img"
        height="140"
        image={job.companyImage}
        alt="Company"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {job.jobName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {job.jobDescription?.substring(0, 10)}...
        </Typography>
        <Box mt={2} display="flex" justifyContent="space-between">
          <Button onClick={handleViewJob} variant="contained" color="primary">
            View Job
          </Button>
          {role === "recruiter" && (job.active ? (
            <Button onClick={() => handleDeactivate(job.jobId)} variant="contained" color="error">
              Pause Hiring
            </Button>
          ) : (
            <Button onClick={() => handleActivate(job.jobId)} variant="contained" color="success">
              Resume Hiring
            </Button>
          ))}
        </Box>
      </CardContent>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
      />
    </Card>
  );
};

const RecruiterHome = () => {
  const [jobData, setJobData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage] = useState(8);
  const jwtToken = localStorage.getItem("JWTToken");
  const user = jwtDecode(jwtToken);
  const role = user.roles[0];
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchJobs() {
      setIsLoading(true);
      if (role == "recruiter") await getAllJobsByRecruiter(setJobData, user.sub);
      else await getAllJobsByInterviewer(setJobData, user.sub);
      setIsLoading(false);
    }

    fetchJobs();
  }, []);

  const handleJobUpdate = async () => {
    if (role == "recruiter") await getAllJobsByRecruiter(setJobData, user.sub);
    else await getAllJobsByInterviewer(setJobData, user.sub);
  };

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobData.slice(indexOfFirstJob, indexOfLastJob);

  const paginate = (event, value) => setCurrentPage(value);

  const newJobPostButtonHandler = () => {
    navigate("/recruiter/new-job-post");
  }

  return (
    <div style={{ width: '100%', marginTop: '10px', marginBottom: '50px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      {isLoading ? (
        <CircularProgress color="primary" size={80} />
      ) : (
        <>
          {jobData.length !== 0 ? (
            <Typography variant="h4" gutterBottom>
              Posted Jobs
            </Typography>
          ) : (
            <div style={{ marginTop: '20%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <Typography variant="h4" gutterBottom align="center">
                No Jobs Posted Yet
              </Typography>
              {role == "recruiter" && <Button variant="contained" color="primary" onClick={newJobPostButtonHandler}>
                New Job Post
              </Button>}
            </div>
          )}
          <Grid container spacing={2} justifyContent="center" alignItems="center">
            {currentJobs.map((job, index) => (
              <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                <SkeletonJob job={job} onJobUpdate={handleJobUpdate} role={role} />
              </Grid>
            ))}
          </Grid>
          {jobData.length !== 0 ? (
            <div style={{ marginTop: '20px' }}>
              <Pagination
                count={Math.ceil(jobData.length / jobsPerPage)}
                page={currentPage}
                onChange={paginate}
                color="primary"
              />
            </div>
          ) : null}
        </>
      )
      }
    </div >
  );

};

export default RecruiterHome;
