// @author Sumit Savaliya
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { approveCodingAssessment, getAllApplicants, updateCandidateStatus } from "../../services/api/candidateJobApis";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Grid, Box, Typography, Snackbar } from "@mui/material";
import { getJobData, sendHireNotification } from "../../services/api/jobApis";
import {
    LocationOn as LocationOnIcon,
    Work as WorkIcon,
    Event as EventIcon,
} from '@mui/icons-material';
import { jwtDecode } from 'jwt-decode';
import ApplicantDetailsDialog from './ApplicantDetailsDialog';

const StatusPage = () => {
    const { jobId } = useParams();
    const [jobData, setJobData] = useState({});
    const [candidateData, setCandidateData] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const jwtToken = localStorage.getItem("JWTToken");
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedApplicant, setSelectedApplicant] = useState(null);
    const user = jwtDecode(jwtToken);
    const role = user.roles[0];

    useEffect(() => {
        const fetchData = async () => {
            const response = await getAllApplicants(jobId);
            if (role === "interviewer") setCandidateData(response);
            else setCandidateData(response);

        };
        fetchData();
    }, [jobId, refresh]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getJobData(jobId);
                setJobData(response);
            } catch (error) {
                console.error("Error fetching job data:", error);
            }
        };
        fetchData();
    }, [jobId]);

    const handleAcceptClick = async (candidateId) => {
        const payload = {
            candidateId,
            jobId,
            hired: true
        };
        await updateCandidateStatus(payload, refresh, setRefresh);
    };

    const handleRejectClick = async (candidateId) => {
        const payload = {
            candidateId,
            jobId,
            hired: false
        };
        await updateCandidateStatus(payload, refresh, setRefresh);
    };

    const handleApproveClick = async (candidateId) => {
        const payload = {
            candidateId,
            jobId,
            approved: true
        }
        await approveCodingAssessment(payload, refresh, setRefresh);
    }

    const DetailItem = ({ icon, value }) => (
        <Box display="flex" alignItems="center">
            {icon}
            <Typography variant="body1" marginLeft="5px">{value}</Typography>
        </Box>
    );

    const RecruiterButtonRender = (candidate) => {
        if (!candidate.approved) return <Button variant="contained" color="primary" onClick={() => handleApproveClick(candidate.candidate.userId)}>Approve Assessment</Button>;
        if (candidate.approved && candidate.selected == null) return "In Progress";
        if (candidate.approved && candidate.selected) return <Button variant="contained" color="success" onClick={() => handleHire(candidate)}> Hire</Button >;
        if (candidate.candidateJobStatus.interviewCompleted && candidate.selected == null) return "In Progress";
        if (candidate.approved && !candidate.selected) return "Rejected";
    }

    const handleHire = async (candidate) => {
        await sendHireNotification(candidate.candidate.email, candidate.job);
        setSnackbarMessage("Hiring Email Sent Successfully");
        setSnackbarOpen(true);
    }

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    const handleOpenDialog = (applicant) => {
        setSelectedApplicant(applicant);
        setDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
        setSelectedApplicant(null);
    };

    const interviewResult = (candidate) => {
        if (candidate.selected == null) {
            return <TableCell>Pending</TableCell>
        }
        else if (candidate.selected) {
            return <TableCell>Selected</TableCell>
        }
        else {
            return <TableCell>Rejected</TableCell>
        }
    }

    const interviewStatus = (candidate) => {

    }

    return (
        <div style={{ padding: '20px' }}>
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
            </Box>
            <Grid container spacing={3} style={{ marginTop: '20px' }}>
                <Grid item xs={12}>
                    {role === "interviewer" ? <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Coding Test</TableCell>
                                    <TableCell>Project</TableCell>
                                    <TableCell>Git Repository</TableCell>
                                    <TableCell>Interview Status</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {candidateData.map((candidate, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{candidate.candidate?.firstname} {candidate.candidate?.lastname}</TableCell>
                                        <TableCell>{candidate.candidate?.email}</TableCell>
                                        <TableCell>{candidate.candidateJobStatus.codeCompleted ? "Complete" : "Not Started"}</TableCell>
                                        <TableCell>{candidate.candidateJobStatus.projectCompleted ? "Complete" : "Not Started"}</TableCell>
                                        <TableCell><a href={candidate.candidateJobStatus.gitRepoLink} target="_blank" rel="noopener noreferrer">{candidate.candidateJobStatus.gitRepoLink}</a></TableCell>
                                        <TableCell>{candidate.candidateJobStatus.interviewCompleted ? "Complete" : "Not Started"}</TableCell>
                                        <TableCell>
                                            {candidate.selected ? "" : <Button variant="contained" color="primary" onClick={() => handleAcceptClick(candidate.candidate.userId)} style={{ marginRight: '10px', marginTop: '8px' }}>Accept</Button>}
                                            <Button variant="contained" onClick={() => handleRejectClick(candidate.candidate.userId)} color="error" style={{ marginTop: '8px' }}>Reject</Button>
                                        </TableCell>
                                        <TableCell>
                                            <Button variant="contained" color="secondary" onClick={() => handleOpenDialog(candidate)}>Applicant Details</Button>
                                            <ApplicantDetailsDialog open={dialogOpen} handleClose={handleCloseDialog} applicant={selectedApplicant} />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer> : <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Assessment Approval</TableCell>
                                    <TableCell>Interview Status</TableCell>
                                    <TableCell>Interview Result</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {candidateData.map((candidate, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{candidate.candidate?.firstname} {candidate.candidate?.lastname}</TableCell>
                                        <TableCell>{candidate.candidate?.email}</TableCell>
                                        <TableCell>{candidate.approved ? "Granted" : "Not Yet"}</TableCell>
                                        <TableCell>{candidate.candidateJobStatus.interviewCompleted ? "Complete" : "Not Started"}</TableCell>
                                        {interviewResult(candidate)}
                                        <TableCell>
                                            {RecruiterButtonRender(candidate)}
                                        </TableCell>
                                        <TableCell>
                                            <Button variant="contained" color="secondary" onClick={() => handleOpenDialog(candidate)}>Applicant Details</Button>
                                            <ApplicantDetailsDialog open={dialogOpen} handleClose={handleCloseDialog} applicant={selectedApplicant} />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>}
                </Grid>
            </Grid>
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                message={snackbarMessage}
            />
        </div>
    );
};

export default StatusPage;
