package hirex.service;

import java.util.List;

import hirex.dto.PasscodeRequestDTO;
import hirex.model.Interview;
import hirex.model.Job;
import hirex.model.User;
import jakarta.mail.MessagingException;

public interface InterviewService {

	// @author Roshni Joshi
	// Get all the jobs of a given interviewer
	List<Job> getInterviewerJobs(final String interviewerId);
	
	// @author Roshni Joshi
	// Get all the candidates for a given job
	List<User> getJobCandidates(final String jobId);
	
	// @author Roshni Joshi
	// Save an interview details
	void saveUpdateInterview(final Interview interview) throws MessagingException;
	
	// @author Roshni Joshi
	// Get all scheduled interviews of a particular candidate or an interviewer
	List<Interview> getInterviews(final String userType, final String userId);
	
	// @author Roshni Joshi
	// Get interview details for a given interview id
	Interview getInterview(final String interviewId);
	
	// @author Roshni Joshi
	// Delete an interview with a given interview id
	void deleteInterview(final String interviewId);

	// @author Raj Patel
	boolean validatePasscode(PasscodeRequestDTO requestDTO);

	// @author Raj Patel
	void resendPasscode(String userId, String roomId) throws MessagingException;

	// @author Raj Patel
	String getMeetingStartTime(String roomId);

	// @author Raj Patel
	void endInterview(String roomId);
}
