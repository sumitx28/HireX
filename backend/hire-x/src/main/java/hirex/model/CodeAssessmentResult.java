// @author Vivek Sonani

package hirex.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
@Data
public class CodeAssessmentResult {
    @Id
    private String codeAssessmentResultId;

    @DBRef
    private CandidateJob candidateJob;

    @DBRef
    private CodeAssessment codeAssessment;

    private String startTime;

    private String endTime;

    private double score;

    private Boolean isPassed;
}
