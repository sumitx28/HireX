// @author Vivek Sonani

package hirex.response;

import hirex.model.CandidateJob;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
public class CandidateJobListResponse extends APIResponse {
    List<CandidateJob> candidates;
}
