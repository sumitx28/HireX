package hirex.service;

import hirex.controller.AuthController;
import hirex.dto.JobRequestDTO;
import hirex.dto.RegistrationRequestDTO;
import hirex.mapper.JobRequestDTOMapper;
import hirex.model.Job;
import hirex.model.User;
import hirex.repository.JobRepository;
import hirex.repository.UserRepository;
import hirex.util.CommonUtils;
import hirex.util.Constants;
import jakarta.mail.MessagingException;
import org.apache.tomcat.util.buf.UEncoder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

// @author Sumit Savaliya
@Service
public class JobServiceImpl implements JobService {

    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmailService emailService;

    // @author Sumit Savaliya
    public Job createJob(JobRequestDTO jobRequestDTO) {
        User recruiter = userRepository.findByEmail(jobRequestDTO.getRecruiterId());

        User interviewer = userRepository.findByEmail(jobRequestDTO.getInterviewerEmail());
        if (interviewer == null) {
            interviewer = new User();
            interviewer.setEmail(jobRequestDTO.getInterviewerEmail());
            interviewer.setFirstname(jobRequestDTO.getInterviewerFirstName());
            interviewer.setLastname(jobRequestDTO.getInterviewerLastName());
            interviewer.setUserRole(Constants.INTERVIEWER);
            interviewer.setPassword(CommonUtils.generatePassword());
            userRepository.save(interviewer);

            try {
                emailService.sendInterviewerLoginCredentials(interviewer.getEmail(), "Welcome to HireX", interviewer.getEmail(), interviewer.getPassword());
            }
            catch(MessagingException exception) {
                throw new IllegalArgumentException("Unable to send email!!");
            }
        }
        else{
            try {
                emailService.sendInterviewerLoginCredentials(interviewer.getEmail(), "Welcome to HireX", interviewer.getEmail(), "USE YOUR PRESET PASSWORD");
            }
            catch(MessagingException exception) {
                throw new IllegalArgumentException("Unable to send email!!");
            }
        }

        if (recruiter == null) {
            throw new IllegalArgumentException("Recruiter not found with email: " + jobRequestDTO.getRecruiterId());
        }

        Job job = new Job();
        job = JobRequestDTOMapper.mapJobRequest(jobRequestDTO, job);
        job.setRecruiter(recruiter);
        job.setInterviewer(interviewer);

        return jobRepository.insert(job);
    }

    // @author Sumit Savaliya
    @Override
    public void updateHiringStatus(String jobId, boolean status) {
        Optional<Job> storedJob = jobRepository.findById(jobId);
        if (storedJob.isPresent()) {
            Job job = storedJob.get();
            job.setActive(status);
            jobRepository.save(job);
        } else {
            throw new IllegalArgumentException("Job not found with ID: " + jobId);
        }
    }

    // @author Sumit Savaliya
    @Override
    public Job updateJob(String jobId, JobRequestDTO jobRequestDTO) {
        Job existingJob = jobRepository.findById(jobId)
                .orElseThrow(() -> new IllegalArgumentException("Job not found with ID: " + jobId));

        Job updatedJob = JobRequestDTOMapper.mapJobRequest(jobRequestDTO,existingJob);
        User interviewer = updatedJob.getInterviewer();
        userRepository.save(interviewer);
        try {
            emailService.sendInterviewerLoginCredentials(interviewer.getEmail(), "Welcome to HireX", interviewer.getEmail(), interviewer.getPassword());
        }
        catch(MessagingException exception) {
            throw new IllegalArgumentException("Unable to send email!!");
        }

        return jobRepository.save(updatedJob);
    }


    // @author Sumit Savaliya
    @Override
    public List<Job> getAllJobs() {
        return jobRepository.findAll().stream().toList();
    }

    // @author Sumit Savaliya
    @Override
    public List<Job> getAllJobs(String recruiterEmail) {
        User user = userRepository.findByEmail(recruiterEmail);

        if(user == null) {
            throw new NoSuchElementException("User not found.");
        }

        return jobRepository.findByRecruiter_UserId(user.getUserId());
    }

    // @author Sumit Savaliya
    @Override
    public List<Job> getAllJobsByInterviewer(String interviewerEmail) {
        User user = userRepository.findByEmail(interviewerEmail);

        if(user == null) {
            throw new NoSuchElementException("User not found.");
        }
        return jobRepository.findByInterviewer_UserId(user.getUserId());
    }

    // @author Sumit Savaliya
    @Override
    public Job getJob(String jobId) {
        Job job = jobRepository.findById(jobId).orElse(null);
        if (job == null) {
            throw new IllegalArgumentException("Job not found with ID: " + jobId);
        }
        return job;
    }

    // @author Sumit Savaliya
    @Override
    public void sendHiringEmail(String candidateEmail, Job job) throws MessagingException {
        emailService.sendHiringEmail(candidateEmail, "HireX: Congratulations on your offer!", job);
    }
}