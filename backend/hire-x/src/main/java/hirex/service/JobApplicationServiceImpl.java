// @author Nisarg Chudasama

package hirex.service;

import hirex.model.ApplicantDetails;
import hirex.model.CandidateJob;
import hirex.repository.CandidateJobRepository;
import hirex.repository.ApplicantDetailsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class JobApplicationServiceImpl implements JobApplicationService {


    
    private final ApplicantDetailsRepository applicantDetailsRepository;
    private final CandidateJobRepository candidateJobRepository;

    @Autowired
    public JobApplicationServiceImpl(ApplicantDetailsRepository applicantDetailsRepository, CandidateJobRepository candidateJobRepository) {
        this.applicantDetailsRepository = applicantDetailsRepository;
        this.candidateJobRepository = candidateJobRepository;
    }

    @Override
    public ApplicantDetails submitApplication(ApplicantDetails applicantDetails) {
        return applicantDetailsRepository.save(applicantDetails);
    }

    @Override
    public ApplicantDetails linkCandidateJobToApplication(String applicantDetailsId, String candidateJobId) {
        ApplicantDetails applicant = applicantDetailsRepository.findById(applicantDetailsId)
            .orElseThrow(() -> new IllegalArgumentException("Invalid applicantDetails ID"));
        CandidateJob candidateJob = candidateJobRepository.findById(candidateJobId)
            .orElseThrow(() -> new IllegalArgumentException("Invalid candidateJob ID"));
        
        applicant.setCandidateJob(candidateJob);
        return applicantDetailsRepository.save(applicant);
    }

    
}
