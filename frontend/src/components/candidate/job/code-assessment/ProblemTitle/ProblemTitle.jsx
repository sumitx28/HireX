// @author Vivek Sonani

import React, { useState } from 'react';
import ProblemTitleCard from './ProblemTitleCard';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Timer from '../../../../shared/Timer';
import { getCodeAssessmentData } from '../../../../../services/api/PreInterviewEvaluationApis';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { getCandidateJob } from '../../../../../services/api/candidateJobApis';
import { getCodeAssessmentResult, quitCodeAssessment } from '../../../../../services/api/codeAssessmentResultApis';
import { CircularProgress } from '@mui/material';

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

//component to render problem title
const ProblemTitle = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const navigate = useNavigate();

    const [time, setTime] = useState();

    const { state: { candidateJobId } } = useLocation();

    const [codeAssessmentData, setCodeAssessmentData] = useState();
    const [candidateJob, setCandidateJob] = useState();
    const [codeAssessmentResult, setCodeAssessmentResult] = useState();
    const [quitSuccess, setQuitSuccess] = useState(false);
    const [quitSpinner, setQuitSpinner] = useState(false);
    const [prevData, setPrevData] = useState();

    useEffect(() => {
        getCandidateJob(candidateJobId, setCandidateJob);
    }, [candidateJobId])

    useEffect(() => {
        if (candidateJob && candidateJob.job && candidateJob.job.jobId) {
            getCodeAssessmentData(candidateJob.job.jobId, setCodeAssessmentData, setPrevData);
        }
    }, [candidateJob])

    useEffect(() => {
        if (codeAssessmentData && codeAssessmentData.codeAssessmentId) {
            getCodeAssessmentResult(codeAssessmentData.codeAssessmentId, candidateJobId, setCodeAssessmentResult);
        }
    }, [codeAssessmentData])

    useEffect(() => {
        if (codeAssessmentResult) {
            if (codeAssessmentResult.endTime) {
                navigate('/');
            }
        }
        if (codeAssessmentResult && codeAssessmentData) {
            const startDateTime = new Date(codeAssessmentResult.startTime);

            const endDateTime = new Date(startDateTime);
            endDateTime.setMinutes(startDateTime.getMinutes() + codeAssessmentData.duration);

            const currentDateTime = new Date();
            if (currentDateTime > endDateTime) {
                const endTime = `${endDateTime.getFullYear()}-${padWithZero(endDateTime.getMonth())}-${padWithZero(endDateTime.getDate())} ${padWithZero(endDateTime.getHours())}:${padWithZero(endDateTime.getMinutes())}:${padWithZero(endDateTime.getSeconds())}`;
                quitCodeAssessment(codeAssessmentData.codeAssessmentId, candidateJobId, endTime, setCodeAssessmentResult, setQuitSuccess);
            }
            else {
                setTime(endDateTime);
            }
        }
    }, [codeAssessmentResult, codeAssessmentData])

    function padWithZero(number) {
        return number < 10 ? '0' + number : number;
    }

    const formatScore = (score) => {
        return score.toFixed(2);
    }

    useEffect(() => {
        setQuitSpinner(false);
        if (quitSuccess) {
            navigate(`/status/${candidateJob.job.jobId}`);
        }
    }, [quitSuccess])

    const onQuitConfirmation = () => {
        setQuitSpinner(true);
        const now = new Date();
        const endTime = `${now.getFullYear()}-${padWithZero(now.getMonth())}-${padWithZero(now.getDate())} ${padWithZero(now.getHours())}:${padWithZero(now.getMinutes())}:${padWithZero(now.getSeconds())}`;

        quitCodeAssessment(codeAssessmentData.codeAssessmentId, candidateJobId, endTime, setCodeAssessmentResult, setQuitSuccess);
    }

    return (
        <div>
            {codeAssessmentData && codeAssessmentResult && (
                <Container maxWidth="md" style={{ marginTop: '4vh', marginBottom: '5vh' }}>
                    <Stack spacing={2}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', fontSize: '2em' }}>
                            {time && <Timer expiryTimestamp={time} variant={'h3'} />}
                        </div>
                        {codeAssessmentResult && codeAssessmentResult.score !== 0 &&
                            <Typography variant="h6" component="div" style={{ fontWeight: 'bold', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                Overall Score: {formatScore(codeAssessmentResult.score)}
                            </Typography>
                        }
                        {codeAssessmentData && candidateJob && candidateJob.job && codeAssessmentResult && codeAssessmentData.codeProblems.map((codeProblem) => (
                            <ProblemTitleCard key={codeProblem.codeProblemId} codeAssessmentId={codeAssessmentData.codeAssessmentId} jobId={candidateJob.job.jobId} codeProblem={codeProblem} codeAssessmentResultId={codeAssessmentResult.codeAssessmentResultId} candidateJobId={candidateJobId} />
                        ))}
                    </Stack>
                    <div style={{ marginTop: '3vh', display: 'flex', flexDirection: 'column', alignItems: 'end', marginRight: '20px' }}>
                        {codeAssessmentData && codeAssessmentResult && (
                            <Button onClick={handleOpen} variant="contained" color="error" style={{ width: '2vh' }}>
                                Quit
                            </Button>
                        )}
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
                </Container>
            )}
        </div>
    );
};

export default ProblemTitle;