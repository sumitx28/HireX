// @author Vivek Sonani

package hirex.repository;

import hirex.model.TestCaseResult;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TestCaseResultRepository extends MongoRepository<TestCaseResult, String> {
    public TestCaseResult findByCodeSubmission_CodeSubmissionIdAndTestCase_TestCaseId(final String codeSubmissionId, final String testCaseId);
}
