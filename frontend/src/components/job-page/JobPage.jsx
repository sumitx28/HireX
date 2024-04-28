// @author Sumit Savaliya
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Typography,
  Button,
  Box,
  useMediaQuery,
  Chip,
  Snackbar,
} from "@mui/material";
import {
  LocationOn as LocationOnIcon,
  Work as WorkIcon,
  Event as EventIcon,
  AttachMoney as AttachMoneyIcon,
  LocalHospital as LocalHospitalIcon,
  AccountBalance as AccountBalanceIcon,
  Schedule as ScheduleIcon,
  VerifiedUser as VerifiedUserIcon,
  Language as LanguageIcon,
  Edit as EditIcon,
  Group as GroupIcon,
} from '@mui/icons-material';
import { activateJobHiring, deactivateJobHiring, getJobData } from "../../services/api/jobApis";
import { jwtDecode } from "jwt-decode";

const DetailItem = ({ icon, value }) => (
  <Box display="flex" alignItems="center">
    {icon}
    <Typography variant="body1" marginLeft="5px">{value}</Typography>
  </Box>
);

const SkillChip = ({ label }) => (
  <Box marginRight="5px" marginBottom="5px">
    <Chip
      label={label}
      variant="outlined"
      color="primary"
      size="small"
      sx={{ borderRadius: '20px', paddingX: '10px', paddingY: '5px' }}
    />
  </Box>
);

