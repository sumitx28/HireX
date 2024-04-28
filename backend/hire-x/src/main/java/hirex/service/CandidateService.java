package hirex.service;

import hirex.dto.ApplicationStatusDTO;
import hirex.enums.ApplicationStage;
import hirex.model.CandidateJob;
import hirex.model.CandidateJobStatus;
import hirex.model.Candidate;
import hirex.model.Job;

import java.util.List;
import java.util.Optional;
import hirex.model.User;

public interface CandidateService {
    List<CandidateJob> getAllCandidates(String jobId);

    CandidateJob getCandidateJobByCandidateIdAndJobId(final String candidateId, final String jobId);

    CandidateJob getCandidateJob(final String candidateJobId);
    // @author Sumit Savaliya
    CandidateJob updateCandidateStatus(String candidateId, String jobId, boolean status) throws Exception;

    // @author Sumit Savaliya
    CandidateJob approveCodingAssessment(String candidateId, String jobId, boolean approval) throws Exception;

    // @author Nisarg Chudasama
    // Withdraw job application of a candidate
    void withdrawJobApplication(String candidateJobId) throws Exception;

    void updateCandidateJob(CandidateJob candidateJob);

    // @author Nisarg Chudasama
    // Get application statge of a candidate
    ApplicationStage getApplicationStage(CandidateJob candidateJob, CandidateJobStatus candidateJobStatus);

    CandidateJob createCandidateJob(User user, Job job);

    // @author Nisarg Chudasama
    // Get all the applications of a candidate
    Optional<CandidateJob> getApplicationStatus(String email, String JobId);
}

