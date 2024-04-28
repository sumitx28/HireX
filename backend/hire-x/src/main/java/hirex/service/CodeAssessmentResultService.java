package hirex.service;

import hirex.model.CandidateJob;
import hirex.model.CodeAssessment;
import hirex.model.CodeAssessmentResult;
import hirex.model.CodeSubmission;
import java.util.List;

public interface CodeAssessmentResultService {
    CodeAssessmentResult getByCodeAssessmentIdAndCandidateJobId(final String codeAssessmentId, final String candidateJobId);

    void createCodeAssessmentResult(final CandidateJob candidateJob, final CodeAssessment codeAssessment);

    void updateCodeAssessmentResult(final CodeAssessmentResult codeAssessmentResult);

    void updateCodeAssessmentResultScore(final CodeAssessmentResult codeAssessmentResult, final List<CodeSubmission> codeSubmissions);

    Boolean validateScore(final CodeAssessment codeAssessment, final CodeAssessmentResult codeAssessmentResult);
}
