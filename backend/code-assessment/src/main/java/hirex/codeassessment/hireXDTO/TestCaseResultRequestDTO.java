// @author Vivek Sonani

package hirex.codeassessment.hireXDTO;

import lombok.Data;

@Data
public class TestCaseResultRequestDTO {
    private String testCaseId;
    private String testCaseOutput;
    private Boolean isTestCasePassed;
}
