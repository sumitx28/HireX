// @author Vivek Sonani

import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { getCodeSubmission } from '../../../../../services/api/codeSubmissionApis';

// component to render problem title card
const ProblemTitleCard = ({ codeAssessmentId, jobId, codeProblem, codeAssessmentResultId, candidateJobId }) => {
    const [codeSubmission, setCodeSubmission] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        getCodeSubmission(codeAssessmentResultId, codeProblem.codeProblemId, setCodeSubmission);
    }, [codeAssessmentResultId, codeProblem.codeProblemId])

    const onViewClick = () => {
        navigate(`/candidate/job/codeAssessment/codeProblem`, { state: { "candidateJobId": candidateJobId, "codeAssessmentId": codeAssessmentId, "codeProblemId": codeProblem.codeProblemId } })
    }

    return (
        <Card variant="outlined" className='problem-title-card'>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <CardContent style={{ marginLeft: '10px' }}>
                    <Typography variant="h5" component="div" style={{ fontWeight: 'bold' }}>
                        {codeProblem.problemTitle}
                    </Typography>
                    {codeProblem.score !== null ?
                        codeSubmission && <Typography color="text.secondary">Score - {codeSubmission.passedTestCases}/{codeProblem.testCases.length}</Typography>
                        :
                        <Typography style={{ color: '#ef5350' }}>Pending Submission</Typography>
                    }
                </CardContent>
                <CardActions>
                    <Button variant="contained" onClick={onViewClick} style={{ marginRight: '10px', width: '2vh' }}>
                        View
                    </Button>
                </CardActions>
            </div>
        </Card>
    );
}

export default ProblemTitleCard;