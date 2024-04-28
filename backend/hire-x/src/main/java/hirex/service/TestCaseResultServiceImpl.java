package hirex.service;

import hirex.dto.TestCaseResultRequestDTO;
import hirex.model.CodeSubmission;
import hirex.model.TestCase;
import hirex.model.TestCaseResult;
import hirex.repository.TestCaseResultRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class TestCaseResultServiceImpl implements TestCaseResultService{
    @Autowired
    private TestCaseResultRepository testCaseResultRepository;

    // @author Vivek Sonani
    // function to get test case result
    @Override
    public TestCaseResult getByCodeSubmissionIdAndTestCaseId(final String codeSubmissionId, final String testCaseId) {
        return testCaseResultRepository.findByCodeSubmission_CodeSubmissionIdAndTestCase_TestCaseId(codeSubmissionId, testCaseId);
    }

    // @author Vivek Sonani
    // function to create test case result
    @Override
    public void createTestCaseResult(TestCaseResultRequestDTO testCaseResultRequestDTO, CodeSubmission codeSubmission, TestCase testCase) {
        TestCaseResult testCaseResult = new TestCaseResult();

        testCaseResult.setCodeSubmission(codeSubmission);
        testCaseResult.setTestCase(testCase);
        testCaseResult.setTestCaseOutput(testCaseResultRequestDTO.getTestCaseOutput());
        testCaseResult.setIsTestCasePassed(testCaseResultRequestDTO.getIsTestCasePassed());

        testCaseResultRepository.save(testCaseResult);
    }

    // @author Vivek Sonani
    // function to update test case result
    @Override
    public void updateTestCaseResult(TestCaseResult testCaseResult, TestCaseResultRequestDTO testCaseResultRequestDTO, CodeSubmission codeSubmission, TestCase testCase) {
        testCaseResult.setCodeSubmission(codeSubmission);
        testCaseResult.setTestCase(testCase);
        testCaseResult.setTestCaseOutput(testCaseResultRequestDTO.getTestCaseOutput());
        testCaseResult.setIsTestCasePassed(testCaseResultRequestDTO.getIsTestCasePassed());

        testCaseResultRepository.save(testCaseResult);
    }

}
