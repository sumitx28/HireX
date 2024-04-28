// @author Roshni Joshi

package hirex.model;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class CodeAssessment {

	@Id
	private String codeAssessmentId;
	@DBRef
	private Job job;
	private List<String> languages;
	private int duration;
	private int passPercentage;
	@DBRef
	private List<CodeProblem> codeProblems;

	public String getCodeAssessmentId() {
		return codeAssessmentId;
	}
	public void setCodeAssessmentId(String codeAssessmentId) {
		this.codeAssessmentId = codeAssessmentId;
	}
	public Job getJob() {
		return job;
	}
	public void setJob(Job job) {
		this.job = job;
	}
	public List<String> getLanguages() {
		return languages;
	}
	public void setLanguages(List<String> languages) {
		this.languages = languages;
	}
	public int getDuration() {
		return duration;
	}
	public void setDuration(int duration) {
		this.duration = duration;
	}
	public int getPassPercentage() {
		return passPercentage;
	}
	public void setPassPercentage(int passPercentage) {
		this.passPercentage = passPercentage;
	}
	public List<CodeProblem> getCodeProblems() {
		return codeProblems;
	}
	public void setCodeProblems(List<CodeProblem> codeProblems) {
		this.codeProblems = codeProblems;
	}
}