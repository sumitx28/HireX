package hirex.service;

import hirex.dto.CodeSubmissionRequestDTO;
import hirex.model.CodeAssessmentResult;
import hirex.model.CodeProblem;
import hirex.model.CodeSubmission;
import hirex.repository.CodeSubmissionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CodeSubmissionServiceImpl implements CodeSubmissionService{
    @Autowired
    private CodeSubmissionRepository codeSubmissionRepository;

    // @author Vivek Sonani
    // function to get code submission
    @Override
    public CodeSubmission getByCodeAssessmentResultIdAndCodeProblemId(String codeAssessmentResultId, String codeProblemId){
        return codeSubmissionRepository.findByCodeAssessmentResult_CodeAssessmentResultIdAndCodeProblem_CodeProblemId(codeAssessmentResultId, codeProblemId);
    }

    // @author Vivek Sonani
    // function to get list of code submission
    @Override
    public List<CodeSubmission> getByCodeAssessmentResultId(String codeAssessmentResultId) {
        return codeSubmissionRepository.findByCodeAssessmentResult_CodeAssessmentResultId(codeAssessmentResultId);
    }

    // @author Vivek Sonani
    // function to create code submission
    @Override
    public CodeSubmission createCodeSubmission(CodeSubmissionRequestDTO codeSubmissionRequestDTO, CodeAssessmentResult codeAssessmentResult, CodeProblem codeProblem){
        CodeSubmission codeSubmission = new CodeSubmission();

        codeSubmission.setCodeAssessmentResult(codeAssessmentResult);
        codeSubmission.setCodeProblem(codeProblem);
        codeSubmission.setCode(codeSubmissionRequestDTO.getCode());
        codeSubmission.setPassedTestCases(codeSubmissionRequestDTO.getPassedTestCases());

        return codeSubmissionRepository.save(codeSubmission);
    }

    // @author Vivek Sonani
    // function to update code submission
    @Override
    public void updateCodeSubmission(CodeSubmission codeSubmission, CodeSubmissionRequestDTO codeSubmissionRequestDTO, CodeAssessmentResult codeAssessmentResult, CodeProblem codeProblem) {
        codeSubmission.setCodeAssessmentResult(codeAssessmentResult);
        codeSubmission.setCodeProblem(codeProblem);
        codeSubmission.setCode(codeSubmissionRequestDTO.getCode());
        codeSubmission.setPassedTestCases(codeSubmissionRequestDTO.getPassedTestCases());

        codeSubmissionRepository.save(codeSubmission);
    }
}
