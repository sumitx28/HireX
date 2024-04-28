// @author Vivek Sonani

package hirex.repository;

import hirex.model.ProjectEvaluation;
import hirex.model.ProjectEvaluationResult;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProjectEvaluationResultRepository extends MongoRepository<ProjectEvaluationResult, String> {
    ProjectEvaluationResult findByCandidateJob_CandidateJobId(final String candidateJobId);
}
