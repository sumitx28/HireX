// @author Vivek Sonani

import { GET_CODE_SUBMISSION } from '../utils/ApiConstants';
import hirexAxios from '../utils/hirexAxiosIntercepter';

export const getCodeSubmission = (codeAssessmentResultId, codeProblemId, setCodeSubmission) => {
    hirexAxios.get(GET_CODE_SUBMISSION + `${codeAssessmentResultId}/${codeProblemId}`
    )
        .then(data => {
            JSON.stringify(data)
            setCodeSubmission(data.data.codeSubmission);
        })
        .catch(error => {
            
        })
}