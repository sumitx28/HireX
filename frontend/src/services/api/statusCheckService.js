import hirexAxios from "../utils/hirexAxiosIntercepter";
import codeAssessmentAxios from "../utils/codeAssessmentAxiosIntercepter";
import { CODE_ASSESSMENT_STATUS, HIRE_X_STATUS, VIDEO_INTERVIEW_STATUS } from "../utils/ApiConstants";
import videoInterviewAxios from "../utils/videoAxiosIntercepter";

export const hire_x_status = () => {
    hirexAxios.get(HIRE_X_STATUS)
        .then((data) => {
            console.log("Hire x server is up.");
        })
        .catch((error) => {
            console.log(error);
        });
}

export const code_assessment_status = () => {
    codeAssessmentAxios.get(CODE_ASSESSMENT_STATUS)
        .then((data) => {
            console.log("Code assessment server is up.");
        })
        .catch((error) => {
            console.log(error);
        });
}

export const video_interview_status = () => {
    videoInterviewAxios.get(VIDEO_INTERVIEW_STATUS)
        .then((data) => {
            console.log("Video interview server is up.");
        })
        .catch((error) => {
            console.log(error);
        });
}