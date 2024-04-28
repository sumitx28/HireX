// @author Vivek Sonani

import { CREATE_PROJECT_EVALUATION_RESULT, GET_PROJECT_EVALUATION_RESULT } from "../utils/ApiConstants";
import hirexAxios from "../utils/hirexAxiosIntercepter";

export const getProjectEvaluationResult = async (candidateJobId) => {
    try {
        const response = await hirexAxios.get(
            GET_PROJECT_EVALUATION_RESULT + `${candidateJobId}`
        );
        return response.data;
    } catch (error) {
        return null;
    }
}

export const createProjectEvaluationResult = async (candidateJobId) => {
    try {
        const response = await hirexAxios.post(
            CREATE_PROJECT_EVALUATION_RESULT,
            {
                candidateJobId
            }
        );
        return response.data;
    } catch (error) {
        return null;
    }
}