// @author Vivek Sonani

package hirex.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;

@Data
public class ProjectEvaluationResult {
    @Id
    private String projectEvaluationResultId;

    @DBRef
    private CandidateJob candidateJob;

    @DBRef
    private ProjectEvaluation projectEvaluation;

    private Boolean isPassed;
}
