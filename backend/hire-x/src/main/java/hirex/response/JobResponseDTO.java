package hirex.response;

import hirex.model.Job;
import lombok.Data;
import lombok.EqualsAndHashCode;

// @author Sumit Savaliya
@EqualsAndHashCode(callSuper = true)
@Data
public class JobResponseDTO extends APIResponse {
    private Job job;
}