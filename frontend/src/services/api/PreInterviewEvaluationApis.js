import { CREATE_REPO, GET_CODE_ASSESSMENT_DATA_API, GET_CODE_PROBLEM_DATA_API, GET_LANGUAGES, GET_PROJECT_DATA_API, SAVE_CODE_ASSESSMENT_DATA_API, SAVE_PROJECT_DATA_API, VALIDATE_GITHUB_USER } from "../utils/ApiConstants"
import { DEFAULT_CODE_ASSESSMENT, DEFAULT_CODE_PROBLEM, DEFAULT_PROJECT_EVALUATION, SYSTEM_ERROR_MESSAGE } from "../utils/Constants"
import hirexAxios from "../utils/hirexAxiosIntercepter";

// @author Roshni Joshi
// Fetch coding assessment details for a given job id
export const getCodeAssessmentData = (jobId, setCodeAssessmentData, setPrevData) => {
  hirexAxios.get(GET_CODE_ASSESSMENT_DATA_API + `${jobId}`)
    .then(data => {
      JSON.stringify(data)
      if (data.data.job.jobId && data.data.job.jobId === jobId) {
        setCodeAssessmentData(data.data)
        setPrevData(data.data)
      } else {
        DEFAULT_CODE_ASSESSMENT.job.jobId = jobId
        setCodeAssessmentData(DEFAULT_CODE_ASSESSMENT)
        setPrevData(DEFAULT_CODE_ASSESSMENT)
      }
    })
    .catch(error => {
      DEFAULT_CODE_ASSESSMENT.job.jobId = jobId
      setCodeAssessmentData(DEFAULT_CODE_ASSESSMENT)
      setPrevData(DEFAULT_CODE_ASSESSMENT)
    })
}

// @author Roshni Joshi
// Save coding assessment details
export const saveCodeAssessmentData = (codeAssessmentData, setPopupData, setShowLoader) => {
  hirexAxios.post(SAVE_CODE_ASSESSMENT_DATA_API, codeAssessmentData)
    .then(data => {
      JSON.stringify(data)
      setShowLoader(false)
      if (data.data === "Success") {
        setPopupData({ "message": (codeAssessmentData.codeAssessmentId ? "Code Assessment Updated" : "Code Assessment Created"), "navigateTo": ("/interviewer/job/" + codeAssessmentData.job.jobId) })
      } else {
        setPopupData({ "message": (codeAssessmentData.codeAssessmentId ? "Code assessment updation failed. Please try again" : "Code assessment creation failed. Please try again"), "navigateTo": ("/interviewer/job/" + codeAssessmentData.job.jobId) })
      }
    })
    .catch(error => {
      setShowLoader(false)
      setPopupData({ "message": SYSTEM_ERROR_MESSAGE, "navigateTo": "/recruiter/home", "stateData": "" })
    })
}

// @author Roshni Joshi
// Fetch project evaluation details for a given job id
export const getProjectData = (jobId, setProjectData, setPrevData, setValidUsername) => {
  hirexAxios.get(GET_PROJECT_DATA_API + `${jobId}`, jobId)
    .then(data => {
      JSON.stringify(data)
      if (data.data.job.jobId && data.data.job.jobId === jobId) {
        setProjectData(data.data)
        setValidUsername(true)
        setPrevData(data.data)
      } else {
        DEFAULT_PROJECT_EVALUATION.job.jobId = jobId
        setProjectData(DEFAULT_PROJECT_EVALUATION)
        setPrevData(DEFAULT_PROJECT_EVALUATION)
      }
    })
    .catch(error => {
      DEFAULT_PROJECT_EVALUATION.job.jobId = jobId
      setProjectData(DEFAULT_PROJECT_EVALUATION)
      setPrevData(DEFAULT_PROJECT_EVALUATION)
    })
}

// @author Roshni Joshi
// Save project evaluation details
export const saveProjectData = (projectData, setPopupData, setShowLoader) => {
  hirexAxios.post(SAVE_PROJECT_DATA_API, projectData)
    .then(data => {
      JSON.stringify(data)
      setShowLoader(false)
      if (data.data === "Success") {
        setPopupData({ "message": (projectData.projectId ? "Project Evaluation Updated" : "Project Evaluation Created"), "navigateTo": ("/interviewer/job/" + projectData.job.jobId) })
      } else {
        setPopupData({ "message": (projectData.projectId ? "Project updation failed. Please try again" : "Project creation failed. Please try again"), "navigateTo": ("/interviewer/job/" + projectData.job.jobId) })
      }
    })
    .catch(error => {
      setShowLoader(false)
      setPopupData({ "message": SYSTEM_ERROR_MESSAGE, "navigateTo": "/recruiter/home", "stateData": "" })
    })
}

// @author Vivek Sonani
export const getCodeProblem = (codeAssessmentId, codeProblemId, setCodeProblem) => {
  hirexAxios.get(GET_CODE_PROBLEM_DATA_API + `${codeAssessmentId}/${codeProblemId}`)
    .then(data => {
      JSON.stringify(data)
      if (data.data) {
        setCodeProblem(data.data);
      }
      else {
        setCodeProblem(DEFAULT_CODE_PROBLEM);
      }
    })
    .catch(error => {
      setCodeProblem(DEFAULT_CODE_PROBLEM);
    })
}

// @author Roshni Joshi
// Validate the github username provided by interviewer or candidate
export const validateGithubUser = (username, setValidUsername, setHasSubmitted) => {
  hirexAxios.get(VALIDATE_GITHUB_USER + `${username}`, username)
    .then(data => {
      JSON.stringify(data)
      setValidUsername(data.data)
      setHasSubmitted(true)
    })
    .catch(error => {
      setValidUsername(false)
      setHasSubmitted(true)
    })
}

// @author Roshni Joshi
// Fetch the programming languages available for coding assessment
export const getLanguages = (setLanguages) => {
  hirexAxios.get(GET_LANGUAGES)
    .then(data => {
      JSON.stringify(data)
      setLanguages(data.data.map(language => language.languageName))
    })
    .catch(error => { })
}

// @author Vivek Sonani
export const createRepo = (candidateJobId, setRepoLink) => {
  hirexAxios.get(CREATE_REPO + `${candidateJobId}`)
    .then(data => {
      JSON.stringify(data)
      setRepoLink(data.data);
    })
    .catch(error => { })
}