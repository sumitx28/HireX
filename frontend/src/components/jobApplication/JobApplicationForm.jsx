// @author Nisarg Chudasama

import React, { useState } from 'react';
import { Container, Grid, TextField, Button, Typography, Paper, Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { submitApplication } from '../../services/api/candidateJobApis';
import { useParams } from 'react-router-dom';
import { storage } from '../../firebase-config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useAuth } from '../../authUtility/authprovider';

// Job application form component
const JobApplicationForm = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [resume, setResume] = useState(null);
  const [coverLetter, setCoverLetter] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [errors, setErrors] = useState({});
  const [resumeUploadStatus, setResumeUploadStatus] = useState('');
  const [coverLetterUploadStatus, setCoverLetterUploadStatus] = useState('');
  const { user } = useAuth();

  // Form values state with initial values
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    address: '',
    workExperience: '',
    jobTitle: '',
    achievements: '',
    education: '',
    institutionName: '',
    graduationYear: '',
    relevantSkills: '',
    references: '',
    workEligibility: '',
  });

// Function to check if a string is empty after trimming
  const isEmpty = (value) => !value.trim().length;

// Validates an email using a simple regex pattern
  const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

// Validates a year as a four-digit number
  const isValidYear = (year) => /^\d{4}$/.test(year);

// Checks if text contains only letters, spaces, and certain punctuation
  const isTextWithoutNumbers = (text) => /^[A-Za-z\s.,'-]+$/.test(text);

// Validates individual form field based on its type and updates the errors state  
  const validateField = (name, value) => {
    let fieldError = '';
    // Iterates over form values to apply validation rules
    switch (name) {
      case 'name':
      case 'jobTitle':
      case 'achievements':
      case 'education':
      case 'relevantSkills':
      case 'references':
        if (isEmpty(value)) {
          fieldError = "This field is required.";
        } else if (!isTextWithoutNumbers(value)) {
          fieldError = "This field cannot contain numbers.";
        }
        break;
      case 'email':
        fieldError = isEmpty(value) || !isValidEmail(value) ? "Valid email is required." : '';
        break;
      case 'address':
        fieldError = isEmpty(value) ? "Address is required." : '';
        break;
      case 'workExperience':
        fieldError = isEmpty(value) ? "Work experience is required." : '';
        break;
      case 'institutionName':
        fieldError = isEmpty(value) ? "Institution name is required." : '';
        break;
      case 'graduationYear':
        fieldError = isEmpty(value) || !isValidYear(value) ? "Valid graduation year is required." : '';
        break;
      case 'workEligibility':
        fieldError = isEmpty(value) ? "Work eligibility status is required." : '';
        break;
      default:
        break;
    }
    setErrors(prevErrors => ({ ...prevErrors, [name]: fieldError }));

  };

// Validates the entire form before submission  
  const validateForm = (values) => {
    const newErrors = {};
    
    for (const [name, value] of Object.entries(values)) {
     
      if (isEmpty(value)) {
        newErrors[name] = "This field is required.";
      } else if (['name', 'jobTitle', 'achievements', 'education', 'relevantSkills', 'references'].includes(name) && !isTextWithoutNumbers(value)) {
        newErrors[name] = "This field cannot contain numbers.";
      } else if (name === 'email' && !isValidEmail(value)) {
        newErrors[name] = "Valid email is required.";
      } else if (name === 'graduationYear' && !isValidYear(value)) {
        newErrors[name] = "Valid graduation year is required.";
      }
    }
    return newErrors;
  };



// Handles form input changes and performs individual field validation
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues(prevValues => ({ ...prevValues, [name]: value }));
    validateField(name, value);
  };


// Handles form submission, including file uploads and form data validation
  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validateForm(formValues);
    if (!validationErrors || Object.keys(validationErrors).length === 0){
      try {

        const resumePath = `resumes/${jobId}_${new Date().toISOString()}_${resume.name}`;
        const coverLetterPath = `coverLetters/${jobId}_${new Date().toISOString()}_${coverLetter.name}`;


        const resumeRef = ref(storage, resumePath);
        const coverLetterRef = ref(storage, coverLetterPath);


        const resumeUploadTask = await uploadBytes(resumeRef, resume);
        const resumeDownloadUrl = await getDownloadURL(resumeUploadTask.ref);


        const coverLetterUploadTask = await uploadBytes(coverLetterRef, coverLetter);
        const coverLetterDownloadUrl = await getDownloadURL(coverLetterUploadTask.ref);

        await submitApplication({ ...formValues, resumeLink: resumeDownloadUrl, coverLetterLink: coverLetterDownloadUrl }, jobId, user.userId);
        

        setOpenSnackbar(true);
        resetForm();
        navigate('/candidate/home');
  
      } catch (error) {
        console.error('Submission error:', error);
      }
    }
    else {
      setErrors(validationErrors);
    }
  };

