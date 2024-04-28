// @author Vivek Sonani

import { GET_CODE_ASSESSMENT_RESULT, QUIT_CODE_ASSESSMENT, POST_CODE_ASSESSMENT_RESULT } from '../utils/ApiConstants';
import hirexAxios from '../utils/hirexAxiosIntercepter';

export const getCodeAssessmentResult = (codeAssessmentId, candidateJobId, setCodeAssessmentResult) => {
    hirexAxios.get(GET_CODE_ASSESSMENT_RESULT + `${codeAssessmentId}/${candidateJobId}`
    )
        .then(data => {
            JSON.stringify(data)
            setCodeAssessmentResult(data.data.codeAssessmentResult);
        })
        .catch(error => {
            setCodeAssessmentResult(null);
        })
}

export const postCodeAssessmentResult = async (codeAssessmentId, candidateJobId) => {
    try {
        const response = await hirexAxios.post(POST_CODE_ASSESSMENT_RESULT ,{codeAssessmentId,candidateJobId});
        return response;
    } catch (error) {
        console.error('Error posting code assessment result:', error);
        return false;
    }
}

export const quitCodeAssessment = (codeAssessmentId, candidateJobId, endTime, setCodeAssessmentResult, setQuitSuccess) => {
    hirexAxios.put(QUIT_CODE_ASSESSMENT,
        {
            codeAssessmentId,
            candidateJobId,
            endTime
        }
    ).then(data => {
        JSON.stringify(data);
        setCodeAssessmentResult(data.data.codeAssessmentResult);
        setQuitSuccess(true);
    }).catch(error => {

    })


}