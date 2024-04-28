// @author Vivek Sonani

package hirex.dto;

import lombok.Data;

@Data
public class QuitCodeAssessmentRequestDTO {
    private String codeAssessmentId;
    private String candidateJobId;
    private String endTime;
}
