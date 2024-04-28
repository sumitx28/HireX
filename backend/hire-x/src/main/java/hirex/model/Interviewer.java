package hirex.model;

import hirex.util.Constants;
import lombok.Data;

@Data
public class Interviewer extends User {

	private String role = Constants.INTERVIEWER;

}
