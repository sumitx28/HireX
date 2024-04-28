//@author Rushikumar Patel

package hirex.dto;

import lombok.Data;

@Data
public class ResetPasswordRequestDTO {
    private String code;
    private String password;
}
