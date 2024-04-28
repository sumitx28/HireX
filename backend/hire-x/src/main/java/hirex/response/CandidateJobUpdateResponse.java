package hirex.response;

import hirex.enums.ApplicationStage;
import hirex.model.CandidateJob;
import lombok.Data;
import lombok.EqualsAndHashCode;

// @author Sumit Savaliya
@EqualsAndHashCode(callSuper = true)
@Data
public class CandidateJobUpdateResponse extends APIResponse {
    private CandidateJob candidateJob;
    private boolean hired;
    private boolean approved;
}

