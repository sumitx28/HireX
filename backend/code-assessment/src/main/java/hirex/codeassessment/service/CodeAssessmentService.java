// @author Vivek Sonani

package hirex.codeassessment.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import hirex.codeassessment.codeAssessmentDTO.CodeExecutorRequestDTO;
import hirex.codeassessment.hireXDTO.CodeSubmissionRequestDTO;
import hirex.codeassessment.hireXDTO.UpdateCodeAssessmentScoreRequestDTO;
import hirex.codeassessment.hireXResponse.TestCase;

import java.util.List;

public interface CodeAssessmentService {
    List<TestCase> getTestCases(final String codeAssessmentId, final String codeProblemId, final String jwtToken) throws JsonProcessingException;

    int executeCode(final CodeExecutorRequestDTO codeExecutorRequestDTO, List<TestCase> testCaseList) throws Exception;

    void submitCode(final CodeSubmissionRequestDTO codeSubmissionRequestDTO, final String jwtToken);

    void updateScore(final UpdateCodeAssessmentScoreRequestDTO updateCodeAssessmentScoreRequestDTO, final String jwtToken);
}
