package hirex.dto;

import lombok.Data;

// @author Sumit Savaliya
@Data
public class CandidateStatusUpdateDTO {
    private String candidateId;
    private String jobId;
    private boolean hired;
    private boolean approved;
}

