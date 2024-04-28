// @author Roshni Joshi (roshni.joshi@dal.ca)

export const HIRE_X_API = "https://hirex-1kjg.onrender.com/";
export const HIRE_X_CODE_ASSESSMENT_API = "https://code-assessment.onrender.com/";
export const VIDEO_INTERVIEW_CALL_API = "wss://hirex-6tpa.onrender.com/";
export const VIDEO_INTERVIEW_CHAT_API = "wss://hirex-6tpa.onrender.com/chat/";
export const VIDEO_INTERVIEW_REST_API = "https://hirex-6tpa.onrender.com/";

export const HIRE_X_STATUS = "status";
export const CODE_ASSESSMENT_STATUS = "status";
export const VIDEO_INTERVIEW_STATUS = "status";

//@author Rushikumar Patel
export const LOGIN = "rest/auth/login";
export const CANDIDATE_SIGNUP = "rest/auth/register";
export const RECRUITER_SIGNUP = "rest/auth/register";
export const FORGOT_PASSWORD = "rest/auth/forgot-password";
export const RESET_PASSWORD = "rest/auth/reset-password";

export const GET_CODE_ASSESSMENT_DATA_API = "codeassessments/";
export const SAVE_CODE_ASSESSMENT_DATA_API = "codeassessments";
export const GET_CODE_PROBLEM_DATA_API = "getCodeProblem/";
export const GET_LANGUAGES = "languages";

export const GET_PROJECT_DATA_API = "projects/";
export const SAVE_PROJECT_DATA_API = "projects";
export const VALIDATE_GITHUB_USER = "validateGithubUser/";
export const CREATE_REPO = "createRepo/";

export const GET_INTERVIEW = "interviews/";
export const DELETE_INTERVIEW = "interviews/";
export const GET_INTERVIEWER_JOBS_API = "jobs/";
export const GET_JOB_CANDIDATES_API = "candidates/";
export const SAVE_INTERVIEW_API = "interviews";
export const GET_INTERVIEWS_API = "interviews/";

export const VALIDATE_CODE = "validateCode";
export const SUBMIT_CODE = "submitCode";

export const GET_CANDIDATE_JOB = "candidateJob/";
export const UPDATE_GITHUB_USERNAME = "updateGithubUsername";

export const GET_CODE_ASSESSMENT_RESULT = "getCandidateCodeAssessmentResult/";
export const QUIT_CODE_ASSESSMENT = "quitCodeAssessment";

export const GET_CODE_SUBMISSION =
  "getCodeSubmissionByCodeAssessmentResultIdAndCodeProblemId/";

// @author Raj Patel
export const POST_VALIDATE_PASSCODE_API = "validate-passcode";
export const POST_RESEND_PASSCODE_API = "resend-passcode/";
export const WS_VIDEO_CONN_API = VIDEO_INTERVIEW_CALL_API + "video-call/";
export const WS_CHAT_CONN_API = VIDEO_INTERVIEW_CHAT_API + "chat/";
export const GET_MESSAGES_API = "messages/";
export const GET_INTERVIEW_START_TIME = "interview-start-time/";
export const UPDATE_INTERVIEW_STATUS = "end-interview/";

// @author Sumit Savaliya
export const POST_NEW_JOB_API = "jobs/new-job-post";
export const GET_ALL_JOBS = "jobs";
export const GET_ALL_JOBS_BY_RECRUITER = "jobs/all-jobs/";
export const GET_ALL_JOBS_BY_INTERVIEWER = "jobs/all-jobs/interviewer/";
export const UPDATE_HIRING_STATUS = "jobs/update-hiring-status/";
export const GET_JOB_DATA = "job/";
export const UPDATE_JOB_API = "jobs/update-job/";
export const WITHDRAW_JOB_APPLICATION_API = "withdraw/";
export const UPDATE_CANDIDATE_STATUS_API = "job/update-candidate-status";
export const GET_ALL_JOBS_APPLIED_BY_EMAIL = "applied-jobs/";
export const GET_APPLICATION_STATUS = "status/";
export const APPLICANT_DETAILS_API = "applicant-details/";
export const GET_ALL_APPLICANTS = "job/all-candidates/";
export const CANDIDATE_STATUS_UPDATE = "job/update-candidate-status";
export const APPROVE_CODING_ASSESSMENT = "job/approve-coding-assessment";
export const HIRE_NOTIFICATION_API = "job/hire/";

export const SUBMIT_APPLICATION_API = "applicant-details";
export const LINK_CANDIDATE_JOB_TO_APPLICATION_API =
  "applicant-details/link-job/";

export const POST_CODE_ASSESSMENT_RESULT = "addCodeAssessmentResult";
export const QUIT_PROJECT_EVALUATION = "quitProjectEvaluation";

export const GET_PROJECT_EVALUATION_RESULT = "getProjectEvaluationResult/";
export const CREATE_PROJECT_EVALUATION_RESULT = "createProjectEvaluationResult";
