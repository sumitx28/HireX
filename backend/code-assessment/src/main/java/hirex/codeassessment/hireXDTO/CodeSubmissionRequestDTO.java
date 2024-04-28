// @author Vivek Sonani

package hirex.codeassessment.hireXDTO;

import lombok.Data;

import java.util.List;

@Data
public class CodeSubmissionRequestDTO {
    private String codeAssessmentId;
    private String candidateJobId;
    private String codeProblemId;
    private String code;
    private int passedTestCases;
    private List<TestCaseResultRequestDTO> testCaseResults;
}
