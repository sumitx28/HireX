// @author Vivek Sonani

package hirex.repository;

import hirex.model.CodeSubmission;
import java.util.List;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CodeSubmissionRepository extends MongoRepository<CodeSubmission, String> {
    CodeSubmission findByCodeAssessmentResult_CodeAssessmentResultIdAndCodeProblem_CodeProblemId(final String codeAssessmentResultId, final String codeProblemId);

    List<CodeSubmission> findByCodeAssessmentResult_CodeAssessmentResultId(final String codeAssessmentResultId);
}
