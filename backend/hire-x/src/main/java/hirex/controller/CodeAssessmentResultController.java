// @author Vivek Sonani

package hirex.controller;

import hirex.dto.AddCodeAssessmentResultRequestDTO;
import hirex.dto.QuitCodeAssessmentRequestDTO;
import hirex.dto.UpdateCodeAssessmentScoreRequestDTO;
import hirex.model.*;
import hirex.response.APIResponse;
import hirex.response.CodeAssessmentResultResponse;
import hirex.service.*;
import hirex.util.Constants;
import hirex.util.ResponseMessage;
import org.bson.types.Code;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("${cross.origin.allowed-origins}")
public class CodeAssessmentResultController {
    @Autowired
    private CodeAssessmentResultService codeAssessmentResultService;

    @Autowired
    private CodeSubmissionService codeSubmissionService;

    @Autowired
    private PreInterviewEvaluationService preInterviewEvaluationService;

    @Autowired
    private CandidateService candidateService;

    // @author Vivek Sonani
    // api to create code assessment result
    @PostMapping("/addCodeAssessmentResult")
    public ResponseEntity<APIResponse> AddCodeAssessmentResult(@RequestBody AddCodeAssessmentResultRequestDTO addCodeAssessmentResultRequestDTO){
        APIResponse apiResponse = new APIResponse();

        CandidateJob candidateJob = candidateService.getCandidateJob(addCodeAssessmentResultRequestDTO.getCandidateJobId());
        if(candidateJob == null){
            apiResponse.setMessage(ResponseMessage.INVALID_CANDIDATE_JOB_ID);
            apiResponse.setSuccess(false);
            return new ResponseEntity<>(apiResponse, HttpStatus.BAD_REQUEST);
        }

        CodeAssessment codeAssessment = preInterviewEvaluationService.getCodeAssessmentById(addCodeAssessmentResultRequestDTO.getCodeAssessmentId());
        if(codeAssessment == null){
            apiResponse.setMessage(ResponseMessage.INVALID_CODE_ASSESSMENT_ID);
            apiResponse.setSuccess(false);
            return new ResponseEntity<>(apiResponse, HttpStatus.BAD_REQUEST);
        }

        codeAssessmentResultService.createCodeAssessmentResult(candidateJob, codeAssessment);

        apiResponse.setMessage(Constants.SUCCESS);
        apiResponse.setSuccess(true);
        return new ResponseEntity<>(apiResponse, HttpStatus.OK);
    }

    // @author Vivek Sonani
    // api to update the code execution score
    @PutMapping("/updateScore")
    public ResponseEntity<CodeAssessmentResultResponse> UpdateScore(@RequestBody UpdateCodeAssessmentScoreRequestDTO updateCodeAssessmentScoreRequestDTO){
        CodeAssessmentResultResponse codeAssessmentResultResponse = new CodeAssessmentResultResponse();

        CodeAssessmentResult codeAssessmentResult = codeAssessmentResultService.getByCodeAssessmentIdAndCandidateJobId(updateCodeAssessmentScoreRequestDTO.getCodeAssessmentId(), updateCodeAssessmentScoreRequestDTO.getCandidateJobId());

        if(codeAssessmentResult == null){
            codeAssessmentResultResponse.setMessage(ResponseMessage.INVALID_CODE_ASSESSMENT_ID_OR_CANDIDATE_JOB_ID);
            codeAssessmentResultResponse.setSuccess(false);
            return new ResponseEntity<>(codeAssessmentResultResponse, HttpStatus.BAD_REQUEST);
        }

        List<CodeSubmission> codeSubmissions = codeSubmissionService.getByCodeAssessmentResultId(codeAssessmentResult.getCodeAssessmentResultId());

        codeAssessmentResultService.updateCodeAssessmentResultScore(codeAssessmentResult, codeSubmissions);

        codeAssessmentResultResponse.setMessage(Constants.SUCCESS);
        codeAssessmentResultResponse.setSuccess(true);
        codeAssessmentResultResponse.setCodeAssessmentResult(codeAssessmentResult);

        return new ResponseEntity<>(codeAssessmentResultResponse, HttpStatus.OK);
    }

    // @author Vivek Sonani
    // api to get candidate code assessment result
    @GetMapping("/getCandidateCodeAssessmentResult/{codeAssessmentId}/{candidateJobId}")
    public ResponseEntity<CodeAssessmentResultResponse> GetCodeAssessmentResult(@PathVariable String codeAssessmentId, @PathVariable String candidateJobId){
        CodeAssessmentResultResponse codeAssessmentResultResponse = new CodeAssessmentResultResponse();

        CodeAssessmentResult codeAssessmentResult = codeAssessmentResultService.getByCodeAssessmentIdAndCandidateJobId(codeAssessmentId, candidateJobId);

        if(codeAssessmentResult == null){
            codeAssessmentResultResponse.setMessage(ResponseMessage.INVALID_CODE_ASSESSMENT_ID_OR_CANDIDATE_JOB_ID);
            codeAssessmentResultResponse.setSuccess(false);
            return new ResponseEntity<>(codeAssessmentResultResponse, HttpStatus.BAD_REQUEST);
        }

        codeAssessmentResultResponse.setMessage(Constants.SUCCESS);
        codeAssessmentResultResponse.setSuccess(true);
        codeAssessmentResultResponse.setCodeAssessmentResult(codeAssessmentResult);

        return new ResponseEntity<>(codeAssessmentResultResponse, HttpStatus.OK);
    }

    // @author Vivek Sonani
    // api to quit code assessment
    @PutMapping("/quitCodeAssessment")
    public ResponseEntity<CodeAssessmentResultResponse> QuitCodeAssessment(@RequestBody QuitCodeAssessmentRequestDTO quitCodeAssessmentRequestDTO){
        CodeAssessmentResultResponse codeAssessmentResultResponse = new CodeAssessmentResultResponse();

        CodeAssessmentResult codeAssessmentResult = codeAssessmentResultService.getByCodeAssessmentIdAndCandidateJobId(quitCodeAssessmentRequestDTO.getCodeAssessmentId(), quitCodeAssessmentRequestDTO.getCandidateJobId());

        if(codeAssessmentResult == null){
            codeAssessmentResultResponse.setMessage(ResponseMessage.INVALID_CODE_ASSESSMENT_ID_OR_CANDIDATE_JOB_ID);
            codeAssessmentResultResponse.setSuccess(false);
            return new ResponseEntity<>(codeAssessmentResultResponse, HttpStatus.BAD_REQUEST);
        }

        boolean isCandidatePassed = codeAssessmentResultService.validateScore(codeAssessmentResult.getCodeAssessment(), codeAssessmentResult);

        codeAssessmentResult.setEndTime(quitCodeAssessmentRequestDTO.getEndTime());
        codeAssessmentResult.setIsPassed(isCandidatePassed);
        codeAssessmentResultService.updateCodeAssessmentResult(codeAssessmentResult);

        codeAssessmentResult.getCandidateJob().getCandidateJobStatus().setCodeCompleted(true);
        candidateService.updateCandidateJob(codeAssessmentResult.getCandidateJob());

        codeAssessmentResultResponse.setMessage(Constants.SUCCESS);
        codeAssessmentResultResponse.setSuccess(true);
        codeAssessmentResultResponse.setCodeAssessmentResult(codeAssessmentResult);

        return new ResponseEntity<>(codeAssessmentResultResponse, HttpStatus.OK);
    }
}
