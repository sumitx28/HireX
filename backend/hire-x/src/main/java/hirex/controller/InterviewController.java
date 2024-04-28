package hirex.controller;

import static hirex.util.Constants.SUCCESS;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import hirex.dto.PasscodeRequestDTO;
import hirex.model.Interview;
import hirex.model.Job;
import hirex.model.User;
import hirex.service.InterviewService;
import jakarta.mail.MessagingException;

@RestController
@CrossOrigin("${cross.origin.allowed-origins}")
public class InterviewController {

	@Autowired
	private InterviewService interviewService;
	
	// @author Roshni Joshi
	@GetMapping("/jobs/{interviewerId}")
	public ResponseEntity<List<Job>> getInterviewerJobs(@PathVariable String interviewerId) {
		List<Job> jobs = interviewService.getInterviewerJobs(interviewerId);
		return new ResponseEntity<List<Job>>(jobs, HttpStatus.OK);
	}
	
	// @author Roshni Joshi
	@GetMapping("/candidates/{jobId}")
	public ResponseEntity<List<User>> getJobCandidates(@PathVariable String jobId) {
		List<User> candidates = interviewService.getJobCandidates(jobId);
		return new ResponseEntity<List<User>>(candidates, HttpStatus.OK);
	}
	
	// @author Roshni Joshi
	@GetMapping("/interviews/{interviewId}")
	public ResponseEntity<Interview> getInterview(@PathVariable String interviewId) {
		Interview interview = interviewService.getInterview(interviewId);
		return new ResponseEntity<Interview>(interview, HttpStatus.OK);
	}
	
	// @author Roshni Joshi
	@DeleteMapping("/interviews/{interviewId}")
	public ResponseEntity<String> deleteInterview(@PathVariable String interviewId) {
		interviewService.deleteInterview(interviewId);
		return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
	}
	
	// @author Roshni Joshi
	@PostMapping("/interviews")
	public ResponseEntity<String> saveInterview(@RequestBody Interview interview) throws MessagingException {
		interviewService.saveUpdateInterview(interview);
		return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
	}
	
	// @author Roshni Joshi
	@GetMapping("/interviews/{userType}/{userId}")
	public ResponseEntity<List<Interview>> getInterviews(@PathVariable String userType, @PathVariable String userId) {
		List<Interview> interviews = interviewService.getInterviews(userType, userId);
		return new ResponseEntity<List<Interview>>(interviews, HttpStatus.OK);
	}

	// @author Raj Patel
	// API to validate meeting passcode.
	@PostMapping("/validate-passcode")
	public ResponseEntity<Boolean> validatePasscode(@RequestBody PasscodeRequestDTO requestDTO) {
		Boolean result = interviewService.validatePasscode(requestDTO);
		return ResponseEntity.ok(result);
	}

	// @author Raj Patel
	// API to resend meeting passcode.
	@GetMapping("/resend-passcode/{userId}/{roomId}")
	public ResponseEntity<String> resendPasscode(@PathVariable String userId, @PathVariable String roomId) throws MessagingException {
		interviewService.resendPasscode(userId, roomId);
		return ResponseEntity.ok(SUCCESS);
	}

	// @author Raj Patel
	// API to get interview start time
	@GetMapping("/interview-start-time/{roomId}")
	public ResponseEntity<String> getMeetingStartTime(@PathVariable String roomId) {
		String startTime = interviewService.getMeetingStartTime(roomId);
		return ResponseEntity.ok(startTime);
	}

	// @author Raj Patel
	// API to end the interview
	@PutMapping("/end-interview/{roomId}")
	public ResponseEntity<String> endInterview(@PathVariable String roomId) {
		interviewService.endInterview(roomId);
		return ResponseEntity.ok(SUCCESS);
	}
}
