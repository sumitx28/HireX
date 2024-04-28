// @author Vivek Sonani

package hirex.repository;

import hirex.model.CodeAssessmentResult;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CodeAssessmentResultRepository extends MongoRepository<CodeAssessmentResult, String> {
    public CodeAssessmentResult findByCodeAssessment_CodeAssessmentIdAndCandidateJob_CandidateJobId(final String codeAssessmentId, final String candidateJobId);
}
