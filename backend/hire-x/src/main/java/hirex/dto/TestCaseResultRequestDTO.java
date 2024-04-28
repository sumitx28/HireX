// @author Vivek Sonani

package hirex.dto;

import lombok.Data;

@Data
public class TestCaseResultRequestDTO {
    private String testCaseId;
    private String testCaseOutput;
    private Boolean isTestCasePassed;
}
