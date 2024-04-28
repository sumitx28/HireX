package hirex.service;

import hirex.dto.CodeSubmissionRequestDTO;
import hirex.model.CodeAssessmentResult;
import hirex.model.CodeProblem;
import hirex.model.CodeSubmission;
import java.util.List;

public interface CodeSubmissionService {
    public CodeSubmission getByCodeAssessmentResultIdAndCodeProblemId(final String codeAssessmentResultId, final String codeProblemId);

    public List<CodeSubmission> getByCodeAssessmentResultId(final String codeAssessmentResultId);

    public CodeSubmission createCodeSubmission(final CodeSubmissionRequestDTO codeSubmissionRequestDTO, final CodeAssessmentResult codeAssessmentResult, final CodeProblem codeProblem);

    public void updateCodeSubmission(final CodeSubmission codeSubmission, final CodeSubmissionRequestDTO codeSubmissionRequestDTO, final CodeAssessmentResult codeAssessmentResult, final CodeProblem codeProblem);
}
