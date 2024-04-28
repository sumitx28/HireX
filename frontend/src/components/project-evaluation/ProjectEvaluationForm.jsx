// @author Roshni Joshi
// This component renders the project evaluation form

import { Backdrop, Button, Container, Grid, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { getProjectData, saveProjectData, validateGithubUser } from '../../services/api/PreInterviewEvaluationApis'
import { DEFAULT_PROJECT_EVALUATION } from '../../services/utils/Constants'
import Popup from '../shared/Popup'
import { useLocation } from 'react-router'

function ProjectEvaluationForm() {
  const { state: jobId } = useLocation();
  const [prevData, setPrevData] = useState()
  const [projectData, setProjectData] = useState(DEFAULT_PROJECT_EVALUATION)
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [popupData, setPopupData] = useState({})
  const [validUsername, setValidUsername] = useState()
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    getProjectData(jobId, setProjectData, setPrevData, setValidUsername);
  }, []);

  useEffect(() => {
    if (hasSubmitted && projectData.description != "" && validUsername) {
      if (JSON.stringify(prevData) === JSON.stringify(projectData)) {
        setShowLoader(false)
        setPopupData({ "message": "Project Evaluation has not been modified. No changes were made.", "navigateTo": ("/interviewer/job/" + projectData.job.jobId) })
      } else {
        saveProjectData(projectData, setPopupData, setShowLoader)
      }
      setHasSubmitted(false)
    }
    setShowLoader(false)
  }, [hasSubmitted]);

  return (
    <Container sx={{ minHeight: '100vh', px: { md: '7vh', xs: '3vh' }, paddingTop: { xs: '5vh', md: '9vh' }, display: 'flex', flexDirection: 'column' }}>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={showLoader}
      >
        <Typography variant="h6" className="content-center" sx={{ paddingBottom: '5vh', fontWeight: 'bold' }}>Validating Github Username</Typography>
      </Backdrop>
      {Object.keys(popupData).length > 0 && <Popup data={popupData} />}
      <Typography variant="h6" className="content-center" sx={{ paddingBottom: '5vh', fontWeight: 'bold' }}>Project Evaluation</Typography>
      <Grid container rowSpacing={3}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            id="description"
            label="Project Description"
            value={projectData.description}
            multiline
            size="small"
            rows={7}
            helperText={(hasSubmitted && projectData.description === "") ? "Must not be empty" : ""}
            error={hasSubmitted && projectData.description === ""}
            onChange={(e) => setProjectData(prev => ({ ...prev, description: e.target.value }))}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            id="additionalRequirements"
            label="Additional Requirements"
            value={projectData.additionalRequirements}
            multiline
            size="small"
            rows={5}
            onChange={(e) => (setProjectData(prev => ({ ...prev, additionalRequirements: e.target.value })))}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            id="interviewerGithub"
            label="Github Username"
            value={projectData.interviewerGithub}
            size="small"
            helperText={(hasSubmitted && projectData.interviewerGithub === "") ? "Must not be empty" : ((hasSubmitted && !validUsername) ? "Invalid github username" : "")}
            error={hasSubmitted && (projectData.interviewerGithub === "" || !validUsername)}
            onChange={(e) => {
              setHasSubmitted(false)
              setValidUsername(false)
              setProjectData(prev => ({ ...prev, interviewerGithub: e.target.value }))
            }}
          />
        </Grid>
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }} >
          <Button variant="contained" type="submit" onClick={() => {
            setShowLoader(true)
            validateGithubUser(projectData.interviewerGithub, setValidUsername, setHasSubmitted)
          }}>
            {projectData.projectId ? 'Update' : 'Create'}
          </Button>
        </Grid>
      </Grid>
    </Container>
  )
}

export default ProjectEvaluationForm
