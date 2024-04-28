// @author Vivek Sonani

package hirex.response;

import hirex.model.CodeAssessmentResult;
import lombok.Data;

@Data
public class CodeAssessmentResultResponse extends APIResponse{
    private CodeAssessmentResult codeAssessmentResult;
}
