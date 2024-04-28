package hirex.service;

import hirex.dto.JobRequestDTO;
import hirex.model.CandidateJob;
import hirex.model.Job;
import jakarta.mail.MessagingException;

import java.util.List;

// @author Sumit Savaliya
public interface JobService {
    // @author Sumit Savaliya
    Job createJob(JobRequestDTO jobRequestDTO);

    // @author Sumit Savaliya
    void updateHiringStatus(String jobId, boolean status);

    // @author Sumit Savaliya
    Job updateJob(String jobId, JobRequestDTO jobRequestDTO);

    // @author Sumit Savaliya
    List<Job> getAllJobs();

    // @author Sumit Savaliya
    List<Job> getAllJobs(String email);

    // @author Sumit Savaliya
    List<Job> getAllJobsByInterviewer(String interviewerEmail);

    // @author Sumit Savaliya
    Job getJob(String jobId) throws Exception;

    // @author Sumit Savaliya
    void sendHiringEmail(String candidateEmail, Job job) throws MessagingException;
}
