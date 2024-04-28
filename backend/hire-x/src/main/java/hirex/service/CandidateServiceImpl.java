package hirex.service;

import hirex.dto.ApplicationStatusDTO;
import hirex.enums.ApplicationStage;
import hirex.repository.CandidateJobRepository;
import hirex.repository.JobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import hirex.model.*;
import hirex.repository.UserRepository;

import java.util.List;
import java.util.Optional;

@Service
public class CandidateServiceImpl implements CandidateService {

    @Autowired
    private CandidateJobRepository candidateJobRepository;

    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private UserRepository userRepository;

    // @author Sumit Savaliya
    @Override
    public List<CandidateJob> getAllCandidates(String jobId) {
        return candidateJobRepository.findByJob_JobId(jobId);
    }

    // @author Vivek Sonani
    // function to get candidate job
    @Override
    public CandidateJob getCandidateJobByCandidateIdAndJobId(String candidateId, String jobId) {
        return candidateJobRepository.findByCandidate_UserIdAndJob_JobId(candidateId, jobId);
    }

    // @author Vivek Sonani
    // function get candidate job by candidate job id
    @Override
    public CandidateJob getCandidateJob(String candidateJobId) {
        Optional<CandidateJob> candidateJob = candidateJobRepository.findById(candidateJobId);
        return candidateJob.orElse(null);
    }

    // @author Sumit Savaliya
    @Override
    public CandidateJob updateCandidateStatus(String candidateId, String jobId, boolean status) throws Exception {
        CandidateJob candidateJob = candidateJobRepository.findByCandidate_UserIdAndJob_JobId(candidateId, jobId);
        if (candidateJob == null) {
            throw new Exception("No candidate job found for candidateId: " + candidateId + " and jobId: " + jobId);
        }

        candidateJob.setSelected(status);
        candidateJobRepository.save(candidateJob);
        return candidateJob;
    }

    // @author Sumit Savaliya
    @Override
    public CandidateJob approveCodingAssessment(String candidateId, String jobId, boolean approval) throws Exception {
        CandidateJob candidateJob = candidateJobRepository.findByCandidate_UserIdAndJob_JobId(candidateId, jobId);
        if (candidateJob == null) {
            throw new Exception("No candidate job found for candidateId: " + candidateId + " and jobId: " + jobId);
        }

        candidateJob.setApproved(approval);
        candidateJobRepository.save(candidateJob);
        return candidateJob;
    }

    // @author Nisarg Chudasama
    // Service to withdraw job application of a candidate
    @Override
    public void withdrawJobApplication(String candidateJobId) throws Exception {
        CandidateJob candidateJob = candidateJobRepository.findById(candidateJobId)
                .orElseThrow(() -> new IllegalArgumentException("CandidateJob not found"));

        candidateJob.getCandidateJobStatus().setWithdrawn(true); 
        candidateJobRepository.save(candidateJob);
    }

    // @author Vivek Sonani
    // function to update candidate job
    @Override
    public void updateCandidateJob(CandidateJob candidateJob) {
        candidateJobRepository.save(candidateJob);
    }

    // @author Nisarg Chudasama
    // Service to get application stage of a candidate
    @Override
     public ApplicationStage getApplicationStage(CandidateJob candidateJob, CandidateJobStatus candidateJobStatus) {
        if (candidateJobStatus.isWithdrawn()) {
            return ApplicationStage.WITHDRAWN;
        } else if (candidateJob.isSelected() != null && candidateJob.isSelected()) {
            return ApplicationStage.HIRED;
        } else if (candidateJob.isApproved()) {
            return ApplicationStage.APPROVED;
        } else if (candidateJobStatus.isInterviewCompleted()) {
            return ApplicationStage.INTERVIEW_COMPLETED;
        } else if (candidateJobStatus.isProjectCompleted()) {
            return ApplicationStage.PROJECT_COMPLETED;
        } else if (candidateJobStatus.isCodeCompleted()) {
            return ApplicationStage.CODE_COMPLETED;
        } else {
            return ApplicationStage.APPLIED;
        }
    }

    @Override
    public CandidateJob createCandidateJob(User user, Job job) {
        CandidateJob candidateJob = new CandidateJob();
        CandidateJobStatus candidateJobStatus = new CandidateJobStatus();
        candidateJobStatus.setCandidateGithub("");
        candidateJobStatus.setGitRepoLink("");
        candidateJobStatus.setCodeCompleted(false);
        candidateJobStatus.setProjectCompleted(false);
        candidateJobStatus.setInterviewCompleted(false);
        candidateJobStatus.setWithdrawn(false);
        candidateJob.setCandidateJobStatus(candidateJobStatus);
        candidateJob.setCandidate(user);
        candidateJob.setJob(job);
        candidateJob= candidateJobRepository.save(candidateJob);
        return candidateJob;
    }

    // @author Nisarg Chudasama
    // Service to get application status of a candidate
    public Optional<CandidateJob> getApplicationStatus(String email, String jobId) {
      
        User user = userRepository.findByEmail(email);
        if (user == null) {
           return Optional.empty();
        }

        CandidateJob candidateJob = candidateJobRepository.findByCandidate_UserIdAndJob_JobId(user.getUserId(), jobId);
        if (candidateJob == null) {
            return Optional.empty();
        }

        return Optional.of(candidateJob);
}
}