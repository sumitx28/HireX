// @author Sumit Savaliya
import React, { useEffect, useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, Button } from "@mui/material";
import { getApplicantDetails } from "../../services/api/candidateJobApis";
import { Close as CloseIcon } from "@mui/icons-material";

const closeButtonStyle = {
    position: 'absolute',
    right: 8,
    top: 8,
};

const linkStyle = {
    color: '#1976d2',
    textDecoration: 'none',
    '&:hover': {
        textDecoration: 'underline',
    },
};

const ApplicantDetailsDialog = ({ open, handleClose, applicant }) => {
    const [applicantDetails, setApplicantDetails] = useState({});

    useEffect(() => {
        const fetchApplicantData = async () => {
            if (applicant?.candidateJobId != undefined) {
                await getApplicantDetails(applicant.candidateJobId, setApplicantDetails);
            }
        };

        fetchApplicantData();
    }, [applicant]);

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle style={{ backgroundColor: '#1976d2', color: '#fff' }}>Applicant Details</DialogTitle>
            <Button style={closeButtonStyle} onClick={handleClose}><CloseIcon /></Button>
            <DialogContent>
                <Typography>Name: {applicantDetails.name} {applicantDetails.lastname}</Typography>
                <Typography>Email: {applicantDetails.email}</Typography>
                <Typography>Achievements: {applicantDetails.achievements}</Typography>
                <Typography>Education: {applicantDetails.education}</Typography>
                <Typography>Graduation Year: {applicantDetails.graduationYear}</Typography>
                <Typography>References: {applicantDetails.references}</Typography>
                {applicantDetails.resumeLink && (
                    <Typography>
                        Resume Link: <a href={applicantDetails.resumeLink} target="_blank" rel="noopener noreferrer" style={linkStyle}>Resume Link</a>
                    </Typography>
                )}
                {applicantDetails.coverLetterLink && (
                    <Typography>
                        Cover Letter Link: <a href={applicantDetails.coverLetterLink} target="_blank" rel="noopener noreferrer" style={linkStyle}>Cover Letter Link</a>
                    </Typography>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">Close</Button>
            </DialogActions>
        </Dialog>
    );
};

export default ApplicantDetailsDialog;
