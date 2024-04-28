// @author Roshni Joshi
// This component renders the interview form

import { Backdrop, Button, CircularProgress, FormControl, Grid, InputLabel, MenuItem, Select, Typography } from '@mui/material'
import { Container } from '@mui/system'
import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DEFAULT_INTERVIEW } from '../../services/utils/Constants';
import { useLocation } from 'react-router';
import { getInterview, getInterviewerJobs, getJobCandidates, saveInterview } from '../../services/api/InterviewApis';
import Popup from '../shared/Popup';

function InterviewForm() {
  const { state: { interviewId, interviewerId } } = useLocation();
  const [allJobs, setAllJobs] = useState([])
  const [allCandidates, setAllCandidates] = useState([])
  const [prevData, setPrevData] = useState()
  const [interviewData, setInterviewData] = useState(DEFAULT_INTERVIEW)
  const [popupData, setPopupData] = useState({})
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    if (interviewId && interviewId !== null && interviewId !== "") {
      getInterview(interviewId, setAllJobs, setAllCandidates, setInterviewData, setPrevData, setShowLoader)
    } else {
      getInterviewerJobs(interviewerId, setAllJobs, setShowLoader)
      setInterviewData(prev => ({ ...prev, interviewer: { "userId": interviewerId } }))
    }
  }, []);

  const handleJobChange = (e) => {
    setShowLoader(true)
    setInterviewData(prev => ({ ...prev, job: { "jobId": e.target.value } }))
    setInterviewData(prev => ({ ...prev, candidate: { "userId": "" } }))
    getJobCandidates(e.target.value, setAllCandidates, setShowLoader)
  }

  return (
    <Container maxWidth="md" sx={{ minHeight: '100vh', px: { xs: '3vh' }, paddingTop: { xs: '5vh', md: '9vh' }, display: 'flex', flexDirection: 'column' }}>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={showLoader}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      {Object.keys(popupData).length > 0 && <Popup data={popupData} />}
      <Typography variant="h6" className="content-center" sx={{ paddingBottom: '5vh', fontWeight: 'bold' }}>Book Interview</Typography>
      <Grid container rowSpacing={3} >
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel id="job">Job</InputLabel>
            <Select
              labelId="job"
              id="job"
              value={interviewData.job.jobId}
              label="Job"
              onChange={handleJobChange}>
              {allJobs.length > 0 && allJobs.map(jobData => <MenuItem key={jobData.jobId} value={jobData.jobId}>{jobData.jobName}</MenuItem>)}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth disabled={interviewData.job.jobId === null || interviewData.job.jobId === ""}>
            <InputLabel id="candidate">Candidate</InputLabel>
            <Select
              labelId="candidate"
              id="candidate"
              value={interviewData.candidate.userId}
              label="candidate"
              onChange={(e) => setInterviewData(prev => ({ ...prev, candidate: { "userId": e.target.value } }))}>
              {allCandidates.length > 0 && allCandidates.map(candidateData => <MenuItem key={candidateData.userId} value={candidateData.userId}>{candidateData.firstname} {candidateData.lastname}</MenuItem>)}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DateTimePicker']}>
              <DateTimePicker
                label="Start Time"
                value={(interviewData.startTime !== "") ? dayjs(interviewData.startTime) : null}
                disabled={interviewData.candidate.userId === null || interviewData.candidate.userId === ""}
                minDateTime={dayjs()}
                onChange={(value) => {
                  setInterviewData(prev => ({ ...prev, startTime: value.format('YYYY-MM-DD HH:mm:ss') }))
                  setInterviewData(prev => ({ ...prev, endTime: "" }))
                }} />
            </DemoContainer>
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DateTimePicker']}>
              <DateTimePicker
                label="End Time"
                value={(interviewData.endTime !== "") ? dayjs(interviewData.endTime) : null}
                minDateTime={dayjs(interviewData.startTime)}
                disabled={interviewData.candidate.userId === null || interviewData.candidate.userId === "" ||
                  interviewData.startTime === null || interviewData.startTime === ""}
                onChange={(value) => setInterviewData(prev => ({ ...prev, endTime: value.format('YYYY-MM-DD HH:mm:ss') }))} />
            </DemoContainer>
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }} >
          <Button
            variant="contained"
            disabled={interviewData.job.jobId === null || interviewData.job.jobId === "" ||
              interviewData.candidate.userId === null || interviewData.candidate.userId === "" ||
              interviewData.startTime === null || interviewData.startTime === "" ||
              interviewData.endTime === null || interviewData.endTime === ""}
            onClick={() => {
              setShowLoader(true);
              if (JSON.stringify(prevData) === JSON.stringify(interviewData)) {
                setPopupData({ "message": "Interview has not been modified. No changes were made.", "navigateTo": "/interviewschedule" })
              } else {
                saveInterview(interviewData, setPopupData, setShowLoader)
              }
            }}>
            {interviewData.interviewId ? 'Update' : 'Book'}
          </Button>
        </Grid>
      </Grid>
    </Container>
  )
}

export default InterviewForm
