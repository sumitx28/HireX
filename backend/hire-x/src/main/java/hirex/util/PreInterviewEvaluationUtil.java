// @author Roshni Joshi

package hirex.util;

import java.util.Arrays;

import org.kohsuke.github.GHRepository;
import org.kohsuke.github.GitHub;
import org.kohsuke.github.GitHubBuilder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class PreInterviewEvaluationUtil {

	@Value("${access_token}")
	private String accessToken;
	
	// Create a github repository, and add interviewer and candidate as collaborators
	public String createRepo(String repoName, String interviewerUsername, String candidateUsername) {
		String gitRepoUrl = "https://github.com/csci5709-grp-08/" + repoName;
		try {
			GitHub gitHub = new GitHubBuilder().withOAuthToken(accessToken).build();
			GHRepository repository = gitHub.createRepository(repoName).private_(true).create();
			repository.addCollaborators(Arrays.asList(gitHub.getUser(interviewerUsername), gitHub.getUser(candidateUsername)));
			System.out.println("added collaborators");
		} catch (Exception e) {
			System.out.println(e.getMessage());
		}
		return gitRepoUrl;
	}
}
