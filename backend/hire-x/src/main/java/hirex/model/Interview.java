// @author Roshni Joshi

package hirex.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class Interview {
	
	@Id
	private String interviewId;
	@DBRef
	private User interviewer;
	@DBRef
	private Job job;
	@DBRef
	private User candidate;
	private String startTime;
	private String endTime;
	
	@JsonIgnore
	private String meetingPasscode;

	public String getInterviewId() {
		return interviewId;
	}
	public void setInterviewId(String interviewId) {
		this.interviewId = interviewId;
	}
	public User getInterviewer() {
		return interviewer;
	}
	public void setInterviewer(User interviewer) {
		this.interviewer = interviewer;
	}
	public Job getJob() {
		return job;
	}
	public void setJob(Job job) {
		this.job = job;
	}
	public User getCandidate() {
		return candidate;
	}
	public void setCandidate(User candidate) {
		this.candidate = candidate;
	}
	public String getStartTime() {
		return startTime;
	}
	public void setStartTime(String startTime) {
		this.startTime = startTime;
	}
	public String getEndTime() {
		return endTime;
	}
	public void setEndTime(String endTime) {
		this.endTime = endTime;
	}
	public String getMeetingPasscode() {
		return meetingPasscode;
	}
	public void setMeetingPasscode(String meetingPasscode) {
		this.meetingPasscode = meetingPasscode;
	}
}
