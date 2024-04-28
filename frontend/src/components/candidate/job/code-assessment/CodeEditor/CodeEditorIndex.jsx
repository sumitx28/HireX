// @author Vivek Sonani

import React, { useEffect, useState } from 'react';
import CodeEditorBox from './CodeEditorBox';
import ProblemStatement from './ProblemStatement';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import { useLocation } from 'react-router-dom';
import { getCodeAssessmentData, getCodeProblem } from '../../../../../services/api/PreInterviewEvaluationApis';
import { getCandidateJob } from '../../../../../services/api/candidateJobApis';
import { getCodeAssessmentResult } from '../../../../../services/api/codeAssessmentResultApis';

// root component to code editor
const CodeEditorIndex = () => {
    const { state: { candidateJobId, codeAssessmentId, codeProblemId } } = useLocation();

    const [codeProblem, setCodeProblem] = useState();
    const [candidateJob, setCandidateJob] = useState();
    const [codeAssessmentData, setCodeAssessmentData] = useState();
    const [codeAssessmentResult, setCodeAssessmentResult] = useState();
    const [prevData, setPrevData] = useState();

    useEffect(() => {
        getCandidateJob(candidateJobId, setCandidateJob);
    }, [candidateJobId])

    useEffect(() => {
        getCodeProblem(codeAssessmentId, codeProblemId, setCodeProblem);
    }, [codeAssessmentId, codeProblemId])

    useEffect(() => {
        if (candidateJob && candidateJob.job) {
            getCodeAssessmentData(candidateJob.job.jobId, setCodeAssessmentData, setPrevData);
        }
    }, [candidateJob])

    useEffect(() => {
        if (codeAssessmentData && codeAssessmentData.codeAssessmentId) {
            getCodeAssessmentResult(codeAssessmentData.codeAssessmentId, candidateJobId, setCodeAssessmentResult);
        }
    }, [codeAssessmentData])

    return (
        <>
            <Stack spacing={2} direction={{ xs: 'column', md: 'row' }} style={{ padding: '0.5rem 0.5rem' }}>
                <Paper style={{ flex: 1, height: '82vh' }}>
                    {codeProblem && candidateJob && <ProblemStatement codeProblem={codeProblem} jobId={candidateJob.job.jobId} candidateJobId={candidateJobId} />}
                </Paper>
                <Paper style={{ flex: 1, overflowY: 'hidden', height: '82vh' }}>
                    {codeProblem && codeAssessmentData && codeAssessmentResult && <CodeEditorBox testcases={codeProblem.testCases} candidateJobId={candidateJobId} codeProblemId={codeProblemId} codeAssessmentData={codeAssessmentData} codeAssessmentResult={codeAssessmentResult} />}
                </Paper>
            </Stack>
        </>
    );
}

export default CodeEditorIndex;