// @author Nisarg Chudasama

import { CircularProgress, Typography } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { Grid, Card, CardContent, CardMedia, Button } from '@mui/material';
import { useEffect, useState } from "react";
import { getAllJobsAppliedByEmail } from "../../services/api/jobApis";
import { useAuth } from "../../authUtility/authprovider";

// Component representing an individual job item in the list of applied jobs
const SkeletonJob = ({ job, onJobUpdate }) => {
  const navigate = useNavigate();

// Function to handle the click event on the "View Status" button
  const handleViewStatus = () => {
    navigate(`/status/${job.jobId}`);
  }

// Renders a card with job details and a "View Status" button
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
        <Button onClick={handleViewStatus} variant="contained" color="primary" style={{ marginTop: '10px' }}>
          View Status
        </Button>
      </CardContent>
    </Card>
  );
};

// Main component for displaying the list of jobs a candidate has applied for
const CandidateAppliedJobs = () => {

// State for managing the list of jobs and the loading status
  const [jobData, setJobData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

// Effect hook to fetch job data on component mount
  useEffect(() => {
    async function fetchJobs() {
      setIsLoading(true);
      await getAllJobsAppliedByEmail(setJobData, user.sub);
      setIsLoading(false);
    };

    fetchJobs(); // Invoke the fetching function
  }, []); // Empty dependency array means this runs once on mount


// Handler for updating job list 
  const handleJobUpdate = async () => {
    await getAllJobsAppliedByEmail(setJobData, user.sub);
  };

// Renders the UI for the applied jobs page
  return (
    <div style={{ width: '100%', marginTop: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant="h4" gutterBottom>
        Applied Jobs
      </Typography>
      {isLoading ? (
        <CircularProgress color="primary" size={80} />
      ) : (
        <Grid container spacing={2} sx={{ textAlign: 'center', maxWidth: '100%' }}>
          {jobData.map((job, index) => (
            <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
              <SkeletonJob job={job} onJobUpdate={handleJobUpdate} />
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default CandidateAppliedJobs; // Exporting the component for use in other parts of the app
