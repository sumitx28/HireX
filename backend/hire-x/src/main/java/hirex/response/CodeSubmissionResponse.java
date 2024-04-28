// @author Vivek Sonani

package hirex.response;

import hirex.model.CodeSubmission;
import lombok.Data;

@Data
public class CodeSubmissionResponse extends APIResponse{
    private CodeSubmission codeSubmission;
}
