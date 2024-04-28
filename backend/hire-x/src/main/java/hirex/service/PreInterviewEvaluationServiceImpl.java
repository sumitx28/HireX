package hirex.service;

import java.util.List;
import java.util.Optional;

import org.kohsuke.github.GitHub;
import org.kohsuke.github.GitHubBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import hirex.model.CandidateJob;
import hirex.model.CodeAssessment;
import hirex.model.CodeProblem;
import hirex.model.Language;
import hirex.model.ProjectEvaluation;
import hirex.model.TestCase;
import hirex.repository.CandidateJobRepository;
import hirex.repository.CodeAssessmentRepository;
import hirex.repository.CodeProblemRepository;
import hirex.repository.LanguageRepository;
import hirex.repository.ProjectEvaluationRepository;
import hirex.repository.TestCaseRepository;
import hirex.util.PreInterviewEvaluationUtil;

@Service
public class PreInterviewEvaluationServiceImpl implements PreInterviewEvaluationService {

	@Autowired
	private CodeAssessmentRepository codeAssessmentRepository;

	@Autowired
	private ProjectEvaluationRepository projectEvaluationRepository;

	@Autowired
	private CandidateJobRepository candidateJobRepository;

	@Autowired
	private PreInterviewEvaluationUtil preInterviewEvaluationUtil;

	@Autowired
	private TestCaseRepository testCaseRepository;

	@Autowired
	private CodeProblemRepository codeProblemRepository;

	@Autowired
	private LanguageRepository languageRepository;

	@Value("${access_token}")
	private String accessToken;

	// @author Roshni Joshi
	@Override
	public void createUpdateCodeAssessment(CodeAssessment codeAssessment) {
		for(CodeProblem codeProblem : codeAssessment.getCodeProblems()) {
			for(TestCase testCase : codeProblem.getTestCases()) {
				if(testCase.getTestCaseId().startsWith("Test")) {
					testCase.setTestCaseId(null);
				}
				testCase = testCaseRepository.save(testCase);
			}
			if(codeProblem.getCodeProblemId().startsWith("Prob")) {
				codeProblem.setCodeProblemId(null);
			}
			codeProblem = codeProblemRepository.save(codeProblem);
		}
		codeAssessmentRepository.save(codeAssessment);
	}

	// @author Roshni Joshi
	@Override
	public CodeAssessment getCodeAssessment(String jobId) {
		CodeAssessment codeAssessment = codeAssessmentRepository.findByJob_JobId(jobId);
		if(codeAssessment != null) {
			return codeAssessment;
		}
		return new CodeAssessment();
	}

	@Override
	public CodeAssessment getCodeAssessmentById(String codeAssessmentId) {
		Optional<CodeAssessment> codeAssessment = codeAssessmentRepository.findById(codeAssessmentId);

		return codeAssessment.orElse(null);
	}

	// @author Roshni Joshi
	@Override
	public void createUpdateProjectEvaluation(ProjectEvaluation projectEvaluation) {
		projectEvaluationRepository.save(projectEvaluation);
	}

	// @author Roshni Joshi
	@Override
	public ProjectEvaluation getProjectEvaluation(String jobId) {
		ProjectEvaluation projectEvaluation = projectEvaluationRepository.findByJob_JobId(jobId);
		if(projectEvaluation != null) {
			return projectEvaluation;
		}
		return new ProjectEvaluation();
	}

	// @author Vivek Sonani
	//function to get code problem
	@Override
	public CodeProblem getCodeProblemByCodeAssessmentIdAndCodeProblemId(String codeAssessmentId, String codeProblemId){
		Optional<CodeAssessment> codeAssessmentOptional = codeAssessmentRepository.findById(codeAssessmentId);
		if(codeAssessmentOptional.isPresent()){
			CodeAssessment codeAssessment = codeAssessmentOptional.get();
			List<CodeProblem> codeProblemList = codeAssessment.getCodeProblems();

			Optional<CodeProblem> selectedCodeProblem = codeProblemList.stream()
					.filter(problem -> problem.getCodeProblemId().equals(codeProblemId))
					.findFirst();

			if(selectedCodeProblem.isPresent()){
				return selectedCodeProblem.get();
			}
		}
		return new CodeProblem();
	}

	// @author Roshni Joshi
	@Override
	public String createRepo(String candidateJobId) {
		String gitRepoUrl = null;
		Optional<CandidateJob> candidateJobOptional = candidateJobRepository.findById(candidateJobId);
		if(candidateJobOptional.isPresent()) {
			CandidateJob candidateJob = candidateJobOptional.get();
			String repoName = candidateJob.getCandidate().getFirstname()
					+ "_" + candidateJob.getCandidate().getLastname()
					+ "_" + candidateJob.getCandidateJobId();
			String interviewerGithub = projectEvaluationRepository.findByJob_JobId(candidateJob.getJob().getJobId()).getInterviewerGithub();
			String candidateGithub = candidateJob.getCandidateJobStatus().getCandidateGithub();
			if((interviewerGithub != null && !interviewerGithub.isBlank() && !interviewerGithub.isEmpty()) && (candidateGithub != null && !candidateGithub.isEmpty() && !candidateGithub.isBlank())){
				gitRepoUrl = preInterviewEvaluationUtil.createRepo(repoName, interviewerGithub, candidateGithub);
				if(gitRepoUrl != null && !gitRepoUrl.isEmpty() && !gitRepoUrl.isBlank()) {
					candidateJob.getCandidateJobStatus().setGitRepoLink(gitRepoUrl);
					candidateJobRepository.save(candidateJob);
				}
			}

		}
		return gitRepoUrl;
	}

	// @author Roshni Joshi
	@Override
	public boolean validateGithubUser(String username) {
		try {
			GitHub gitHub = new GitHubBuilder().withOAuthToken(accessToken).build();
			if(username != null && !username.isBlank() && !username.isEmpty()
					&& gitHub.getUser(username) != null) {
				return true;
			}
			return false;
		} catch (Exception e) {
			return false;
		}
	}

	// @author Roshni Joshi
	@Override
	public List<Language> getLanguages() {
		return languageRepository.findAll();
	}
}
