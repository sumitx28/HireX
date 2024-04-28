// @author Vivek Sonani

import { SUBMIT_CODE, VALIDATE_CODE } from "../utils/ApiConstants";
import codeAssessmentAxios from "../utils/codeAssessmentAxiosIntercepter";

export const validateCode = (codeAssessmentId, codeProblemId, language, code, setCodeExecutionResult, setValidationRequestSuccess) => {
    codeAssessmentAxios.post(VALIDATE_CODE, {
        codeAssessmentId,
        codeProblemId,
        language,
        code
    })
        .then(data => {
            JSON.stringify(data)
            setCodeExecutionResult(data.data);
            setValidationRequestSuccess(true);
        })
        .catch(error => {
            setCodeExecutionResult(error.response.data);
            setValidationRequestSuccess(true);
            // setCodeExecutionResult(DEFAULT_CODE_EXECUTION_RESULT);
        })
}

export const submitCode = (candidateJobId, codeAssessmentId, codeProblemId, language, code, setCodeExecutionResult, setSubmissionSuccess, setSubmissionRequestSuccess) => {
    codeAssessmentAxios.post(SUBMIT_CODE, {
        candidateJobId,
        codeAssessmentId,
        codeProblemId,
        language,
        code
    })
        .then(data => {
            JSON.stringify(data)
            setCodeExecutionResult(data.data);
            setSubmissionSuccess(true);
            setSubmissionRequestSuccess(true);
        })
        .catch(error => {
            setCodeExecutionResult(error.response.data);
            setSubmissionRequestSuccess(true);
        })
}