// Handles file selection for resume and cover letter, including validation
  const handleFileUpload = (event, type) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        if (type === 'resume') {
          setResumeUploadStatus('Please upload a PDF file for the resume.');
        } else {
          setCoverLetterUploadStatus('Please upload a PDF file for the cover letter.');
        }
        event.target.value = ''; 
      } else {
        if (type === 'resume') {
          setResume(file);
          setResumeUploadStatus('Resume uploaded');
        } else {
          setCoverLetter(file);
          setCoverLetterUploadStatus('Cover letter uploaded');
        }
      }
    } else {
      if (type === 'resume') {
        setResumeUploadStatus('');
      } else {
        setCoverLetterUploadStatus('');
      }
    }
  };

// Closes the snackbar
  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

// Resets the form to its initial state
  const resetForm = () => {
    setFormValues({
      name: '',
      email: '',
      address: '',
      workExperience: '',
      jobTitle: '',
      achievements: '',
      education: '',
      institutionName: '',
      graduationYear: '',
      relevantSkills: '',
      references: '',
      workEligibility: '',
    });
    setResume(null);
    setCoverLetter(null);
    setResumeUploadStatus('');
    setCoverLetterUploadStatus('');
  };

 // Renders the job application form UI  
  return (
    <Container maxWidth="lg">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 4 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>

            <Grid item xs={12} md={6}>
              <TextField error={!!errors.name} helperText={errors.name} name="name" fullWidth label="Name" margin="normal" placeholder="Enter your name..." value={formValues.name} onChange={handleChange} />
              <TextField error={!!errors.email} helperText={errors.email} name='email' fullWidth label="Email Address" margin="normal" placeholder='Enter your email...' value={formValues.email} onChange={handleChange} />
              <TextField error={!!errors.address} helperText={errors.address} name='address' fullWidth label="Address" margin="normal" placeholder='Enter your address...' value={formValues.address} onChange={handleChange} />
              <TextField error={!!errors.workExperience} helperText={errors.workExperience} name='workExperience' fullWidth label="Work Experience" margin="normal" placeholder='Enter your work experience...' value={formValues.workExperience} onChange={handleChange} />
              <TextField error={!!errors.jobTitle} helperText={errors.jobTitle} name='jobTitle' fullWidth label="Job Title" margin="normal" placeholder='Enter your previous job title...' value={formValues.jobTitle} onChange={handleChange} />
              <TextField error={!!errors.achievements} helperText={errors.achievements} name='achievements' fullWidth label="Achievements" margin="normal" placeholder='Enter your achievements...' value={formValues.achievements} onChange={handleChange} />
              <TextField error={!!errors.education} helperText={errors.education} name='education' fullWidth label="Education" margin="normal" placeholder='Enter education details...' value={formValues.education} onChange={handleChange} />
            </Grid>


            <Grid item xs={12} md={6}>
              <TextField error={!!errors.institutionName} helperText={errors.institutionName} name='institutionName' fullWidth label="Name of Institution" margin="normal" placeholder='Enter name of institution atttended...' value={formValues.institutionName} onChange={handleChange} />
              <TextField error={!!errors.graduationYear} helperText={errors.graduationYear} name='graduationYear' fullWidth label="Graduation Year" margin="normal" placeholder='Enter your graduation year...' value={formValues.graduationYear} onChange={handleChange} />
              <TextField error={!!errors.relevantSkills} helperText={errors.relevantSkills} name='relevantSkills' fullWidth label="Relevant Skills" margin="normal" placeholder='Enter skills possessed...' value={formValues.relevantSkills} onChange={handleChange} />
              <Button variant="contained" component="label" fullWidth sx={{ marginTop: 2 }}>
                Upload Resume
                <input type="file" hidden accept=".pdf" onChange={(e) => handleFileUpload(e, 'resume')} />
              </Button>
              {resumeUploadStatus && <Typography variant="body2" color="error">{resumeUploadStatus}</Typography>}

              <Button variant="contained" component="label" fullWidth sx={{ marginTop: 2 }}>
                Upload Cover Letter
                <input type="file" hidden accept=".pdf" onChange={(e) => handleFileUpload(e, 'coverLetter')} />
              </Button>
              {coverLetterUploadStatus && <Typography variant="body2" color="error">{coverLetterUploadStatus}</Typography>}

              <TextField error={!!errors.references} helperText={errors.references} name='references' fullWidth label="References" margin="normal" placeholder='Enter work references...' value={formValues.references} onChange={handleChange} />
              <TextField error={!!errors.workEligibility} helperText={errors.workEligibility} name='workEligibility' fullWidth label="Work Eligibility" margin="normal" placeholder='Enter work eligibility...' value={formValues.workEligibility} onChange={handleChange} />
            </Grid>


            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" fullWidth onSubmit={handleSubmit}>
                Submit Application
              </Button>
            </Grid>

            <Grid item xs={12}>
            <Button type="button" variant="contained" color="secondary" fullWidth onClick={resetForm}>
              Reset Form
            </Button>
          </Grid>
          </Grid>
        </form>
      </Paper>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          Submitted successfully
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default JobApplicationForm; // Exporting the component for use in other parts of the app
