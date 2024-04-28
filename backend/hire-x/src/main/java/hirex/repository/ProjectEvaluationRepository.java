// @author Roshni Joshi

package hirex.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import hirex.model.ProjectEvaluation;

@Repository
public interface ProjectEvaluationRepository extends MongoRepository<ProjectEvaluation, String> {

	ProjectEvaluation findByJob_JobId(final String jobId);
}
