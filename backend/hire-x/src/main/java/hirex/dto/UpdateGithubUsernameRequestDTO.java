// @author Vivek Sonani

package hirex.dto;

import lombok.Data;

@Data
public class UpdateGithubUsernameRequestDTO {
    private String candidateJobId;
    private String username;
}
