package hirex.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import hirex.dto.PasscodeRequestDTO;
import hirex.model.CandidateJob;
import hirex.model.Interview;
import hirex.model.Job;
import hirex.model.User;
import hirex.repository.CandidateJobRepository;
import hirex.repository.InterviewRepository;
import hirex.repository.JobRepository;
import hirex.repository.UserRepository;
import hirex.util.Constants;
import jakarta.mail.MessagingException;

@Service
public class InterviewServiceImpl implements InterviewService {

	@Autowired
	private JobRepository jobRepository;
	
	@Autowired
	private CandidateJobRepository candidateJobRepository;
	
	@Autowired
	private InterviewRepository interviewRepository;

	@Autowired
	private EmailService emailService;

	@Autowired
	private UserRepository userRepository;

	@Value("${frontend-url}")
	private String applicationUrl;
	
	// @author Roshni Joshi
	@Override
	public List<Job> getInterviewerJobs(String interviewerId) {
		return jobRepository.findByInterviewer_UserId(interviewerId);
	}

	// @author Roshni Joshi
	@Override
	public List<User> getJobCandidates(String jobId) {
		List<CandidateJob> candidateJobs = candidateJobRepository.findByJob_JobId(jobId);
		List<User> candidates = candidateJobs.stream().map(data -> (User)data.getCandidate()).collect(Collectors.toList());
		return candidates;
	}

	// @author Raj Patel, Roshni Joshi
	@Override
	@Transactional
	public void saveUpdateInterview(Interview interview) throws MessagingException {
		boolean isRescheduled = true;
		if (interview.getInterviewId() == null) {
			String interviewPasscode = java.util.UUID.randomUUID().toString();
			interview.setMeetingPasscode(interviewPasscode);
			isRescheduled = false;
		}
		Interview savedInterview = interviewRepository.save(interview);
		savedInterview = interviewRepository.findById(savedInterview.getInterviewId()).get();
		sendInterviewScheduleEmails(savedInterview, isRescheduled);
	}
	
	// @author Roshni Joshi
	@Override
	public List<Interview> getInterviews(String userType, String userId) {
		if(Constants.INTERVIEWER.equalsIgnoreCase(userType)) {
			return interviewRepository.findByInterviewer_UserId(userId);
		} else {
			return interviewRepository.findByCandidate_UserId(userId);
		}
	}

	// @author Roshni Joshi
	@Override
	public Interview getInterview(String interviewId) {
		Interview interview = new Interview();
		Optional<Interview> interviewOptional = interviewRepository.findById(interviewId);
		if(interviewOptional.isPresent()) {
			interview = interviewOptional.get();
		}
		return interview;
	}

	// @author Roshni Joshi
	@Override
	public void deleteInterview(String interviewId) {
		interviewRepository.deleteById(interviewId);
	}

	// @author Raj Patel
	@Override
	public boolean validatePasscode(PasscodeRequestDTO requestDTO) {
		Optional<Interview> interview = interviewRepository.findById(requestDTO.getRoomId());
		return interview.get().getMeetingPasscode().equals(requestDTO.getMeetingPasscode());
	}

	// @author Raj Patel
	@Override
	public void resendPasscode(String userId, String roomId) throws MessagingException {
		Optional<Interview> interview = interviewRepository.findById(roomId);
		User user = userRepository.findByUserId(userId);
		if (interview.isEmpty()) {
			throw new IllegalArgumentException("Interview room not found: " + roomId);
		}

		sendPasscodeEmail(user, interview.get());
	}

	// @author Raj Patel
	@Override
	public String getMeetingStartTime(String roomId) {
		Optional<Interview> interview = interviewRepository.findById(roomId);
		if (interview.isEmpty()) {
			throw new IllegalArgumentException("Interview room not found: " + roomId);
		}
		return interview.get().getStartTime();
	}

	// @author Raj Patel
	@Override
	public void endInterview(String roomId) {
		Optional<Interview> interview = interviewRepository.findById(roomId);
		if (interview.isEmpty()) {
			throw new IllegalArgumentException("Interview room not found: " + roomId);
		}
		CandidateJob candidateJob = candidateJobRepository.findByCandidate_UserIdAndJob_JobId(interview.get().getCandidate().getUserId(), interview.get().getJob().getJobId());
		candidateJob.getCandidateJobStatus().setInterviewCompleted(Boolean.TRUE);
		candidateJobRepository.save(candidateJob);
	}

	// @author Raj Patel
	private void sendPasscodeEmail(User user, Interview interview) throws MessagingException {
		emailService.sendPasscodeEmail(user.getEmail(), "Meeting Passcode", interview.getMeetingPasscode());
	}

	// @author Raj Patel
	private void sendInterviewScheduleEmails(Interview interview, boolean isRescheduled) throws MessagingException {
		String interviewerEmail= interview.getInterviewer().getEmail();
		String candidateEmail = interview.getCandidate().getEmail();
		String position = interview.getJob().getJobName();
		String candidateName = interview.getCandidate().getFirstname() + " " + interview.getCandidate().getLastname();
		String subject = "Interview " + (isRescheduled ? "Rescheduled!" : "Scheduled!");

		emailService.interviewEmailToInterviewer(interviewerEmail, subject, candidateName,  interview.getStartTime(), interview.getMeetingPasscode());
		emailService.interviewEmailToCandidate(candidateEmail, subject, position, interview.getStartTime(), interview.getMeetingPasscode());
	}
}
