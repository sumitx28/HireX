package hirex.model;

import hirex.util.Constants;

public class Candidate extends User {
	
	private String role = Constants.CANDIDATE;

	public String getRole() {
		return role;
	}
	public void setRole(String role) {
		this.role = role;
	}
}
