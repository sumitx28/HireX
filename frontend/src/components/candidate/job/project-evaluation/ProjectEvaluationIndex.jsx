// @author Vivek Sonani

import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getCandidateJob, updateGitHubUsername } from "../../../../services/api/candidateJobApis";
import { createRepo, getCodeAssessmentData, getProjectData, validateGithubUser } from "../../../../services/api/PreInterviewEvaluationApis";
import { Box, Button, CircularProgress, Modal, Paper, Stack, Typography } from "@mui/material";
import AdditionalRequirement from "./AdditionalRequirement";
import Description from "./Description";
import GithubRepository from "./GithubRepository";
import GithubUsernameForm from "./GithubUsernameForm";
import { getCodeAssessmentResult } from "../../../../services/api/codeAssessmentResultApis";
import { quitProjectEvaluation } from "../../../../services/api/jobApis";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

//component to render project evaluation
const ProjectEvaluationIndex = () => {
    const { state: { candidateJobId } } = useLocation();

    const [candidateJob, setCandidateJob] = useState();
    const [projectEvaluation, setProjectEvaluation] = useState();
    const [repoLink, setRepoLink] = useState();
    const [codeAssessmentData, setCodeAssessmentData] = useState();
    const [codeAssessmentResult, setCodeAssessmentResult] = useState();

    const [validationError, setValidationError] = useState();
    const [validUsername, setValidUsername] = useState();
    const [username, setUsername] = useState();

    const [submitSpinner, setSubmitSpinner] = useState(false);
    const [quitSpinner, setQuitSpinner] = useState(false);
    const [prevData, setPrevData] = useState();
    const [validUserName, setValidUserName] = useState();
    const [hasSubmitted, setHasSubmitted] = useState(false)

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    
    const navigate = useNavigate();

    useEffect(() => {
        getCandidateJob(candidateJobId, setCandidateJob);
    }, [candidateJobId]);

    useEffect(() => {
        if (candidateJob) {
            if(candidateJob.candidateJobStatus && candidateJob.candidateJobStatus.projectCompleted){
                navigate('/');
            }
            if (candidateJob.job && candidateJob.job.jobId) {
                getCodeAssessmentData(candidateJob.job.jobId, setCodeAssessmentData, setPrevData);
                getProjectData(candidateJob.job.jobId, setProjectEvaluation, setPrevData, setValidUserName);
            }
            console.log(candidateJob.candidateJobStatus)
            if (candidateJob.candidateJobStatus && validUsername === true && (!candidateJob.candidateJobStatus.gitRepoLink || candidateJob.candidateJobStatus.gitRepoLink === "")) {
                console.log('trying to create repo: ' + candidateJob.candidateJobStatus.gitRepoLink);
                createRepo(candidateJobId, setRepoLink);
                if (validUsername === true && username !== "") {
                    updateGitHubUsername(candidateJobId, username, setCandidateJob);
                    setValidationError();
                }
            }
        }
    }, [candidateJob, validUsername]);

    useEffect(() => {
        if (codeAssessmentData && codeAssessmentData.codeAssessmentId) {
            getCodeAssessmentResult(codeAssessmentData.codeAssessmentId, candidateJobId, setCodeAssessmentResult);
        }
    }, [codeAssessmentData]);

    useEffect(() => {
        if (codeAssessmentResult && codeAssessmentResult.isPassed === false) {
            navigate('/');
        }
    }, [codeAssessmentResult])

    useEffect(() => {
        if (repoLink) {
            setSubmitSpinner(false);
            setHasSubmitted(false);
            getCandidateJob(candidateJobId, setCandidateJob);
        }
    }, [repoLink, candidateJobId]);

    useEffect(() => {
        if (validUsername === true && username !== "") {
            updateGitHubUsername(candidateJobId, username, setCandidateJob);
            setValidationError();
        }
        else if (validUsername === false) {
            setSubmitSpinner(false);
            setHasSubmitted(false);
            setValidationError("Please enter a valid username.");
        }
    }, [validUsername, username]);

    const submitGitHubUsername = (data) => {
        setSubmitSpinner(true);
        setUsername(data.username)
        validateGithubUser(data.username, setValidUsername, setHasSubmitted);
    }

    const onQuitConfirmation = async () => {
        setQuitSpinner(true);

        await quitProjectEvaluation(candidateJob.candidateJobId);

        setQuitSpinner(false);

        navigate(`/status/${candidateJob.job.jobId}`);
    }

    return (
        <div>
            {codeAssessmentResult && codeAssessmentResult.isPassed === true && candidateJob && candidateJob.candidateJobStatus &&
                projectEvaluation && projectEvaluation.description && projectEvaluation.additionalRequirements &&
                (
                    <Stack spacing={2} style={{ padding: '0.5rem 0.5rem' }}>
                        <Paper>
                            {candidateJob.candidateJobStatus.gitRepoLink && candidateJob.candidateJobStatus.gitRepoLink !== "" ?
                                <GithubRepository link={candidateJob.candidateJobStatus.gitRepoLink} />
                                :
                                <GithubUsernameForm submitGitHubUsername={submitGitHubUsername} validationError={validationError} submitSpinner={submitSpinner} />
                            }
                        </Paper>
                        <Paper>
                            <Description description={projectEvaluation.description} />
                        </Paper>
                        <Paper>
                            <AdditionalRequirement additionalRequirement={projectEvaluation.additionalRequirements} />
                        </Paper>
                        <div style={{ marginTop: '3vh', display: 'flex', flexDirection: 'column', alignItems: 'end' }}>
                            <Button onClick={handleOpen} variant="contained" color="error" style={{ width: '2vh' }}>
                                Quit
                            </Button>
                        </div>
                        <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={style}>
                                <Typography id="modal-modal-title" variant="h6" component="h2" style={{ fontWeight: 'bold' }}>
                                    Confirmation
                                </Typography>
                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                    Are you sure you want to quit?
                                </Typography>
                                <Typography sx={{ mt: 4 }}></Typography>
                                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    <Button variant='outlined' color='error' style={{ marginRight: '8px' }} onClick={handleClose}>
                                        Cancel
                                    </Button>
                                    {!quitSpinner ?
                                        <Button variant='contained' onClick={onQuitConfirmation}>
                                            Confirm
                                        </Button>
                                        :
                                        <CircularProgress />
                                    }
                                </div>
                            </Box>
                        </Modal>
                    </Stack>
                )
            }
        </div>
    )
}

export default ProjectEvaluationIndex;