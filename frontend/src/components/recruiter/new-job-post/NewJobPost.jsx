// @author Sumit Savaliya
import React, { useEffect, useState } from "react";
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  useMediaQuery,
  Box,
  Snackbar,
} from "@mui/material";
import JobDetailsReview from "./JobDetailsReview";
import { getJobData, postNewJob, updateJob } from "../../../services/api/jobApis";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { storage } from '../../../firebase-config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useAuth } from "../../../authUtility/authprovider";
import JobDetailsForm from "./JobDetailsForm";
import Benefits from "./BenefitsForm";
import InterviewerForm from "./InterviewerForm";

const steps = ["Job Details", "Benefits", "Interviewer", "Review"];

const NewJobPost = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isEdit, setIsEdit] = useState(false);
  const { jobId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [companyImage, setCompanyImage] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    setIsEdit(location.pathname.includes('edit'));
  }, [location]);

  const [formData, setFormData] = useState({
    position: "",
    companyName: "",
    jobLocation: "",
    employmentType: "Full Time",
    companyOverview: "",
    requiredSkills: "",
    jobDescription: "",
    requiredQualifications: "",
    interviewerEmail: "",
    salaryMin: '',
    salaryMax: '',
    healthInsurance: '',
    retirementPlan: '',
    certificationsOrLicenses: '',
    leaves: '',
    firstName: '',
    lastName: ''
  });

  const [successAlert, setSuccessAlert] = useState(false);
  const [failureAlert, setFailureAlert] = useState(false);
  const isMobile = useMediaQuery('(max-width:600px)');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (isEdit) {
      const fetchJobData = async () => {
        const response = await getJobData(jobId);
        setFormData({
          position: response.jobName,
          companyName: response.companyName,
          jobLocation: response.jobLocation,
          employmentType: response.employmentType,
          companyOverview: response.companyOverview,
          requiredSkills: response.requiredSkills,
          jobDescription: response.jobDescription,
          requiredQualifications: response.requiredQualifications,
          interviewerEmail: response.interviewer.email,
          firstName: response.interviewer.firstname,
          lastName: response.interviewer.lastname,
          salaryMin: response.minSalary,
          salaryMax: response.maxSalary,
          healthInsurance: response.healthInsurance,
          retirementPlan: response.retirementPlans,
          certificationsOrLicenses: response.certificationsOrLicenses,
          leaves: response.paidTimeOff,
          firstName: response.interviewer.firstname,
          lastName: response.interviewer.lastname,
          language: response.languageProficiencyRequirements,
        });

        setCompanyImage(response.companyImage);
      }

      fetchJobData();
    }
  }, [isEdit]);

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleImageUpload = (event) => {
    setCompanyImage(event.target.files[0]);
  };

  const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleAlertClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSuccessAlert(false);
    setFailureAlert(false);
  };

  const validateForm = () => {
    switch (activeStep) {
      case 0:
        return (
          formData.position.trim() !== "" &&
          formData.jobDescription.trim() !== "" &&
          formData.requiredQualifications.trim() !== ""
        );
      case 1:
        return (
          formData.salaryMin != "" &&
          formData.salaryMax != "" &&
          formData.healthInsurance != "" &&
          formData.certificationsOrLicenses != "" &&
          formData.retirementPlan != "" &&
          formData.leaves != "" &&
          !isSalaryMaxInvalid &&
          !isSalaryMinInvalid
        )
      case 2:
        if (formData.interviewerEmail.trim() === "") {
          return false;
        } else if (!isValidEmail(formData.interviewerEmail)) {
          return false;
        } else {
          return (
            formData.firstName != "" &&
            formData.lastName != ""
          );
        }
      default:
        return true;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      if (activeStep === 3) {
        const imagePath = `companyLogos/${jobId}_${new Date().toISOString()}_${companyImage.name}`;
        const imageRef = ref(storage, imagePath);
        const imageUploadTask = await uploadBytes(imageRef, companyImage);
        const imageDownloadURL = await getDownloadURL(imageUploadTask.ref);


        const jobDetailsPayload = {
          jobName: formData.position,
          jobDescription: formData.jobDescription,
          requiredQualifications: formData.requiredQualifications,
          interviewerEmail: formData.interviewerEmail,
          companyName: formData.companyName,
          jobLocation: formData.jobLocation,
          employmentType: formData.employmentType,
          companyOverview: formData.companyOverview,
          requiredSkills: formData.requiredSkills,
          minSalary: formData.salaryMin,
          maxSalary: formData.salaryMax,
          healthInsurance: formData.healthInsurance,
          retirementPlans: formData.retirementPlan,
          certificationsOrLicenses: formData.certificationsOrLicenses,
          paidTimeOff: formData.leaves,
          interviewerFirstName: formData.firstName,
          interviewerLastName: formData.lastName,
          languageProficiencyRequirements: formData.language,
          applicationDeadline: "2025-01-01",
          companyImage: imageDownloadURL
        };

        if (!isEdit) {
          try {
            const response = await postNewJob(jobDetailsPayload, user.sub);
            if (response.success) {
              setSuccessAlert(true);
              navigate(`/recruiter/job/${response.job.jobId}`)
            } else {
              setFailureAlert(true);
            }
          } catch (error) {
            console.error('Error handling form submission:', error);
            setFailureAlert(true);
          }
          return;
        }
        else {
          try {
            const success = await updateJob(jobId, jobDetailsPayload);
            if (success) {
              setSuccessAlert(true);
              navigate(`/recruiter/job/${jobId}`)
            } else {
              setFailureAlert(true);
            }
          } catch (error) {
            console.error('Error handling form submission:', error);
            setFailureAlert(true);
          }
          return;
        }
      }
      setActiveStep(activeStep + 1);
    }
  };

  const isSalaryMinInvalid = parseInt(formData.salaryMin.replace(/\D/g, '')) >= parseInt(formData.salaryMax.replace(/\D/g, ''));
  const isSalaryMaxInvalid = parseInt(formData.salaryMax.replace(/\D/g, '')) <= parseInt(formData.salaryMin.replace(/\D/g, ''));


  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography variant="h4" gutterBottom>
        {isEdit ? "Update Job" : "New Job Post"}
      </Typography>
      <div
        style={{
          width: "80%",
          marginBottom: "20px",
        }}
      >
        <Stepper
          activeStep={activeStep}
          alternativeLabel
          style={{
            borderRadius: "10px",
          }}
        >
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </div>
      <div
        style={{
          width: "80%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "light"
        }}
      >
        {activeStep === steps.length - 1 ? (
          <JobDetailsReview formData={formData} setActiveStep={setActiveStep} handleSubmit={handleSubmit} />
        ) : (
          <div
            style={{
              width: isMobile ? "100%" : "70%",
              marginBottom: "20px",
            }}
          >
            <form onSubmit={handleSubmit}>
              {activeStep === 0 && (
                <JobDetailsForm formData={formData} handleChange={handleChange} handleImageUpload={handleImageUpload} />
              )}
              {activeStep === 1 && (
                <Benefits formData={formData} isSalaryMaxInvalid={isSalaryMaxInvalid} isSalaryMinInvalid={isSalaryMinInvalid} handleChange={handleChange} />
              )}
              {activeStep === 2 && (
                <InterviewerForm handleChange={handleChange} formData={formData} />
              )}
              <Box
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "20px",
                }}
              >
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  variant="outlined"
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={!validateForm()}
                >
                  {activeStep === steps.length - 1 ? "Create" : "Next"}
                </Button>
              </Box>
            </form>
          </div>
        )
        }
      </div >
      <Snackbar
        open={successAlert}
        autoHideDuration={6000}
        onClose={handleAlertClose}
        message="Job posted successfully!"
      />
      <Snackbar
        open={failureAlert}
        autoHideDuration={6000}
        onClose={handleAlertClose}
        message="Failed to post job!"
      />
    </div >
  );
};

export default NewJobPost;
