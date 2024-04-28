// @author Raj Patel

package hirex.service;

import hirex.model.Job;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;


@Service
public class EmailServiceImpl implements EmailService {

    @Autowired
    private JavaMailSender javaMailSender;

    @Autowired
    private TemplateEngine templateEngine;

    // @author Raj Patel
    // Send interview email to interviewer
    @Override
    public void interviewEmailToInterviewer(String to, String subject, String candidateName, String interviewDate, String meetingPasscode) throws MessagingException {
        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        helper.setTo(to);
        helper.setSubject(subject);

        Context context = new Context();
        context.setVariable("candidateName", candidateName);
        context.setVariable("interviewDate", interviewDate);
        context.setVariable("meetingPasscode", meetingPasscode);
        String emailContent = templateEngine.process("interviewer-interview-email-template", context);

        helper.setText(emailContent, true);
        javaMailSender.send(message);
    }

    // @author Raj Patel
    // Send interview email to candidate
    @Override
    public void interviewEmailToCandidate(String candidateEmail, String subject, String position, String startTime, String meetingPasscode) throws MessagingException {
        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        helper.setTo(candidateEmail);
        helper.setSubject(subject);

        Context context = new Context();
        context.setVariable("position", position);
        context.setVariable("interviewDate", startTime);
        context.setVariable("meetingPasscode", meetingPasscode);
        String emailContent = templateEngine.process("candidate-interview-email-template", context);

        helper.setText(emailContent, true);
        javaMailSender.send(message);
    }

    // @author Raj Patel
    // Send passcode email to meeting participants
    @Override
    public void sendPasscodeEmail(String to, String subject, String meetingPasscode) throws MessagingException {
        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        helper.setTo(to);
        helper.setSubject(subject);

        Context context = new Context();
        context.setVariable("passcode", meetingPasscode);
        String emailContent = templateEngine.process("resend-passcode-template", context);

        helper.setText(emailContent, true);
        javaMailSender.send(message);
    }

    // @author Sumit Savaliya
    @Override
    public void sendInterviewerLoginCredentials(String to, String subject, String email, String password) throws MessagingException {
        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        helper.setTo(to);
        helper.setSubject(subject);

        Context context = new Context();
        context.setVariable("email", email);
        context.setVariable("password", password);
        String emailContent = templateEngine.process("interviewer-credentials-email-template", context);

        helper.setText(emailContent, true);
        javaMailSender.send(message);

    }
    //@author Rushikumar Patel
    @Override
    public void sendEmail(String to, String subject, String body, String resetLink) throws MessagingException {
        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        helper.setTo(to);
        helper.setSubject(subject);
        Context context = new Context();
        context.setVariable("body", body);
        context.setVariable("resetLink", resetLink);
        String emailContent = templateEngine.process("reset-password-template", context);

        helper.setText(emailContent, true);
        javaMailSender.send(message);
    }

    // @author Sumit Savaliya
    @Override
    public void sendHiringEmail(String to, String subject, Job job) throws MessagingException {
        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        helper.setTo(to);
        helper.setSubject(subject);

        Context context = new Context();
        context.setVariable("jobName", job.getJobName());
        context.setVariable("companyName", job.getCompanyName());
        String emailContent = templateEngine.process("hire-template.html", context);

        helper.setText(emailContent, true);
        javaMailSender.send(message);
    }
}
