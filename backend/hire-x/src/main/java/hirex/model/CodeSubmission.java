// @author Vivek Sonani

package hirex.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
@Data
public class CodeSubmission {
    @Id
    private String codeSubmissionId;

    @DBRef
    private CodeAssessmentResult codeAssessmentResult;

    @DBRef
    private CodeProblem codeProblem;

    private String code;

    private int passedTestCases;
}
