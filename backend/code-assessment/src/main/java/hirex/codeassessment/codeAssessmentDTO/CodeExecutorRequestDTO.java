// @author Vivek Sonani

package hirex.codeassessment.codeAssessmentDTO;

import lombok.Data;

@Data
public class CodeExecutorRequestDTO {
    private String codeAssessmentId;
    private String candidateJobId;
    private String codeProblemId;
    private String language;
    private String code;
}
