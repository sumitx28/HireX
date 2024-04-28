package hirex.service;

import hirex.dto.AddCodeAssessmentResultRequestDTO;
import hirex.model.*;
import hirex.repository.CodeAssessmentResultRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.TimeZone;

@Service
public class CodeAssessmentResultServiceImpl implements CodeAssessmentResultService {
    @Autowired
    private CodeAssessmentResultRepository codeAssessmentResultRepository;

    // @author Vivek Sonani
    // function to get code assessment result
    @Override
    public CodeAssessmentResult getByCodeAssessmentIdAndCandidateJobId(String codeAssessmentId, String candidateJobId) {
        return codeAssessmentResultRepository.findByCodeAssessment_CodeAssessmentIdAndCandidateJob_CandidateJobId(codeAssessmentId, candidateJobId);
    }

    // @author Vivek Sonani
    // function to create code assessment result
    @Override
    public void createCodeAssessmentResult(final CandidateJob candidateJob, final CodeAssessment codeAssessment) {
        CodeAssessmentResult codeAssessmentResult = new CodeAssessmentResult();
        codeAssessmentResult.setCandidateJob(candidateJob);
        codeAssessmentResult.setCodeAssessment(codeAssessment);
        codeAssessmentResult.setScore(0);

        TimeZone atlanticTimeZone = TimeZone.getTimeZone("America/Halifax");
        Date currentTime = new Date();
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        dateFormat.setTimeZone(atlanticTimeZone);
        String formattedTime = dateFormat.format(currentTime);
        codeAssessmentResult.setStartTime(formattedTime);

        codeAssessmentResultRepository.save(codeAssessmentResult);
    }

    // @author Vivek Sonani
    // function to update code assessment result
    @Override
    public void updateCodeAssessmentResult(final CodeAssessmentResult codeAssessmentResult) {
        codeAssessmentResultRepository.save(codeAssessmentResult);
    }

    // @author Vivek Sonani
    // function to update code assessment result score
    @Override
    public void updateCodeAssessmentResultScore(CodeAssessmentResult codeAssessmentResult, List<CodeSubmission> codeSubmissions) {
        List<CodeProblem> codeProblems = codeAssessmentResult.getCodeAssessment().getCodeProblems();
        int totalTestCases = 0;
        for (CodeProblem codeProblem : codeProblems) {
            totalTestCases += codeProblem.getTestCases().size();
        }

        int totalPassedTestCased = 0;
        for (CodeSubmission codeSubmission : codeSubmissions) {
            totalPassedTestCased += codeSubmission.getPassedTestCases();
        }

        codeAssessmentResult.setScore((double)(totalPassedTestCased*100)/totalTestCases);

        updateCodeAssessmentResult(codeAssessmentResult);
    }

    // @author Vivek Sonani
    // function to validate score
    @Override
    public Boolean validateScore(CodeAssessment codeAssessment, CodeAssessmentResult codeAssessmentResult) {
        return codeAssessmentResult.getScore() >= codeAssessment.getPassPercentage();
    }
}
