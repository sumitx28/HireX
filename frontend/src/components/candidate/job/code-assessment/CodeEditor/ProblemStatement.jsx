// @author Vivek Sonani

import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Button, Divider, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// component to render problem statement
const ProblemStatement = ({ codeProblem, jobId, candidateJobId }) => {
    const navigate = useNavigate();

    const onBackToProblemsClick = () => {
        navigate("/candidate/job/codeProblems", { state: { "candidateJobId": candidateJobId } });
    }

    return (
        <Stack style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Box style={{ height: '3rem', display: 'flex', alignItems: 'center' }}>
                <Typography variant="h5" style={{ fontWeight: 'bold', marginLeft: '1rem' }}>
                    {codeProblem.problemTitle}
                </Typography>
            </Box>
            <Divider />
            <Box style={{ flex: 1, overflowY: 'auto', marginTop: '1rem', marginLeft: '1rem', display: 'flex', flexDirection: 'column' }}>
                <Typography style={{ whiteSpace: 'pre-line' }}>
                    {codeProblem.problemStmt}
                </Typography>
                <Button variant="contained" onClick={onBackToProblemsClick} style={{ marginRight: 'auto', textDecoration: 'none', marginTop: 'auto', marginBottom: '1vh' }}>
                    Back to Problems
                </Button>
            </Box>
        </Stack>
    );
}

export default ProblemStatement;