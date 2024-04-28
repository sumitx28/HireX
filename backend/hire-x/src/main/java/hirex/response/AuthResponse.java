//@author Rushikumar Patel

package hirex.response;

import hirex.model.User;
import lombok.Data;

@Data
public class AuthResponse extends APIResponse {
    private User user;
    private String token;
}
