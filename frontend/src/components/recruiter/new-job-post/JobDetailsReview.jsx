// @author Sumit Savaliya
import React, { useState } from 'react';
import { Typography, Button, Box, Paper, CircularProgress } from '@mui/material';

const Review = ({ formData, setActiveStep, handleSubmit }) => {
    const [loading, setLoading] = useState(false);

    const handleFormSubmit = async (e) => {
        setLoading(true);
        try {
            await handleSubmit(e);
        } finally {
            setLoading(false);
        }
    };


    return (
        <Paper style={{ width: "100%", marginBottom: "20px", padding: "20px" }}>
            <Typography variant="h5" gutterBottom>
                Review
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
                Please review your entered details before submitting:
            </Typography>
            <Box
                style={{
                    border: "1px solid #ccc",
                    borderRadius: "10px",
                    padding: "20px",
                    marginBottom: "20px",
                }}
            >
                <Typography variant="subtitle2" gutterBottom>
                    <strong>Position:</strong> {formData.position}
                </Typography>
                <Typography variant="subtitle2" gutterBottom>
                    <strong>Company Name:</strong> {formData.companyName}
                </Typography>
                <Typography variant="subtitle2" gutterBottom>
                    <strong>Job Location:</strong> {formData.jobLocation}
                </Typography>
                <Typography variant="subtitle2" gutterBottom>
                    <strong>Employment Type:</strong> {formData.employmentType}
                </Typography>
                <Typography variant="subtitle2" gutterBottom>
                    <strong>Company Overview:</strong> {formData.companyOverview}
                </Typography>
                <Typography variant="subtitle2" gutterBottom>
                    <strong>Required Skills:</strong> {formData.requiredSkills}
                </Typography>
                <Typography variant="subtitle2" gutterBottom>
                    <strong>Job Description:</strong> {formData.jobDescription}
                </Typography>
                <Typography variant="subtitle2" gutterBottom>
                    <strong>Required Qualifications:</strong>{" "}
                    {formData.requiredQualifications}
                </Typography>
                <Typography variant="subtitle2" gutterBottom>
                    <strong>Interviewer's Email:</strong>{" "}
                    {formData.interviewerEmail}
                </Typography>
                <Typography variant="subtitle2" gutterBottom>
                    <strong>Min Salary:</strong> {formData.salaryMin}
                </Typography>
                <Typography variant="subtitle2" gutterBottom>
                    <strong>Max Salary:</strong> {formData.salaryMax}
                </Typography>
                <Typography variant="subtitle2" gutterBottom>
                    <strong>Health Insurance:</strong> {formData.healthInsurance}
                </Typography>
                <Typography variant="subtitle2" gutterBottom>
                    <strong>Retirement Plan:</strong> {formData.retirementPlan}
                </Typography>
                <Typography variant="subtitle2" gutterBottom>
                    <strong>Certifications or Licenses:</strong>{" "}
                    {formData.certificationsOrLicenses}
                </Typography>
                <Typography variant="subtitle2" gutterBottom>
                    <strong>Leaves:</strong> {formData.leaves}
                </Typography>
                <Typography variant="subtitle2" gutterBottom>
                    <strong>Language Proficiency:</strong>{" "}
                    {formData.language}
                </Typography>
                <Typography variant="subtitle2" gutterBottom>
                    <strong>Interviewer's First Name:</strong>{" "}
                    {formData.firstName}
                </Typography>
                <Typography variant="subtitle2" gutterBottom>
                    <strong>Interviewer's Last Name:</strong>{" "}
                    {formData.lastName}
                </Typography>
            </Box>
            <Box
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                }}
            >
                <Button
                    onClick={() => setActiveStep(0)}
                    variant="outlined"
                    color="primary"
                >
                    Edit
                </Button>
                <Button
                    onClick={handleFormSubmit}
                    variant="contained"
                    color="primary"
                    disabled={loading}
                    style={{ position: 'relative' }}
                >
                    {loading && <CircularProgress size={24} />}
                    {!loading && "Submit"}
                </Button>
            </Box>
        </Paper>
    );
};

export default Review;
