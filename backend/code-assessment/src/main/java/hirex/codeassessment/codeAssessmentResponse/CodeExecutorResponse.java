// @author Vivek Sonani

package hirex.codeassessment.codeAssessmentResponse;

import hirex.codeassessment.hireXResponse.TestCase;
import lombok.Data;

import java.util.List;

@Data
public class CodeExecutorResponse extends APIResponse {
    private String compilationError;
    private String runTimeError;
    private Boolean allTestPassed;
    private List<TestCase> testCaseList;
    private String message;
}
