package hirex.controller;

import static hirex.util.Constants.SUCCESS;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import hirex.model.CandidateJob;
import hirex.model.CodeAssessment;
import hirex.model.CodeProblem;
import hirex.model.Language;
import hirex.model.ProjectEvaluation;
import hirex.service.CandidateService;
import hirex.service.PreInterviewEvaluationService;
import hirex.util.ResponseMessage;

@RestController
@CrossOrigin("${cross.origin.allowed-origins}")
public class PreInterviewEvaluationController {

	@Autowired
	private PreInterviewEvaluationService preInterviewEvaluationService;

	@Autowired
	private CandidateService candidateService;
	
	// @author Roshni Joshi
	@PostMapping("/codeassessments")
	public ResponseEntity<String> createCodeAssessment(@RequestBody CodeAssessment codeAssessment) {
		preInterviewEvaluationService.createUpdateCodeAssessment(codeAssessment);
		return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
	}
	
	// @author Roshni Joshi
	@GetMapping("/codeassessments/{jobId}")
	public ResponseEntity<CodeAssessment> getCodeAssessment(@PathVariable String jobId) {
		CodeAssessment codeAssessment =	preInterviewEvaluationService.getCodeAssessment(jobId);
		return new ResponseEntity<CodeAssessment>(codeAssessment, HttpStatus.OK);
	}
	
	// @author Roshni Joshi
	@PostMapping("/projects")
	public ResponseEntity<String> createProjectEvaluation(@RequestBody ProjectEvaluation projectEvaluation) {
		preInterviewEvaluationService.createUpdateProjectEvaluation(projectEvaluation);
		return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
	}
	
	// @author Roshni Joshi
	@GetMapping("/projects/{jobId}")
	public ResponseEntity<ProjectEvaluation> getProjectEvaluation(@PathVariable String jobId) {
		ProjectEvaluation projectEvaluation = preInterviewEvaluationService.getProjectEvaluation(jobId);
		return new ResponseEntity<ProjectEvaluation>(projectEvaluation, HttpStatus.OK);
	}

	// @author Vivek Sonani
	// api to get code problem
	@GetMapping("/getCodeProblem/{codeAssessmentId}/{codeProblemId}")
	public ResponseEntity<CodeProblem> getCodeProblem(@PathVariable String codeAssessmentId, @PathVariable String codeProblemId){
		CodeProblem codeProblem = preInterviewEvaluationService.getCodeProblemByCodeAssessmentIdAndCodeProblemId(codeAssessmentId, codeProblemId);
		return new ResponseEntity<>(codeProblem, HttpStatus.OK);
	}
	
	// @author Roshni Joshi
	@GetMapping("/createRepo/{candidateJobId}")
	public ResponseEntity<String> createRepo(@PathVariable String candidateJobId) {
		CandidateJob candidateJob = candidateService.getCandidateJob(candidateJobId);
		if(candidateJob == null){
			return new ResponseEntity<>(ResponseMessage.INVALID_CANDIDATE_JOB_ID, HttpStatus.BAD_REQUEST);
		}
		String gitRepoUrl = preInterviewEvaluationService.createRepo(candidateJobId);
		if(gitRepoUrl == null || gitRepoUrl.isEmpty() || gitRepoUrl.isBlank()){
			return new ResponseEntity<>(gitRepoUrl, HttpStatus.BAD_REQUEST);
		}
		candidateJob.getCandidateJobStatus().setGitRepoLink(gitRepoUrl);
		candidateService.updateCandidateJob(candidateJob);
		return new ResponseEntity<String>(gitRepoUrl, HttpStatus.OK);
	}
	
	// @author Roshni Joshi
	@GetMapping("/validateGithubUser/{username}")
	public ResponseEntity<Boolean> validateGithubUser(@PathVariable String username) {
		return new ResponseEntity<Boolean>(new Boolean(preInterviewEvaluationService.validateGithubUser(username)), HttpStatus.OK);
	}
	
	// @author Roshni Joshi
	@GetMapping("/languages")
	public ResponseEntity<List<Language>> getLanguages() {
		return new ResponseEntity<List<Language>>(preInterviewEvaluationService.getLanguages(), HttpStatus.OK);
	}
}
