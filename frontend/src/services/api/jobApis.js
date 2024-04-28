import {
  GET_ALL_JOBS,
  GET_ALL_JOBS_BY_INTERVIEWER,
  GET_ALL_JOBS_BY_RECRUITER,
  GET_JOB_DATA,
  HIRE_NOTIFICATION_API,
  POST_NEW_JOB_API,
  QUIT_PROJECT_EVALUATION,
  UPDATE_HIRING_STATUS,
  UPDATE_JOB_API,
  GET_ALL_JOBS_APPLIED_BY_EMAIL,
  GET_APPLICATION_STATUS
} from "../utils/ApiConstants";
import hirexAxios from "../utils/hirexAxiosIntercepter";

// @author Sumit Savaliya
export const postNewJob = async (jobDetails, sub) => {
  try {
    jobDetails.recruiterId = sub;
    const response = await hirexAxios.post(POST_NEW_JOB_API, jobDetails);
    return response.data;
  } catch (error) {
    console.error("Error posting new job:", error);
    return false;
  }
};

// @author Sumit Savaliya
export const updateJob = async (jobId, jobDetails) => {
  try {
    const response = await hirexAxios.put(
      UPDATE_JOB_API + `${jobId}`,
      jobDetails
    );
    return true;
  } catch (error) {
    console.error("Error updating job:", error);
    return false;
  }
};

// @author Sumit Savaliya
export const getAllJobs = async (setJobData) => {
  try {
    const response = await hirexAxios.get(GET_ALL_JOBS);
    setJobData(response.data);
  } catch (error) {
    console.error("Error fetching all jobs", error);
  }
};

// @author Sumit Savaliya
export const getAllJobsByRecruiter = async (setJobData, sub) => {
  try {
    const response = await hirexAxios.get(
      GET_ALL_JOBS_BY_RECRUITER + `${sub}`
    );
    setJobData(response.data);
  } catch (error) {
    console.error("Error fetching all jobs", error);
  }
};

// @author Sumit Savaliya
export const getAllJobsByInterviewer = async (setJobData, sub) => {
  try {
    const response = await hirexAxios.get(
      GET_ALL_JOBS_BY_INTERVIEWER + `${sub}`
    );
    setJobData(response.data);
  } catch (error) {
    console.error("Error fetching all jobs", error);
  }
};

// @author Sumit Savaliya
export const getAllJobsAppliedByEmail = async (setJobData, sub) => {
  try {
    const response = await hirexAxios.get(
      GET_ALL_JOBS_APPLIED_BY_EMAIL + `${sub}`
    );
    setJobData(response.data);
  } catch (error) {
    console.error("Error fetching all jobs", error);
  }
};

// @author Nisarg Chudasama
// Function to get application status for a specific job and user
export const getApplicationStatus = async (jobId, sub) => {
  try {
    const response = await hirexAxios.get(
      GET_APPLICATION_STATUS + `${sub}` + "/" + `${jobId}`
    );
    return response.data;
  } catch (error) {
    console.error("Failed to get application status.", error);
    return {};
  }
};

// @author Sumit Savaliya
export const deactivateJobHiring = async (jobId) => {
  try {
    await hirexAxios.put(UPDATE_HIRING_STATUS + `${jobId}`, {
      isActive: false,
    });
    return true;
  } catch (error) {
    console.error("Failed to update job hiring status.", error);
    return false;
  }
};

// @author Sumit Savaliya
export const activateJobHiring = async (jobId) => {
  try {
    await hirexAxios.put(UPDATE_HIRING_STATUS + `${jobId}`, {
      isActive: true,
    });
    return true;
  } catch (error) {
    console.error("Failed to update job hiring status.", error);
    return false;
  }
};

// @author Sumit Savaliya
export const getJobData = async (jobId) => {
  try {
    const response = await hirexAxios.get(GET_JOB_DATA + jobId);
    return response.data.job;
  } catch (error) {
    console.error("Internal Server Error", error);
    return {};
  }
};

export const quitProjectEvaluation = async (candidateJobId) => {
  try {
    await hirexAxios.put(QUIT_PROJECT_EVALUATION, {
      candidateJobId,
    });
  } catch (error) {
    console.error("Failed to quit the project evaluation.", error);
  }
};

// @author Sumit Savaliya
export const sendHireNotification = async (candidateEmail, job) => {
  try {
    await hirexAxios.post(HIRE_NOTIFICATION_API + candidateEmail, job);
  } catch (error) {
    console.log(error);
  }
};
