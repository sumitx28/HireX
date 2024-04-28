package hirex.service;

import hirex.dto.TestCaseResultRequestDTO;
import hirex.model.CodeSubmission;
import hirex.model.TestCase;
import hirex.model.TestCaseResult;

public interface TestCaseResultService {
    public TestCaseResult getByCodeSubmissionIdAndTestCaseId(final String codeSubmissionId, final String testCaseId);
    public void createTestCaseResult(final TestCaseResultRequestDTO testCaseResultRequestDTO, final CodeSubmission codeSubmission, final TestCase testCase);
    public void updateTestCaseResult(final TestCaseResult testCaseResult, final TestCaseResultRequestDTO testCaseResultRequestDTO, final CodeSubmission codeSubmission, final TestCase testCase);
}