const JobPost = () => {
  const { jobId } = useParams();
  const [isActive, setIsActive] = useState();
  const [jobData, setJobData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const isMobile = useMediaQuery('(max-width:600px)');
  const navigate = useNavigate();
  const jwtToken = localStorage.getItem("JWTToken");
  const user = jwtDecode(jwtToken);
  const role = user.roles[0];

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await getJobData(jobId);
        setJobData(response);
        setIsActive(response.active);
      } catch (error) {
        console.error("Error fetching job data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [jobId]);

  const handleDeactivateJob = async () => {
    try {
      await deactivateJobHiring(jobId);
      setIsActive(false);
      setSnackbarMessage("Hiring Deactivated");
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error deactivating job:", error);
      setSnackbarMessage("Internal Server Error");
      setSnackbarOpen(true);
    }
  };

  const handleActivateJob = async () => {
    try {
      await activateJobHiring(jobId);
      setIsActive(true);
      setSnackbarMessage("Hiring Activated");
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error activating job:", error);
      setSnackbarMessage("Internal Server Error");
      setSnackbarOpen(true);
    }
  };

  const handleEdit = () => {
    navigate(`edit`);
  }

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box width="100%" marginBottom="20px">
      {isLoading ? (
        <Typography>Loading...</Typography>
      ) : (
        <>
          <Box width="100%" padding="20px" boxSizing="border-box">
            <Typography variant="h3" fontWeight="bold">{jobData.jobName}</Typography>
            <Box display="flex" alignItems="center" marginTop="10px">
              <Typography variant="h5" fontWeight="bold" marginRight="10px">{jobData.companyName}</Typography>
              {!isMobile && (
                <>
                  {role === "recruiter" ? <Button variant="contained" color="primary" startIcon={<EditIcon />} onClick={handleEdit}>Edit</Button> : ""}
                  <Button variant="contained" color="primary" startIcon={<GroupIcon />} onClick={() => navigate(`/candidate-status/${jobId}`)} style={{ marginLeft: '10px' }}>All Applicants</Button>
                  {role == "interviewer" ? <Button variant="contained" color="primary" onClick={() => navigate("/codeassessment", { state: jobId })} style={{ marginLeft: '10px' }}>Create/Update code assessment</Button> : ""}
                  {role == "interviewer" ? <Button variant="contained" color="primary" onClick={() => navigate("/projectevaluation", { state: jobId })} style={{ marginLeft: '10px' }}>Create/Update project evaluation</Button> : ""}
                  {role === "recruiter" ? isActive ? <Button variant="contained" color="error" onClick={handleDeactivateJob} style={{ marginLeft: '10px' }}>Pause Hiring</Button> : <Button variant="contained" color="success" onClick={handleActivateJob} style={{ marginLeft: '10px' }}>Resume Hiring</Button> : ""}
                </>
              )}
              {isMobile && (
                <Box width="70%" padding="20px" boxSizing="border-box">
                  {role === "recruiter" ? <Box marginBottom="10px">
                    <Button variant="contained" color="primary" startIcon={<EditIcon />} onClick={handleEdit} sx={{ width: '100%' }}>Edit</Button>
                  </Box> : ""}
                  <Box marginBottom="10px">
                    <Button variant="contained" color="primary" startIcon={<GroupIcon />} onClick={() => navigate(`/candidate-status/${jobId}`)} sx={{ width: '100%' }}>All Applicants</Button>
                  </Box>
                  {role == "interviewer" ? <Box marginBottom="10px"><Button variant="contained" color="primary" onClick={() => navigate("/codeassessment", { state: jobId })} style={{ marginLeft: '10px' }}>Create/Update code assessment</Button></Box> : ""}
                  {role == "interviewer" ? <Box marginBottom="10px"><Button variant="contained" color="primary" onClick={() => navigate("/projectevaluation", { state: jobId })} style={{ marginLeft: '10px' }}>Create/Update project evaluation</Button></Box> : ""}
                  {role === "recruiter" ? isActive ? <Box><Button variant="contained" color="error" onClick={handleDeactivateJob} style={{ marginLeft: '10px' }}>Pause Hiring</Button></Box> : <Box><Button variant="contained" color="success" onClick={handleActivateJob} style={{ marginLeft: '10px' }}>Resume Hiring</Button></Box> : ""}
                </Box>
              )}
            </Box>
            <Box marginTop="10px">
              <DetailItem icon={<LocationOnIcon />} value={jobData.jobLocation} />
              <DetailItem icon={<WorkIcon />} value={jobData.employmentType} />
              <DetailItem icon={<EventIcon />} value={jobData.applicationDeadline} />
            </Box>
            <Typography variant="body1" marginTop="10px">{jobData.companyOverview}</Typography>
            <Typography variant="subtitle1" fontWeight="bold" marginTop="10px">Tech Stack</Typography>
            <Box display="flex" flexWrap="wrap" marginTop="10px">
              {jobData.requiredSkills.split(',').map((skill, index) => (
                <SkillChip key={index} label={skill.trim()} />
              ))}
            </Box>
          </Box>
          {isMobile && (
            <>
              <Box width="100%" padding="20px" boxSizing="border-box">
                <Typography variant="h5" fontWeight="bold">Job Description</Typography>
                <Typography variant="body1">{jobData.jobDescription}</Typography>
                <br />
                <Typography variant="h5" fontWeight="bold">Qualifications</Typography>
                <ul>
                  {jobData.requiredQualifications.split('.').filter((qualification) => qualification.trim() !== '').map((qualification, index) => (
                    <li key={index} style={{ marginLeft: '15px' }}>
                      <Typography variant="body1">{qualification.trim()}.</Typography>
                    </li>
                  ))}
                </ul>
              </Box>
              <Box width="100%" padding="20px" boxSizing="border-box">
                <Typography variant="h5" fontWeight="bold">Benefits</Typography>
                <Box marginBottom="10px"><DetailItem icon={<AttachMoneyIcon />} value={jobData.salaryRange} /></Box>
                <Box marginBottom="10px"><DetailItem icon={<LocalHospitalIcon />} value={jobData.healthInsurance} /></Box>
                <Box marginBottom="10px"><DetailItem icon={<AccountBalanceIcon />} value={jobData.retirementPlans} /></Box>
                <Box marginBottom="10px"><DetailItem icon={<ScheduleIcon />} value={jobData.paidTimeOff} /></Box>
                <Box marginBottom="10px"><DetailItem icon={<VerifiedUserIcon />} value={jobData.certificationsOrLicenses} /></Box>
                <Box marginBottom="10px"><DetailItem icon={<LanguageIcon />} value={jobData.languageProficiencyRequirements} /></Box>
              </Box>
            </>
          )}
          {!isMobile && (
            <>
              <Box width="100%" padding="20px" boxSizing="border-box">
                <Typography variant="h5" fontWeight="bold">Job Description</Typography>
                <Typography variant="body1">{jobData.jobDescription}</Typography>
              </Box>
              <Box display="flex" justifyContent="space-between" flexDirection="row" flexWrap="wrap">
                <Box width="70%" p={2} boxSizing="border-box">
                  <Box width="100%" boxSizing="border-box">
                    <Typography variant="h5" fontWeight="bold">Qualifications</Typography>
                    <ul>
                      {jobData.requiredQualifications.split('.').filter((qualification) => qualification.trim() !== '').map((qualification, index) => (
                        <li key={index} style={{ marginLeft: '15px' }}>
                          <Typography variant="body1">{qualification.trim()}.</Typography>
                        </li>
                      ))}
                    </ul>
                  </Box>
                </Box>
                <Box width="30%" p={2} boxSizing="border-box" borderRadius={16}>
                  <Box width="100%" boxSizing="border-box">
                    <Typography variant="h5" fontWeight="bold">Benefits</Typography>
                    <Box marginBottom="10px"><DetailItem icon={<AttachMoneyIcon />} value={`$${jobData.minSalary} - $${jobData.maxSalary} per annum.`} /></Box>
                    <Box marginBottom="10px"><DetailItem icon={<LocalHospitalIcon />} value={jobData.healthInsurance} /></Box>
                    <Box marginBottom="10px"><DetailItem icon={<AccountBalanceIcon />} value={jobData.retirementPlans} /></Box>
                    <Box marginBottom="10px"><DetailItem icon={<ScheduleIcon />} value={jobData.paidTimeOff} /></Box>
                    <Box marginBottom="10px"><DetailItem icon={<VerifiedUserIcon />} value={jobData.certificationsOrLicenses} /></Box>
                    <Box marginBottom="10px"><DetailItem icon={<LanguageIcon />} value={jobData.languageProficiencyRequirements} /></Box>
                  </Box>
                </Box>
              </Box>
            </>
          )}
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}
            message={snackbarMessage}
          />
        </>
      )
      }
    </Box >
  );
};

export default JobPost;
