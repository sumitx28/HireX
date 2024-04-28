// @author Raj Patel

package hirex.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class PasscodeRequestDTO {

    private String roomId;

    private String meetingPasscode;
}
