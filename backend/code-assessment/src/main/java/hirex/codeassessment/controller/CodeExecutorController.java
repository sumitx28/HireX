// @author Vivek Sonani

package hirex.codeassessment.controller;

import hirex.codeassessment.codeAssessmentDTO.CodeExecutorRequestDTO;
import hirex.codeassessment.exception.CodeExecutionException;
import hirex.codeassessment.codeAssessmentResponse.CodeExecutorResponse;
import hirex.codeassessment.exception.CompilationException;
import hirex.codeassessment.exception.RuntimeException;
import hirex.codeassessment.hireXDTO.CodeSubmissionRequestDTO;
import hirex.codeassessment.hireXDTO.UpdateCodeAssessmentScoreRequestDTO;
import hirex.codeassessment.hireXResponse.TestCase;
import hirex.codeassessment.service.CodeAssessmentService;
import hirex.codeassessment.util.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("${cross.origin.allowed-origins}")
public class CodeExecutorController {
    @Autowired
    private CodeAssessmentService codeAssessmentService;

    // @author Vivek Sonani
    // api to validate the code by executing the testcases
    @PostMapping("/validateCode")
    public ResponseEntity<CodeExecutorResponse> validateCode(@RequestHeader("Authorization") String authorizationHeader, @RequestBody CodeExecutorRequestDTO codeExecutorRequestDTO){
        CodeExecutorResponse codeExecutorResponse = new CodeExecutorResponse();

        String jwtToken = null;
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            jwtToken = authorizationHeader.substring(7);
        } else {
            codeExecutorResponse.setMessage(ResponseMessage.JWTNotProvided);
            codeExecutorResponse.setSuccess(false);
            return new ResponseEntity<>(codeExecutorResponse, HttpStatus.BAD_REQUEST);
        }
        try {
            List<TestCase> testCaseList = codeAssessmentService.getTestCases(codeExecutorRequestDTO.getCodeAssessmentId(), codeExecutorRequestDTO.getCodeProblemId(), jwtToken);

            int passedTestCases = codeAssessmentService.executeCode(codeExecutorRequestDTO, testCaseList);

            codeExecutorResponse.setMessage(ResponseMessage.Success);
            codeExecutorResponse.setSuccess(true);
            codeExecutorResponse.setAllTestPassed(passedTestCases == testCaseList.size());
            codeExecutorResponse.setTestCaseList(testCaseList);

            return new ResponseEntity<>(codeExecutorResponse, HttpStatus.OK);
        }
        catch (CompilationException exception){
            codeExecutorResponse.setMessage(ResponseMessage.CompilationError);
            codeExecutorResponse.setSuccess(false);
            codeExecutorResponse.setCompilationError(exception.getMessage());

            return new ResponseEntity<>(codeExecutorResponse, HttpStatus.BAD_REQUEST);
        }
        catch (RuntimeException exception){
            codeExecutorResponse.setMessage(ResponseMessage.RuntimeError);
            codeExecutorResponse.setSuccess(false);
            codeExecutorResponse.setRunTimeError(exception.getMessage());

            return new ResponseEntity<>(codeExecutorResponse, HttpStatus.BAD_REQUEST);
        }
        catch (CodeExecutionException exception){
            codeExecutorResponse.setMessage(exception.getMessage());
            codeExecutorResponse.setSuccess(false);

            return new ResponseEntity<>(codeExecutorResponse, HttpStatus.BAD_REQUEST);
        }
        catch (Exception exception){
            codeExecutorResponse.setMessage(exception.getMessage());
            codeExecutorResponse.setSuccess(false);

            return new ResponseEntity<>(codeExecutorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // @author Vivek Sonani
    // api to submit the final code
    @PostMapping("/submitCode")
    public ResponseEntity<CodeExecutorResponse> submitCode(@RequestHeader("Authorization") String authorizationHeader, @RequestBody CodeExecutorRequestDTO codeExecutorRequestDTO){
        CodeExecutorResponse codeExecutorResponse = new CodeExecutorResponse();

        String jwtToken = null;
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            jwtToken = authorizationHeader.substring(7);
        } else {
            codeExecutorResponse.setMessage(ResponseMessage.JWTNotProvided);
            codeExecutorResponse.setSuccess(false);
            return new ResponseEntity<>(codeExecutorResponse, HttpStatus.BAD_REQUEST);
        }

        try {
            List<TestCase> testCaseList = codeAssessmentService.getTestCases(codeExecutorRequestDTO.getCodeAssessmentId(), codeExecutorRequestDTO.getCodeProblemId(), jwtToken);

            int passedTestCases = codeAssessmentService.executeCode(codeExecutorRequestDTO, testCaseList);

            CodeSubmissionRequestDTO codeSubmissionRequestDTO = RequestDTOUtil.getCodeSubmissionRequestDTO(codeExecutorRequestDTO, passedTestCases, testCaseList);
            codeAssessmentService.submitCode(codeSubmissionRequestDTO, jwtToken);

            UpdateCodeAssessmentScoreRequestDTO updateCodeAssessmentScoreRequestDTO = RequestDTOUtil.getUpdateCodeAssessmentScoreRequestDTO(codeExecutorRequestDTO);
            codeAssessmentService.updateScore(updateCodeAssessmentScoreRequestDTO, jwtToken);

            codeExecutorResponse.setMessage(ResponseMessage.Success);
            codeExecutorResponse.setSuccess(true);
            codeExecutorResponse.setAllTestPassed(passedTestCases == testCaseList.size());
            codeExecutorResponse.setTestCaseList(testCaseList);

            return new ResponseEntity<>(codeExecutorResponse, HttpStatus.OK);
        }
        catch (CompilationException exception){
            codeExecutorResponse.setMessage(ResponseMessage.CompilationError);
            codeExecutorResponse.setSuccess(false);
            codeExecutorResponse.setCompilationError(exception.getMessage());

            return new ResponseEntity<>(codeExecutorResponse, HttpStatus.BAD_REQUEST);
        }
        catch (RuntimeException exception){
            codeExecutorResponse.setMessage(ResponseMessage.RuntimeError);
            codeExecutorResponse.setSuccess(false);
            codeExecutorResponse.setRunTimeError(exception.getMessage());

            return new ResponseEntity<>(codeExecutorResponse, HttpStatus.BAD_REQUEST);
        }
        catch (CodeExecutionException exception){
            codeExecutorResponse.setMessage(exception.getMessage());
            codeExecutorResponse.setSuccess(false);

            return new ResponseEntity<>(codeExecutorResponse, HttpStatus.BAD_REQUEST);
        }
        catch (Exception exception){
            codeExecutorResponse.setMessage(exception.getMessage());
            codeExecutorResponse.setSuccess(false);

            return new ResponseEntity<>(codeExecutorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
