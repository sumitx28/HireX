// @author Roshni Joshi

import { DELETE_INTERVIEW, GET_INTERVIEW, GET_INTERVIEWER_JOBS_API, GET_INTERVIEWS_API, GET_JOB_CANDIDATES_API, SAVE_INTERVIEW_API } from "../utils/ApiConstants"
import { DEFAULT_INTERVIEW, SYSTEM_ERROR_MESSAGE } from "../utils/Constants"
import hirexAxios from "../utils/hirexAxiosIntercepter";

// Fetch interview details for a given interview id
export const getInterview = (interviewId, setAllJobs, setAllCandidates, setInterviewData, setPrevData, setShowLoader) => {
  hirexAxios.get(GET_INTERVIEW + `${interviewId}`, interviewId)
    .then(data => {
      JSON.stringify(data)
      if (data.data.interviewId && data.data.interviewId === interviewId) {
        getInterviewerJobs(data.data.interviewer.userId, setAllJobs)
        getJobCandidates(data.data.job.jobId, setAllCandidates)
        setInterviewData(data.data)
        setPrevData(data.data)
      } else {
        DEFAULT_INTERVIEW.interviewId = interviewId
        setInterviewData(DEFAULT_INTERVIEW)
        setPrevData(DEFAULT_INTERVIEW)
      }
      setShowLoader(false)
    })
    .catch(error => {
      DEFAULT_INTERVIEW.interviewId = interviewId
      setInterviewData(DEFAULT_INTERVIEW)
      setPrevData(DEFAULT_INTERVIEW)
      setShowLoader(false)
    })
}

// Delete interview
export const deleteInterview = (interviewId) => {
  hirexAxios.delete(DELETE_INTERVIEW + `${interviewId}`, interviewId)
}

// Fetch all the jobs of a given interviewer 
export const getInterviewerJobs = (interviewerId, setAllJobs, setShowLoader) => {
  hirexAxios.get(GET_INTERVIEWER_JOBS_API + `${interviewerId}`, interviewerId)
    .then(data => {
      setAllJobs(data.data)
      setShowLoader(false)
    })
    .catch(error => { })
}

// Fetch all the candidates for a given job
export const getJobCandidates = (jobId, setAllCandidates, setShowLoader) => {
  hirexAxios.get(GET_JOB_CANDIDATES_API + `${jobId}`, jobId)
    .then(data => {
      setAllCandidates(data.data)
      setShowLoader(false)
    })
    .catch(error => { })
}

// Save interview details
export const saveInterview = (interviewData, setPopupData, setShowLoader) => {
  hirexAxios.post(SAVE_INTERVIEW_API, interviewData)
    .then(data => {
      JSON.stringify(data)
      setShowLoader(false)
      if (data.data === "Success") {
        setPopupData({ "message": (interviewData.interviewId ? "Interview Updated" : "Interview Booked Successfully"), "navigateTo": "/interviewschedule" })
      } else {
        setPopupData({ "message": (interviewData.interviewId ? "interview updation failed. Please try again" : "interview booking failed. Please try again"), "navigateTo": "/interviewschedule" })
      }
    })
    .catch(error => {
      setShowLoader(false)
      setPopupData({ "message": SYSTEM_ERROR_MESSAGE, "navigateTo": "/interviewschedule" })
    })
}

// Fetch all scheduled interviews of a particular candidate or an interviewer
export const getInterviews = (userType, userId, setInterviewData, setShowLoader) => {
  hirexAxios.get(GET_INTERVIEWS_API + `${userType}/${userId}`, userType, userId)
    .then(data => {
      setInterviewData(data.data.map(interview => ({
        ...interview,
        job: interview.job.jobName,
        candidate: (interview.candidate.firstname + " " + interview.candidate.lastname)
      })))
      setShowLoader(false)
    })
    .catch(error => { setShowLoader(false) })
}  
