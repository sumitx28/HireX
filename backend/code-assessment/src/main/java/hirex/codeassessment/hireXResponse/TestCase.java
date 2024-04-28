// @author Vivek Sonani

package hirex.codeassessment.hireXResponse;

import lombok.Data;

@Data
public class TestCase {

    private String testCaseId;
    private String input;
    private String output;
    private String codeOutput;
    private Boolean isTestCasePassed;

    public TestCase(String testCaseId, String input, String output){
        this.testCaseId = testCaseId;
        this.input = input;
        this.output = output;
    }

    public boolean validateTestCase(String givenOutput){
        boolean result = this.output.equals(givenOutput);
        this.setIsTestCasePassed(result);
        return result;
    }
}
