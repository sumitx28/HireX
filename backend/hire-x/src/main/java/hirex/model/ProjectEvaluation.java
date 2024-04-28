// @author Roshni Joshi

package hirex.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class ProjectEvaluation {

	@Id
	private String projectId;
	@DBRef
	private Job job;
	private String description;
	private String additionalRequirements;
	private String interviewerGithub;

	public String getProjectId() {
		return projectId;
	}
	public void setProjectId(String projectId) {
		this.projectId = projectId;
	}
	public Job getJob() {
		return job;
	}
	public void setJob(Job job) {
		this.job = job;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getAdditionalRequirements() {
		return additionalRequirements;
	}
	public void setAdditionalRequirements(String additionalRequirements) {
		this.additionalRequirements = additionalRequirements;
	}
	public String getInterviewerGithub() {
		return interviewerGithub;
	}
	public void setInterviewerGithub(String interviewerGithub) {
		this.interviewerGithub = interviewerGithub;
	}
}
