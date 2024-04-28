// @author Roshni Joshi

package hirex.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import hirex.model.CodeAssessment;

@Repository
public interface CodeAssessmentRepository extends MongoRepository<CodeAssessment, String> {

	CodeAssessment findByJob_JobId(final String jobId);
}
