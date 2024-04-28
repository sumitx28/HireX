// @author Vivek Sonani

package hirex.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
@Data
public class TestCaseResult {
    @Id
    private String testCaseResultId;

    @DBRef
    private CodeSubmission codeSubmission;

    @DBRef
    private TestCase testCase;

    private String testCaseOutput;

    private Boolean isTestCasePassed;
}
