// @author Vivek Sonani

package hirex.dto;

import lombok.Data;

@Data
public class UpdateCodeAssessmentScoreRequestDTO {
    private String codeAssessmentId;
    private String candidateJobId;
}
