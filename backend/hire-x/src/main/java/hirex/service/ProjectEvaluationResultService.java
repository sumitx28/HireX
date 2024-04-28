package hirex.service;

import hirex.model.ProjectEvaluation;
import hirex.model.ProjectEvaluationResult;

public interface ProjectEvaluationResultService {
    void createProjectEvaluationResult(final ProjectEvaluationResult projectEvaluationResult);

    ProjectEvaluationResult getProjectEvaluationResult(final String candidateJobId);
}
