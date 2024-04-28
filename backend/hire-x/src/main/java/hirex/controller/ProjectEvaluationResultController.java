// @author Vivek Sonani

package hirex.controller;

import hirex.dto.ProjectEvaluationResultRequest;
import hirex.model.CandidateJob;
import hirex.model.ProjectEvaluation;
import hirex.model.ProjectEvaluationResult;
import hirex.response.ProjectEvaluationResultResponse;
import hirex.service.CandidateService;
import hirex.service.PreInterviewEvaluationService;
import hirex.service.ProjectEvaluationResultService;
import hirex.util.Constants;
import hirex.util.ResponseMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("${cross.origin.allowed-origins}")
public class ProjectEvaluationResultController {
    @Autowired
    private ProjectEvaluationResultService projectEvaluationResultService;

    @Autowired
    private PreInterviewEvaluationService preInterviewEvaluationService;

    @Autowired
    private CandidateService candidateService;

    // @author Vivek Sonani
    // api to get project evaluation result
    @GetMapping("/getProjectEvaluationResult/{candidateJobId}")
    public ResponseEntity<ProjectEvaluationResultResponse> GetProjectEvaluationResult(@PathVariable String candidateJobId){
        ProjectEvaluationResultResponse projectEvaluationResultResponse = new ProjectEvaluationResultResponse();

        ProjectEvaluationResult projectEvaluationResult = projectEvaluationResultService.getProjectEvaluationResult(candidateJobId);
        if(projectEvaluationResult == null){
            projectEvaluationResultResponse.setMessage(Constants.NOT_FOUND);
            projectEvaluationResultResponse.setSuccess(false);
            return new ResponseEntity<>(projectEvaluationResultResponse, HttpStatus.BAD_REQUEST);
        }

        projectEvaluationResultResponse.setMessage(Constants.SUCCESS);
        projectEvaluationResultResponse.setSuccess(true);
        projectEvaluationResultResponse.setProjectEvaluationResult(projectEvaluationResult);
        return new ResponseEntity<>(projectEvaluationResultResponse, HttpStatus.OK);
    }

    // @author Vivek Sonani
    // api to create project evaluation result
    @PostMapping("/createProjectEvaluationResult")
    public ResponseEntity<ProjectEvaluationResultResponse> CreateProjectEvaluationResult(@RequestBody ProjectEvaluationResultRequest projectEvaluationResultRequest){
        ProjectEvaluationResultResponse projectEvaluationResultResponse = new ProjectEvaluationResultResponse();
        try{
            CandidateJob candidateJob = candidateService.getCandidateJob(projectEvaluationResultRequest.getCandidateJobId());
            if(candidateJob == null){
                projectEvaluationResultResponse.setMessage(ResponseMessage.INVALID_CANDIDATE_JOB_ID);
                projectEvaluationResultResponse.setSuccess(false);
                return new ResponseEntity<>(projectEvaluationResultResponse, HttpStatus.BAD_REQUEST);
            }

            ProjectEvaluation projectEvaluation = preInterviewEvaluationService.getProjectEvaluation(candidateJob.getJob().getJobId());

            if(projectEvaluation == null){
                projectEvaluationResultResponse.setMessage(ResponseMessage.INVALID_JOB_ID);
                projectEvaluationResultResponse.setSuccess(false);
                return new ResponseEntity<>(projectEvaluationResultResponse, HttpStatus.BAD_REQUEST);
            }

            ProjectEvaluationResult projectEvaluationResult = new ProjectEvaluationResult();
            projectEvaluationResult.setCandidateJob(candidateJob);
            projectEvaluationResult.setProjectEvaluation(projectEvaluation);

            projectEvaluationResultService.createProjectEvaluationResult(projectEvaluationResult);

            projectEvaluationResultResponse.setMessage(Constants.SUCCESS);
            projectEvaluationResultResponse.setSuccess(true);
            projectEvaluationResultResponse.setProjectEvaluationResult(projectEvaluationResult);
            return new ResponseEntity<>(projectEvaluationResultResponse, HttpStatus.OK);
        }
        catch (Exception ex){
            projectEvaluationResultResponse.setMessage(ex.getMessage());
            projectEvaluationResultResponse.setSuccess(false);
            return new ResponseEntity<>(projectEvaluationResultResponse, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
