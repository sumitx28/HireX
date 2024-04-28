// @author Nisarg Chudasama

import { CircularProgress, Typography } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { Grid, Card, CardContent, CardMedia, Button } from '@mui/material';
import { useEffect, useState } from "react";
import { getAllJobs } from "../../services/api/jobApis";

// Component representing an individual job card in the job listings
const SkeletonJob = ({ job, onJobUpdate }) => {
  const navigate = useNavigate();

// Function to handle the event when the "View Job" button is clicked  
  const handleViewJob = () => {
    navigate(`/candidate/job/${job.jobId}`);
  };

 // Function to handle the event when the "Apply" button is clicked  
  const handleApplyJob = () => {
    navigate('/job-application/'+ job.jobId);
  };

  // Renders a card with job details and options to view or apply for the job
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
        <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'space-between' }}>
          <Button onClick={handleViewJob} variant="contained" color="primary">
            View Job
          </Button>
          <Button onClick={handleApplyJob} variant="contained" color="primary">
           Apply
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

// Main component for displaying the homepage for candidates, listing available jobs
const CandidateHome = () => {
  const [jobData, setJobData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetches all jobs when the component mounts and updates the jobData state  
  useEffect(() => {
    async function fetchJobs() {
      setIsLoading(true);
      await getAllJobs(setJobData);
      setIsLoading(false);
    };

    fetchJobs(); // Call the fetch function
  }, []); // Empty dependency array means this effect runs once on mount


// Function to refresh the list of jobs 
  const handleJobUpdate = async () => {
    await getAllJobs(setJobData);
  };

  return (
    <div style={{ width: '100%', marginTop: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant="h4" gutterBottom>
        Posted Jobs
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

export default CandidateHome; // Exporting the component for use elsewhere in the application
