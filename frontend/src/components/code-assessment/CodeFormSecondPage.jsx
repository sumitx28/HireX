// @author Roshni Joshi
// This component renders the 'Add coding problems' step of coding assessment form

import React from 'react';
import ProblemStatement from './ProblemStatement';
import { Button, IconButton, Container, Paper, Typography, Grid } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export default function CodeFormSecondPage({ data, setData, hasSubmitted, setHasSubmitted }) {

  const addCodeProblem = () => {
    const defaultCodeProblem = {
      "codeProblemId": "Prob" + Date.now(),
      "problemTitle": "",
      "problemStmt": "",
      "testCases": [
        {
          "testCaseId": "Test" + Date.now(),
          "input": "",
          "output": ""
        }
      ]
    }
    setData(prev => ({ ...prev, codeProblems: [...prev.codeProblems, defaultCodeProblem] }))
    setHasSubmitted(false)
  };

  const deleteCodeProblem = (codeProblemId) => {
    setData(prev => ({ ...prev, codeProblems: prev.codeProblems.filter(data => data.codeProblemId != codeProblemId) }))
  };

  return (
    <Container>
      {(hasSubmitted && data.codeProblems.length === 0) &&
        <Typography variant="h6" fontWeight="bold" >
          Please add atleast one code problem
        </Typography>}
      {
        data.codeProblems.map((codeProblemData, index) => {
          return (
            <React.Fragment key={codeProblemData.codeProblemId}>
              <Paper elevation={2} sx={{ padding: '3%', marginBottom: '3vh' }}>
                <Grid container spacing={2}>
                  <Grid item xs={9}>
                    <Typography variant="subtitle1" fontWeight="bold" >
                      Code Problem {index + 1}
                    </Typography>
                  </Grid>
                  <Grid item xs={3} sx={{ display: 'flex', justifyContent: 'end' }}>
                    <IconButton aria-label="delete" size="small" onClick={(e) => deleteCodeProblem(codeProblemData.codeProblemId)}>
                      <DeleteIcon />
                    </IconButton>
                  </Grid>
                </Grid>
                <ProblemStatement key={codeProblemData.codeProblemId} data={codeProblemData} setData={setData} hasSubmitted={hasSubmitted} setHasSubmitted={setHasSubmitted} />
              </Paper>
            </React.Fragment>
          )
        })
      }
      {
        data.codeProblems.length === 0 ?
          <Button size="small" sx={{ mt: 3, mb: 5 }} variant="outlined" onClick={addCodeProblem}>Add Code Problem</Button>
          : <Button size="small" sx={{ mt: 3, mb: 5 }} variant="outlined" onClick={addCodeProblem}>Add Another</Button>
      }
    </Container>
  )
}
