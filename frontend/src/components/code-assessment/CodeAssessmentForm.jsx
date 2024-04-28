// @author Roshni Joshi
// This component renders the coding assessment form

import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CodeFormFirstPage from './CodeFormFirstPage';
import CodeFormSecondPage from './CodeFormSecondPage';
import { Backdrop, CircularProgress, Container } from '@mui/material';
import { getCodeAssessmentData, saveCodeAssessmentData } from '../../services/api/PreInterviewEvaluationApis';
import { DEFAULT_CODE_ASSESSMENT } from '../../services/utils/Constants';
import { useLocation } from 'react-router';
import Popup from '../shared/Popup';
import '../../css/code-assessment.css';

const steps = ['Select assessment settings', 'Add coding problems'];

export default function CodeAssessmentForm() {
  const { state: jobId } = useLocation();
  const [prevData, setPrevData] = useState();
  const [codeAssessmentData, setCodeAssessmentData] = useState(DEFAULT_CODE_ASSESSMENT)
  const [activeStep, setActiveStep] = useState(0);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [refreshFlag, setRefreshFlag] = useState(false);
  const [popupData, setPopupData] = useState({});
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    getCodeAssessmentData(jobId, setCodeAssessmentData, setPrevData);
  }, []);

  const handleNext = () => {
    setHasSubmitted(true)
    setRefreshFlag(prev => !prev)
  };
  const handleBack = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

  useEffect(() => {
    if (hasSubmitted && validateData()) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  }, [hasSubmitted, refreshFlag]);

  useEffect(() => {
    setHasSubmitted(false)
    if (activeStep === 2) {
      setActiveStep(0)
      if (JSON.stringify(prevData) === JSON.stringify(codeAssessmentData)) {
        setPopupData({ "message": "Code Assessment has not been modified. No changes were made.", "navigateTo": ("/interviewer/job/" + codeAssessmentData.job.jobId) })
      } else {
        setShowLoader(true)
        saveCodeAssessmentData(codeAssessmentData, setPopupData, setShowLoader)
      }
    }
  }, [activeStep]);

  const validateData = () => {
    var isValid = true;
    if (activeStep === 0)
      if (codeAssessmentData.languages.length === 0 || codeAssessmentData.duration === "" ||
        codeAssessmentData.duration < 10 || codeAssessmentData.duration > 120 ||
        codeAssessmentData.passPercentage === "" || codeAssessmentData.passPercentage < 10 ||
        codeAssessmentData.passPercentage > 100) return false;

    if (activeStep === 1) {
      if (codeAssessmentData.codeProblems.length === 0) return false;
      codeAssessmentData.codeProblems.map(codeProblemData => {
        if (codeProblemData.problemStmt === "" || codeProblemData.testCases.length === 0) isValid = false;
        codeProblemData.testCases.map(testCaseData => {
          if (testCaseData.input === "" && testCaseData.output === "") isValid = false;
        })
      })
    }
    return isValid;
  }

  return (
    <Container sx={{ minHeight: '100vh', px: { md: '7vh', xs: '1vh' }, paddingTop: { xs: '5vh', md: '9vh' }, display: 'flex', flexDirection: 'column' }}>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={showLoader}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Typography variant="h6" className="content-center" sx={{ paddingBottom: '5vh', fontWeight: 'bold' }}>Coding Assessment</Typography>
      <Box sx={{ paddingBottom: '7vh' }} >
        <Stepper activeStep={activeStep}>
          {steps.map((label) =>
            <Step key={label} >
              <StepLabel>{label}</StepLabel>
            </Step>
          )}
        </Stepper>
      </Box>
      <Box sx={{ paddingBottom: { md: '7vh', xs: '5vh' } }} >
        {activeStep === 0 && <CodeFormFirstPage data={codeAssessmentData} setData={setCodeAssessmentData} hasSubmitted={hasSubmitted} />}
        {activeStep === 1 && <CodeFormSecondPage data={codeAssessmentData} setData={setCodeAssessmentData} hasSubmitted={hasSubmitted} setHasSubmitted={setHasSubmitted} />}
        {Object.keys(popupData).length > 0 && <Popup data={popupData} />}
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
        <Button
          color="inherit"
          variant="contained"
          disabled={activeStep === 0}
          onClick={handleBack} >
          Back
        </Button>
        <Button variant="contained" onClick={handleNext}>
          {activeStep === 1 ? (codeAssessmentData.codeAssessmentId ? 'Update' : 'Create') : 'Next'}
        </Button>
      </Box>
    </Container>
  );
}
