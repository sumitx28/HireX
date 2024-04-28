// @author Nisarg Chudasama

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Typography,
  Button,
  Box,
  useMediaQuery,
  Chip,
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
} from '@mui/icons-material';
import { getJobData } from "../../services/api/jobApis";

// Component to display individual job detail items with an icon and text
const DetailItem = ({ icon, value }) => (
  <Box display="flex" alignItems="center">
    {icon}
    <Typography variant="body1" marginLeft="5px">{value}</Typography>
  </Box>
);

// Component to display skills as chips
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

// Main component to display job details
const CandidateJobDetails = () => {
  const { jobId } = useParams();  // Retrieve jobId from URL parameters

 // State hooks for job activity status, job data, loading status, and screen width
  const [isActive, setIsActive] = useState();
  const [jobData, setJobData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const isMobile = useMediaQuery('(max-width:600px)');
  const navigate = useNavigate();

// Fetch job data on component mount or jobId change
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await getJobData(jobId);
        setJobData(response);
        setIsActive(response.active);
      } catch (error) {
        console.error("Error fetching job data:", error); // Handle any fetch errors
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [jobId]); // Dependency array includes jobId to refetch data when it changes

// Render job details or loading text based on isLoading state
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
        </>
      )}
    </Box>
  );
};

export default CandidateJobDetails; // Exporting the component for use elsewhere in the application
