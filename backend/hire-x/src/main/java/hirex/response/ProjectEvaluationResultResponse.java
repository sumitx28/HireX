// @author Vivek Sonani

package hirex.response;

import hirex.model.ProjectEvaluationResult;
import lombok.Data;

@Data
public class ProjectEvaluationResultResponse extends APIResponse {
    private ProjectEvaluationResult projectEvaluationResult;
}
