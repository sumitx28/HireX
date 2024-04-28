// @author Vivek Sonani

package hirex.controller;

import hirex.dto.CodeSubmissionRequestDTO;
import hirex.dto.TestCaseResultRequestDTO;
import hirex.model.*;
import hirex.response.CodeSubmissionResponse;
import hirex.service.*;

import java.util.List;

import hirex.util.ResponseMessage;
import hirex.util.Constants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("${cross.origin.allowed-origins}")
public class CodeSubmissionController {
    @Autowired
    private CodeAssessmentResultService codeAssessmentResultService;

    @Autowired
    private CodeSubmissionService codeSubmissionService;

    @Autowired
    private CodeProblemService codeProblemService;

    @Autowired
    private TestCaseService testCaseService;

    @Autowired
    private TestCaseResultService testCaseResultService;

    // @author Vivek Sonani
    // api to submit the code
    @PostMapping("/submitCode")
    public ResponseEntity<CodeSubmissionResponse> SubmitCode(@RequestBody CodeSubmissionRequestDTO codeSubmissionRequestDTO){
        CodeSubmissionResponse codeSubmissionResponse = new CodeSubmissionResponse();

        CodeAssessmentResult codeAssessmentResult = codeAssessmentResultService.getByCodeAssessmentIdAndCandidateJobId(codeSubmissionRequestDTO.getCodeAssessmentId(), codeSubmissionRequestDTO.getCandidateJobId());

        if(codeAssessmentResult == null){
            codeSubmissionResponse.setMessage(ResponseMessage.INVALID_CODE_ASSESSMENT_ID_OR_CANDIDATE_JOB_ID);
            codeSubmissionResponse.setSuccess(false);
            return new ResponseEntity<>(codeSubmissionResponse, HttpStatus.BAD_REQUEST);
        }

        CodeProblem codeProblem = codeProblemService.filterById(codeSubmissionRequestDTO.getCodeProblemId(), codeAssessmentResult.getCodeAssessment().getCodeProblems());
        if(codeProblem == null){
            codeSubmissionResponse.setMessage(ResponseMessage.INVALID_CODE_PROBLEM_ID);
            codeSubmissionResponse.setSuccess(false);
            return new ResponseEntity<>(codeSubmissionResponse, HttpStatus.BAD_REQUEST);
        }

        CodeSubmission codeSubmission = codeSubmissionService.getByCodeAssessmentResultIdAndCodeProblemId(codeAssessmentResult.getCodeAssessmentResultId(), codeSubmissionRequestDTO.getCodeProblemId());

        if(codeSubmission == null){
            codeSubmission = codeSubmissionService.createCodeSubmission(codeSubmissionRequestDTO, codeAssessmentResult, codeProblem);
        }
        else{
            codeSubmissionService.updateCodeSubmission(codeSubmission, codeSubmissionRequestDTO, codeAssessmentResult, codeProblem);
        }

        List<TestCaseResultRequestDTO> testCaseResults = codeSubmissionRequestDTO.getTestCaseResults();
        for (TestCaseResultRequestDTO testCaseResultRequestDTO : testCaseResults) {
            TestCase testCase = testCaseService.getById(testCaseResultRequestDTO.getTestCaseId());

            if (testCase == null) {
                codeSubmissionResponse.setMessage(ResponseMessage.INVALID_TEST_CASE_ID);
                codeSubmissionResponse.setSuccess(false);
                return new ResponseEntity<>(codeSubmissionResponse, HttpStatus.BAD_REQUEST);
            }

            TestCaseResult testCaseResult = testCaseResultService.getByCodeSubmissionIdAndTestCaseId(codeSubmission.getCodeSubmissionId(), testCaseResultRequestDTO.getTestCaseId());

            if (testCaseResult == null) {
                testCaseResultService.createTestCaseResult(testCaseResultRequestDTO, codeSubmission, testCase);
            } else {
                testCaseResultService.updateTestCaseResult(testCaseResult, testCaseResultRequestDTO, codeSubmission, testCase);
            }
        }

        codeSubmissionResponse.setMessage(Constants.SUCCESS);
        codeSubmissionResponse.setSuccess(true);
        codeSubmissionResponse.setCodeSubmission(codeSubmission);

        return new ResponseEntity<>(codeSubmissionResponse, HttpStatus.OK);
    }

    // @author Vivek Sonani
    // api to get code submission
    @GetMapping("/getCodeSubmissionByCodeAssessmentResultIdAndCodeProblemId/{codeAssessmentResultId}/{codeProblemId}")
    public ResponseEntity<CodeSubmissionResponse> getCodeSubmissionByCodeAssessmentResultIdAndCodeProblemId(@PathVariable String codeAssessmentResultId, @PathVariable String codeProblemId){
        CodeSubmissionResponse codeSubmissionResponse = new CodeSubmissionResponse();

        CodeSubmission codeSubmission = codeSubmissionService.getByCodeAssessmentResultIdAndCodeProblemId(codeAssessmentResultId, codeProblemId);

        if(codeSubmission == null){
            codeSubmissionResponse.setMessage(Constants.NOT_FOUND);
            codeSubmissionResponse.setSuccess(false);
            return new ResponseEntity<>(codeSubmissionResponse, HttpStatus.NOT_FOUND);
        }

        codeSubmissionResponse.setMessage(Constants.SUCCESS);
        codeSubmissionResponse.setSuccess(true);
        codeSubmissionResponse.setCodeSubmission(codeSubmission);
        return new ResponseEntity<>(codeSubmissionResponse, HttpStatus.OK);
    }
}
