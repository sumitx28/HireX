// @author Roshni Joshi

package hirex.model;

public class CandidateJobStatus {

	private boolean isCodeCompleted;
	private boolean isProjectCompleted;
	private boolean isInterviewCompleted;
	private boolean isWithdrawn;
	private String gitRepoLink;
	private String candidateGithub;
	
	public boolean isCodeCompleted() {
		return isCodeCompleted;
	}
	public void setCodeCompleted(boolean isCodeCompleted) {
		this.isCodeCompleted = isCodeCompleted;
	}
	public boolean isProjectCompleted() {
		return isProjectCompleted;
	}
	public void setProjectCompleted(boolean isProjectCompleted) {
		this.isProjectCompleted = isProjectCompleted;
	}
	public boolean isInterviewCompleted() {
		return isInterviewCompleted;
	}
	public void setInterviewCompleted(boolean isInterviewCompleted) {
		this.isInterviewCompleted = isInterviewCompleted;
	}
	public boolean isWithdrawn() {
		return isWithdrawn;
	}
	public void setWithdrawn(boolean isWithdrawn) {
		this.isWithdrawn = isWithdrawn;
	}
	public String getGitRepoLink() {
		return gitRepoLink;
	}
	public void setGitRepoLink(String gitRepoLink) {
		this.gitRepoLink = gitRepoLink;
	}
	public String getCandidateGithub() {
		return candidateGithub;
	}
	public void setCandidateGithub(String candidateGithub) {
		this.candidateGithub = candidateGithub;
	}
}
