package hirex.service;

import hirex.model.ProjectEvaluation;
import hirex.model.ProjectEvaluationResult;
import hirex.repository.ProjectEvaluationResultRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProjectEvaluationResultServiceImpl implements ProjectEvaluationResultService{
    @Autowired
    private ProjectEvaluationResultRepository projectEvaluationResultRepository;

    // @author Vivek Sonani
    // function to create project evaluation result
    @Override
    public void createProjectEvaluationResult(ProjectEvaluationResult projectEvaluationResult) {
        projectEvaluationResultRepository.save(projectEvaluationResult);
    }

    // @author Vivek Sonani
    // function to get project evaluation result
    @Override
    public ProjectEvaluationResult getProjectEvaluationResult(String candidateJobId) {
        return projectEvaluationResultRepository.findByCandidateJob_CandidateJobId(candidateJobId);
    }
}
