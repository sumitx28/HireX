// @author Roshni Joshi

package hirex.model;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class CodeProblem {

	@Id
	private String codeProblemId;
	private String problemTitle;
	private String problemStmt;
	@DBRef
	private List<TestCase> testCases;

	public String getCodeProblemId() {
		return codeProblemId;
	}
	public void setCodeProblemId(String codeProblemId) {
		this.codeProblemId = codeProblemId;
	}
	public String getProblemTitle() {
		return problemTitle;
	}
	public void setProblemTitle(String problemTitle) {
		this.problemTitle = problemTitle;
	}
	public String getProblemStmt() {
		return problemStmt;
	}
	public void setProblemStmt(String problemStmt) {
		this.problemStmt = problemStmt;
	}
	public List<TestCase> getTestCases() {
		return testCases;
	}
	public void setTestCases(List<TestCase> testCases) {
		this.testCases = testCases;
	}
}
