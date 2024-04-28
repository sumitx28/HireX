// @author Vivek Sonani

package hirex.codeassessment.util;

import hirex.codeassessment.codeAssessmentDTO.CodeExecutorRequestDTO;
import hirex.codeassessment.hireXDTO.CodeSubmissionRequestDTO;
import hirex.codeassessment.hireXDTO.TestCaseResultRequestDTO;
import hirex.codeassessment.hireXDTO.UpdateCodeAssessmentScoreRequestDTO;
import hirex.codeassessment.hireXResponse.TestCase;

import java.util.ArrayList;
import java.util.List;

public class RequestDTOUtil {
    // @author Vivek Sonani
    public static CodeSubmissionRequestDTO getCodeSubmissionRequestDTO(CodeExecutorRequestDTO codeExecutorRequestDTO, int passedTestCases, List<TestCase> testCaseList) {
        CodeSubmissionRequestDTO codeSubmissionRequestDTO = new CodeSubmissionRequestDTO();
        codeSubmissionRequestDTO.setCodeAssessmentId(codeExecutorRequestDTO.getCodeAssessmentId());
        codeSubmissionRequestDTO.setCandidateJobId(codeExecutorRequestDTO.getCandidateJobId());
        codeSubmissionRequestDTO.setCodeProblemId(codeExecutorRequestDTO.getCodeProblemId());
        codeSubmissionRequestDTO.setCode(codeExecutorRequestDTO.getCode());
        codeSubmissionRequestDTO.setPassedTestCases(passedTestCases);

        List<TestCaseResultRequestDTO> testCaseResultRequestDTOS = getTestCaseResultRequestDTOS(testCaseList);
        codeSubmissionRequestDTO.setTestCaseResults(testCaseResultRequestDTOS);
        return codeSubmissionRequestDTO;
    }

    // @author Vivek Sonani
    private static List<TestCaseResultRequestDTO> getTestCaseResultRequestDTOS(List<TestCase> testCaseList) {
        List<TestCaseResultRequestDTO> testCaseResultRequestDTOS = new ArrayList<>();
        for(TestCase testCase: testCaseList){
            TestCaseResultRequestDTO testCaseResultRequestDTO = new TestCaseResultRequestDTO();

            testCaseResultRequestDTO.setTestCaseId(testCase.getTestCaseId());
            testCaseResultRequestDTO.setTestCaseOutput(testCase.getCodeOutput());
            testCaseResultRequestDTO.setIsTestCasePassed(testCase.getIsTestCasePassed());

            testCaseResultRequestDTOS.add(testCaseResultRequestDTO);
        }
        return testCaseResultRequestDTOS;
    }

    // @author Vivek Sonani
    public static UpdateCodeAssessmentScoreRequestDTO getUpdateCodeAssessmentScoreRequestDTO(CodeExecutorRequestDTO codeExecutorRequestDTO){
        UpdateCodeAssessmentScoreRequestDTO updateCodeAssessmentScoreRequestDTO = new UpdateCodeAssessmentScoreRequestDTO();
        updateCodeAssessmentScoreRequestDTO.setCodeAssessmentId(codeExecutorRequestDTO.getCodeAssessmentId());
        updateCodeAssessmentScoreRequestDTO.setCandidateJobId(codeExecutorRequestDTO.getCandidateJobId());
        return updateCodeAssessmentScoreRequestDTO;
    }
}
