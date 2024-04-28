// @author Nisarg Chudasama

package hirex.controller;


import hirex.model.ApplicantDetails;
import hirex.model.User;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import hirex.service.*;
import hirex.model.Job;
import hirex.model.Candidate;
import hirex.dto.ApplicantDetailsRequestDTO;
import hirex.model.CandidateJob;


@RestController
@CrossOrigin("${cross.origin.allowed-origins}")
public class ApplicantDetailsController {

    @Autowired
    private JobApplicationService jobApplicationService;

    @Autowired
    private UserService userService;

    @Autowired
    private CandidateService candidateService;

    @Autowired
    private JobService jobService;

    @Autowired
    private ApplicantDetailsService applicantDetailsService;

    // Endpoint to submit a job application
    @PostMapping("/applicant-details")
    public ResponseEntity<ApplicantDetails> submitApplication(@RequestBody ApplicantDetailsRequestDTO applicantDetailsRequestDTO) {
    
    
    try {
        // Retrieve user, job, and create candidate job
        User user = userService.getUser(applicantDetailsRequestDTO.getCandidateId());
        Job job = jobService.getJob(applicantDetailsRequestDTO.getJobId());
        CandidateJob candidateJob = candidateService.createCandidateJob(user, job);

        // Map request DTO to ApplicantDetails entity
        ApplicantDetails applicantDetails = new ApplicantDetails();
        applicantDetails.setCandidateJob(candidateJob);
        applicantDetails.setName(applicantDetailsRequestDTO.getName());
        applicantDetails.setEmail(applicantDetailsRequestDTO.getEmail());
        applicantDetails.setAddress(applicantDetailsRequestDTO.getAddress());
        applicantDetails.setWorkExperience(applicantDetailsRequestDTO.getWorkExperience());
        applicantDetails.setJobTitle(applicantDetailsRequestDTO.getJobTitle());
        applicantDetails.setAchievements(applicantDetailsRequestDTO.getAchievements());
        applicantDetails.setEducation(applicantDetailsRequestDTO.getEducation());
        applicantDetails.setNameOfInstitution(applicantDetailsRequestDTO.getNameOfInstitution());
        applicantDetails.setGraduationYear(applicantDetailsRequestDTO.getGraduationYear());
        applicantDetails.setRelevantSkills(applicantDetailsRequestDTO.getRelevantSkills());
        applicantDetails.setResumeLink(applicantDetailsRequestDTO.getResumeLink());
        applicantDetails.setCoverLetterLink(applicantDetailsRequestDTO.getCoverLetterLink());
        applicantDetails.setReferences(applicantDetailsRequestDTO.getReferences());
        applicantDetails.setWorkEligibility(applicantDetailsRequestDTO.getWorkEligibility());
        
         // Submit application and return saved details
        ApplicantDetails savedDetails = jobApplicationService.submitApplication(applicantDetails);
        return ResponseEntity.ok(savedDetails);
    } catch (Exception e) {
        e.printStackTrace();
        return ResponseEntity.internalServerError().build();
    }
    
   
        
    }

    // Endpoint to link a candidate job to an application
    @PutMapping("/applicant-details/link-job/{applicantDetailsId}/{candidateJobId}")
    public ResponseEntity<ApplicantDetails> linkCandidateJobToApplication(
            @PathVariable String applicantDetailsId, 
            @PathVariable String candidateJobId) {
        
        ApplicantDetails updatedApplicantDetails = jobApplicationService.linkCandidateJobToApplication(applicantDetailsId, candidateJobId);
        return ResponseEntity.ok(updatedApplicantDetails);
    }

    // Endpoint to retrieve applied jobs by email
    @GetMapping("/applied-jobs/{email}")
    public ResponseEntity<List<Job>> getAppliedJobsByEmail(@PathVariable String email) {
        List<Job> appliedJobs = applicantDetailsService.getAllJobsAppliedByEmail(email);

        if (appliedJobs.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(appliedJobs);
    }

    // @author Sumit Savaliya
    @GetMapping("/applicant-details/{candidateJobId}")
    public ResponseEntity<ApplicantDetails> getApplicantDetails(@PathVariable String candidateJobId) {
        ApplicantDetails applicantDetails = applicantDetailsService.getApplicantDetails(candidateJobId);
        return ResponseEntity.ok(applicantDetails);
    }
    

}
