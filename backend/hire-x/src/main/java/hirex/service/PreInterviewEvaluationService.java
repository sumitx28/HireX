package hirex.service;

import java.util.List;

import hirex.model.CodeAssessment;
import hirex.model.CodeProblem;
import hirex.model.Language;
import hirex.model.ProjectEvaluation;

public interface PreInterviewEvaluationService {

	// @author Roshni Joshi
	// Save coding assessment data 
	void createUpdateCodeAssessment(CodeAssessment codeAssessment);
	
	// @author Roshni Joshi
	// Get coding assessment data for a given job id
	CodeAssessment getCodeAssessment(final String jobId);

	CodeAssessment getCodeAssessmentById(final String codeAssessmentId);
	
	// @author Roshni Joshi
	// Save project evaluation data
	void createUpdateProjectEvaluation(final ProjectEvaluation projectEvaluation);
	
	// @author Roshni Joshi
	// Get project evaluation data for a given job id
	ProjectEvaluation getProjectEvaluation(final String jobId);
	
	// @author Roshni Joshi
	// Create a github repository for project evaluation
	String createRepo(final String candidateJobId);
	
	// @author Roshni Joshi
	// Validate github username of an interviewer or a candidate
	boolean validateGithubUser(final String username);
	
	// @author Roshni Joshi
	// Get the list of programming languages available for coding assessment
	List<Language> getLanguages();

	public CodeProblem getCodeProblemByCodeAssessmentIdAndCodeProblemId(String codeAssessmentId, String codeProblemId);
}
