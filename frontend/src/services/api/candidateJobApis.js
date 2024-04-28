import { APPROVE_CODING_ASSESSMENT, CANDIDATE_STATUS_UPDATE, GET_ALL_APPLICANTS, GET_CANDIDATE_JOB, UPDATE_GITHUB_USERNAME, UPDATE_HIRING_STATUS, SUBMIT_APPLICATION_API, LINK_CANDIDATE_JOB_TO_APPLICATION_API, WITHDRAW_JOB_APPLICATION_API, APPLICANT_DETAILS_API } from '../utils/ApiConstants';
import hirexAxios from '../utils/hirexAxiosIntercepter';

export const getCandidateJob = (candidateJobId, setCandidateJob) => {
  hirexAxios.get(GET_CANDIDATE_JOB + candidateJobId)
    .then(data => {
      JSON.stringify(data)
      setCandidateJob(data.data.candidateJob);
    })
    .catch(error => {

    })
}

export const updateGitHubUsername = (candidateJobId, username, setCandidateJob) => {
  hirexAxios.put(UPDATE_GITHUB_USERNAME, {
    candidateJobId,
    username
  }).then(data => {
    JSON.stringify(data)
    setCandidateJob(data.data.candidateJob);
  })
    .catch(error => {

    })
}

// @author Nisarg Chudasama
// Function to submit a job application
export const submitApplication = async (applicantDetails, jobId, userId) => {
  try {
    applicantDetails.candidateId = userId;
    applicantDetails.jobId = jobId;
    const response = await hirexAxios.post(SUBMIT_APPLICATION_API, applicantDetails);
    console.log('Application submitted successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error submitting application:', error);
    throw error;
  }
};

// @author Nisarg Chudasama
// Function to link a candidate job to an application
export const linkCandidateJobToApplication = async (applicantDetailsId, candidateJobId) => {
  try {
    const url = LINK_CANDIDATE_JOB_TO_APPLICATION_API + applicantDetailsId + '/' + candidateJobId;
    const response = await hirexAxios.put(url, {});
    console.log('Candidate job linked to application successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error linking candidate job to application:', error);
    throw error;
  }
};

// @author Nisarg Chudasama
// Function to withdraw a job application
export const withdrawJobApplication = async (candidateJobId) => {
  try {
    const url = WITHDRAW_JOB_APPLICATION_API + candidateJobId;
    const response = await hirexAxios.put(url, {});
    console.log('Job application withdrawn successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error withdrawing job application:', error);
    throw error;
  }
};

// @author Sumit Savaliya
export const getAllApplicants = async (jobId) => {
  const response = hirexAxios.get(GET_ALL_APPLICANTS + jobId);
  const data = await response;
  return data.data.candidates;
}

// @author Sumit Savaliya
export const updateCandidateStatus = (payload, refresh, setRefresh) => {
  hirexAxios.put(CANDIDATE_STATUS_UPDATE, payload)
    .then(response => {
      setRefresh(!refresh);
    })
    .catch(error => {
      console.log(error);
    })
}

// @author Sumit Savaliya
export const approveCodingAssessment = (payload, refresh, setRefresh) => {
  hirexAxios.put(APPROVE_CODING_ASSESSMENT, payload)
    .then(response => {
      setRefresh(!refresh);
    })
    .catch(error => {
      console.log(error);
    })
}

// @author Sumit Savaliya
export const getApplicantDetails = (candidateJobId, setApplicantDetails) => {
  hirexAxios.get(APPLICANT_DETAILS_API + candidateJobId)
    .then(response => {
      setApplicantDetails(response.data);
    })
    .catch(error => {
      console.log(error);
    })
}

