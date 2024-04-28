// @author Raj Patel

package hirex.service;

import hirex.model.Job;
import jakarta.mail.MessagingException;

public interface EmailService {

    // @author Raj Patel
    void interviewEmailToInterviewer(String to, String subject, String candidateName, String interviewDate, String meetingPasscode) throws MessagingException;

    // @author Raj Patel
    void interviewEmailToCandidate(String candidateEmail, String subject, String position, String startTime, String meetingPasscode) throws MessagingException;

    // @author Raj Patel
    void sendPasscodeEmail(String to, String subject, String meetingPasscode) throws MessagingException;

    // @author Sumit Savaliya
    void sendInterviewerLoginCredentials(String to, String subject, String email, String password) throws MessagingException;

    // @author Sumit Savaliya
    void sendHiringEmail(String to, String subject, Job job) throws MessagingException;

    //@author Rushikumar Patel
    void sendEmail(String to, String subject, String body, String resetLink) throws MessagingException;

}
