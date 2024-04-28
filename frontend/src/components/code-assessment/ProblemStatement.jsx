// @author Roshni Joshi
// This component renders the code problems for coding assessment form

import { Avatar, Box, Grid, IconButton, TextField, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import React from 'react';

export default function ProblemStatement({ data, setData, hasSubmitted, setHasSubmitted }) {

  const setProbTitle = (problemTitle) => {
    setData(prev => ({
      ...prev,
      codeProblems: prev.codeProblems.map(codeProblemData =>
        codeProblemData.codeProblemId === data.codeProblemId
          ? { ...codeProblemData, problemTitle: problemTitle }
          : codeProblemData
      )
    }))
  }

  const setProbStmt = (problemStmt) => {
    setData(prev => ({
      ...prev,
      codeProblems: prev.codeProblems.map(codeProblemData =>
        codeProblemData.codeProblemId === data.codeProblemId
          ? { ...codeProblemData, problemStmt: problemStmt }
          : codeProblemData
      )
    }))
  }

  const addTestCase = () => {
    const defaultTestCase = {
      "testCaseId": "Test" + Date.now(),
      "input": "",
      "output": ""
    }
    setData(prev => ({
      ...prev,
      codeProblems: prev.codeProblems.map(codeProblemData => {
        return codeProblemData.codeProblemId === data.codeProblemId
          ? {
            ...codeProblemData,
            testCases: [...codeProblemData.testCases, defaultTestCase]
          }
          : codeProblemData;
      })
    }))
    setHasSubmitted(false)
  };

  const deleteTestCase = (testCaseId) => {
    setData(prev => ({
      ...prev,
      codeProblems: prev.codeProblems.map(codeProblemData => {
        return codeProblemData.codeProblemId === data.codeProblemId
          ? {
            ...codeProblemData,
            testCases: codeProblemData.testCases.filter(testCaseData => testCaseData.testCaseId != testCaseId)
          }
          : codeProblemData;
      })
    }))
    setHasSubmitted(false)
  };

  const onInputChange = (testCaseId, testInput) => {
    setData(prev => ({
      ...prev,
      codeProblems: prev.codeProblems.map(codeProblemData => {
        return codeProblemData.codeProblemId === data.codeProblemId
          ? {
            ...codeProblemData,
            testCases: codeProblemData.testCases.map(testCaseData =>
              testCaseData.testCaseId === testCaseId
                ? { ...testCaseData, input: testInput }
                : testCaseData
            )
          }
          : codeProblemData;
      })
    }))
  };

  const onOutputChange = (testCaseId, expectedOutput) => {
    setData(prev => ({
      ...prev,
      codeProblems: prev.codeProblems.map(codeProblemData => {
        return codeProblemData.codeProblemId === data.codeProblemId
          ? {
            ...codeProblemData,
            testCases: codeProblemData.testCases.map(testCaseData =>
              testCaseData.testCaseId === testCaseId
                ? { ...testCaseData, output: expectedOutput }
                : testCaseData
            )
          }
          : codeProblemData;
      })
    }))
  };

  return (
    <Box sx={{ flexGrow: 1, padding: 2 }}>
      <Grid container spacing={2} sx={{ width: { md: '80%' } }} >
        <Grid item xs={12}>
          <TextField
            fullWidth
            id="problemTitle"
            label="Problem Title"
            value={data.problemTitle}
            onChange={(e) => setProbTitle(e.target.value)}
            multiline
            size="small"
            helperText={(hasSubmitted && data.problemTitle === "") ? "Must not be empty" : ""}
            error={hasSubmitted && data.problemTitle === ""}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            id="probstmt"
            label="Problem Statement"
            value={data.problemStmt}
            onChange={(e) => setProbStmt(e.target.value)}
            multiline
            size="small"
            rows={4}
            helperText={(hasSubmitted && data.problemStmt === "") ? "Must not be empty" : ""}
            error={hasSubmitted && data.problemStmt === ""}
          />
        </Grid>

        <Grid item md={1} sx={{ display: { xs: 'none', md: 'block' } }}></Grid>
        <Grid item md={8} xs={9}>
          <Typography variant="body1" fontWeight="bold" sx={{ mt: 1, mb: 1 }}>
            Test Cases
          </Typography>
        </Grid>
        <Grid item md={2} xs={3} sx={{ display: 'flex', justifyContent: 'end' }}>
          <IconButton size="small" onClick={addTestCase}>
            <Avatar sx={{ background: 'transparent', color: '#5A5A5A', border: '2px solid', height: 'auto', width: 'auto' }}>
              <AddIcon style={{ color: '#5A5A5A' }} />
            </Avatar>
          </IconButton>
        </Grid>
        <Grid item md={1} sx={{ display: { xs: 'none', md: 'block' } }}></Grid>

        {(hasSubmitted && data.testCases.length === 0) &&
          <React.Fragment>
            <Grid item md={1} sx={{ display: { xs: 'none', md: 'block' } }}></Grid>
            <Grid item md={10} xs={12}>
              <Typography color={'error'} variant="body3">Please add atleast one test case</Typography>
            </Grid>
            <Grid item md={1} sx={{ display: { xs: 'none', md: 'block' } }}>
            </Grid>
          </React.Fragment>}

        {data.testCases.map((testCaseData) => {
          return (
            <React.Fragment key={testCaseData.testCaseId}>
              <Grid item md={1} sx={{ display: { xs: 'none', md: 'block' } }}></Grid>
              <Grid item md={4} xs={8}>
                <TextField
                  fullWidth
                  id="testInput"
                  label="Test Input"
                  variant="standard"
                  value={testCaseData.input}
                  size="small"
                  error={hasSubmitted && testCaseData.input === "" && testCaseData.output === ""}
                  onChange={(e) => onInputChange(testCaseData.testCaseId, e.target.value)} />
              </Grid>
              <Grid item md={4} xs={8} >
                <TextField
                  fullWidth
                  id="expectedOutput"
                  label="Expected Output"
                  variant="standard"
                  value={testCaseData.output}
                  size="small"
                  error={hasSubmitted && testCaseData.input === "" && testCaseData.output === ""}
                  onChange={(e) => onOutputChange(testCaseData.testCaseId, e.target.value)} />
              </Grid>
              <Grid item md={2} xs={4} sx={{ display: 'flex', justifyContent: 'end' }}>
                <IconButton size="small" onClick={(e) => deleteTestCase(testCaseData.testCaseId)}>
                  <DeleteIcon />
                </IconButton>
              </Grid>
              <Grid item md={1} sx={{ display: { xs: 'none', md: 'block' } }}></Grid>

              <Grid item md={2} sx={{ display: { xs: 'none', md: 'block' } }}></Grid>
              <Grid item md={8} xs={12} sx={{ display: { xs: 'flex' }, justifyContent: { xs: 'center', md: 'flex-start' } }}>
                {(hasSubmitted && testCaseData.input === "" && testCaseData.output === "") &&
                  <Typography color={'error'} variant="body3">Test input or output must have a value</Typography>}
              </Grid>
              <Grid item md={2} sx={{ display: { xs: 'none', md: 'block' } }}></Grid>
            </React.Fragment>
          )
        })}
      </Grid>
    </Box>
  )
}
