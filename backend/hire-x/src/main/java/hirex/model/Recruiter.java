package hirex.model;

import hirex.util.Constants;

public class Recruiter extends User {

	private String role = Constants.RECRUITER;

	public String getRole() {
		return role;
	}
	public void setRole(String role) {
		this.role = role;
	}
}
