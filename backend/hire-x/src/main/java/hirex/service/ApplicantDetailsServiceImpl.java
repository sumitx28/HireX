// @author Nisarg Chudasama

package hirex.service;

import java.util.List;
import java.util.stream.Collectors;

import hirex.repository.CandidateJobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import hirex.model.ApplicantDetails;
import hirex.model.Job;
import hirex.model.CandidateJob;
import hirex.repository.ApplicantDetailsRepository;
import hirex.repository.JobRepository;


// Service Implementation for ApplicantDetails entity
@Service
public class ApplicantDetailsServiceImpl implements ApplicantDetailsService {

    private final ApplicantDetailsRepository applicantDetailsRepository;
    private final JobRepository jobRepository;

    @Autowired
    private CandidateJobRepository candidateJobRepository;

    @Autowired
    public ApplicantDetailsServiceImpl(ApplicantDetailsRepository applicantDetailsRepository,
                                       JobRepository jobRepository) {
        this.applicantDetailsRepository = applicantDetailsRepository;
        this.jobRepository = jobRepository;
    }

    @Override
    public List<Job> getAllJobsAppliedByEmail(String email) {
        List<ApplicantDetails> applicantDetailsList = applicantDetailsRepository.findByEmail(email);
        
        List<CandidateJob> candidateJobs = applicantDetailsList.stream()
            .map(ApplicantDetails::getCandidateJob)
            .collect(Collectors.toList());
        
        List<String> jobIds = candidateJobs.stream()
            .map(candidateJob -> candidateJob.getJob().getJobId())
            .collect(Collectors.toList());

        return jobRepository.findAllById(jobIds);
    }

    // @author Sumit Savaliya
    @Override
    public ApplicantDetails getApplicantDetails(String candidateJobId) {
        CandidateJob candidateJob = candidateJobRepository.findById(candidateJobId).get();
        return applicantDetailsRepository.findByCandidateJob(candidateJob);
    }
}