//@author Rushikumar Patel

package hirex.dto;

import lombok.Data;

@Data
public class RegistrationRequestDTO {
    private String email;
    private String password;
    private String firstname;
    private String lastname;
    private String role;
}
