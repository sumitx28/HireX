package hirex.controller;

import hirex.dto.ApplicationStatusDTO;
import hirex.dto.CandidateStatusUpdateDTO;
import hirex.dto.JobRequestDTO;
import hirex.dto.QuitProjectEvaluationRequestDTO;
import hirex.dto.UpdateGithubUsernameRequestDTO;
import hirex.enums.ApplicationStage;
import hirex.model.CandidateJob;
import hirex.model.Job;
import hirex.response.*;
import hirex.service.CandidateService;
import hirex.service.JobService;
import hirex.util.Constants;
import hirex.util.ResponseMessage;
import jakarta.mail.MessagingException;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("${cross.origin.allowed-origins}")
public class JobController {

    @Autowired
    private JobService jobService;

    @Autowired
    private CandidateService candidateService;

    // @author Sumit Savaliya
    @GetMapping("/jobs")
    public ResponseEntity<List<Job>> getAllJobs() {
        List<Job> allJobs = jobService.getAllJobs();
        return ResponseEntity.ok(allJobs);
    }

    // @author Sumit Savaliya
    @GetMapping("/jobs/all-jobs/{recruiterEmail}")
    public ResponseEntity<List<Job>> getAllJobsByRecruiter(@PathVariable String recruiterEmail) {
        List<Job> allJobs = jobService.getAllJobs(recruiterEmail);
        return ResponseEntity.ok(allJobs);
    }

    // @author Sumit Savaliya
    @GetMapping("/jobs/all-jobs/interviewer/{interviewerEmail}")
    public ResponseEntity<List<Job>> getAllJobsByInterviewer(@PathVariable String interviewerEmail) {
        List<Job> allJobs = jobService.getAllJobsByInterviewer(interviewerEmail);
        return ResponseEntity.ok(allJobs);
    }

    // @author Nisarg Chudasama
    //Endpoint to withdraw job application
    @PutMapping("/withdraw/{candidateJobId}")
    public ResponseEntity<?> withdrawJobApplication(@PathVariable String candidateJobId) {
        try {
            candidateService.withdrawJobApplication(candidateJobId);
            return ResponseEntity.ok("application withdrawn"); 
        } catch (Exception e) {
           
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    // @author Sumit Savaliya
    @PutMapping("/job/update-candidate-status")
    public ResponseEntity<CandidateJobUpdateResponse> updateCandidateStatus(@RequestBody CandidateStatusUpdateDTO candidateStatusUpdateDTO) {
        CandidateJobUpdateResponse candidateJobUpdateResponse = new CandidateJobUpdateResponse();
        try {
            CandidateJob candidateJob = candidateService.updateCandidateStatus(candidateStatusUpdateDTO.getCandidateId(), candidateStatusUpdateDTO.getJobId(), candidateStatusUpdateDTO.isHired());
            candidateJobUpdateResponse.setCandidateJob(candidateJob);
            candidateJobUpdateResponse.setHired(candidateJob.isSelected() != null && candidateJob.isSelected());
            candidateJobUpdateResponse.setSuccess(true);
            candidateJobUpdateResponse.setMessage(Constants.SUCCESS);
            return ResponseEntity.ok(candidateJobUpdateResponse);
        } catch (Exception e) {
            candidateJobUpdateResponse.setSuccess(false);
            candidateJobUpdateResponse.setMessage(e.getMessage());
            return new ResponseEntity<>(candidateJobUpdateResponse, HttpStatus.NOT_FOUND);
        }
    }

    // @author Sumit Savaliya
    @PostMapping("/job/hire/{candidateEmail}")
    public ResponseEntity<String> sendHiringEmail(@PathVariable String candidateEmail, @RequestBody Job job) throws MessagingException {
        jobService.sendHiringEmail(candidateEmail, job);
        return ResponseEntity.ok("success");
    }

    // @author Sumit Savaliya
    @PutMapping("/job/approve-coding-assessment")
    public ResponseEntity<CandidateJobUpdateResponse> approveCodingAssessment(@RequestBody CandidateStatusUpdateDTO candidateStatusUpdateDTO) {
        CandidateJobUpdateResponse candidateJobUpdateResponse = new CandidateJobUpdateResponse();
        try {
            CandidateJob candidateJob = candidateService.approveCodingAssessment(candidateStatusUpdateDTO.getCandidateId(), candidateStatusUpdateDTO.getJobId(), candidateStatusUpdateDTO.isApproved());
            candidateJobUpdateResponse.setCandidateJob(candidateJob);
            candidateJobUpdateResponse.setApproved(candidateJob.isApproved());
            candidateJobUpdateResponse.setSuccess(true);
            candidateJobUpdateResponse.setMessage(Constants.SUCCESS);
            return ResponseEntity.ok(candidateJobUpdateResponse);
        } catch (Exception e) {
            candidateJobUpdateResponse.setSuccess(false);
            candidateJobUpdateResponse.setMessage(e.getMessage());
            return new ResponseEntity<>(candidateJobUpdateResponse, HttpStatus.NOT_FOUND);
        }
    }

    // @author Sumit Savaliya
    @GetMapping("/job/{jobId}")
    public ResponseEntity<JobResponseDTO> getJob(@PathVariable String jobId) {
        JobResponseDTO jobResponseDTO = new JobResponseDTO();
        try {
            Job job = jobService.getJob(jobId);
            jobResponseDTO.setJob(job);
            jobResponseDTO.setMessage(Constants.SUCCESS);
            jobResponseDTO.setSuccess(true);
            return ResponseEntity.ok(jobResponseDTO);
        } catch (Exception e) {
            jobResponseDTO.setSuccess(false);
            jobResponseDTO.setMessage(Constants.NOT_FOUND);
            return new ResponseEntity<>(jobResponseDTO, HttpStatus.NOT_FOUND);
        }
    }

    // @author Sumit Savaliya
    @GetMapping("/job/all-candidates/{jobId}")
    public ResponseEntity<CandidateJobListResponse> getAllCandidates(@PathVariable String jobId) {
        CandidateJobListResponse candidateJobResponse = new CandidateJobListResponse();
        List<CandidateJob> allCandidates = candidateService.getAllCandidates(jobId);

        candidateJobResponse.setSuccess(true);
        candidateJobResponse.setCandidates(allCandidates);
        candidateJobResponse.setMessage(Constants.SUCCESS);

        return ResponseEntity.ok(candidateJobResponse);
    }

    // @author Vivek Sonani
    // api to get candidate job
    @GetMapping("/candidateJob/{candidateId}/{jobId}")
    public ResponseEntity<CandidateJobResponse> getCandidateJobByCandidateIdAndJobId(@PathVariable String candidateId, @PathVariable String jobId){
        CandidateJobResponse candidateJobResponse = new CandidateJobResponse();

        CandidateJob candidateJob = candidateService.getCandidateJobByCandidateIdAndJobId(candidateId, jobId);

        if(candidateJob == null){
            candidateJobResponse.setMessage(Constants.NOT_FOUND);
            candidateJobResponse.setSuccess(false);
            return new ResponseEntity<>(candidateJobResponse, HttpStatus.NOT_FOUND);
        }

        candidateJobResponse.setMessage(Constants.SUCCESS);
        candidateJobResponse.setSuccess(true);
        candidateJobResponse.setCandidateJob(candidateJob);
        return new ResponseEntity<>(candidateJobResponse, HttpStatus.OK);
    }

    // @author Vivek Sonani
    // api to get candidate job
    @GetMapping("/candidateJob/{candidateJobId}")
    public ResponseEntity<CandidateJobResponse> getCandidateJob(@PathVariable String candidateJobId){
        CandidateJobResponse candidateJobResponse = new CandidateJobResponse();

        CandidateJob candidateJob = candidateService.getCandidateJob(candidateJobId);

        if(candidateJob == null){
            candidateJobResponse.setMessage(Constants.NOT_FOUND);
            candidateJobResponse.setSuccess(false);
            return new ResponseEntity<>(candidateJobResponse, HttpStatus.NOT_FOUND);
        }

        candidateJobResponse.setMessage(Constants.SUCCESS);
        candidateJobResponse.setSuccess(true);
        candidateJobResponse.setCandidateJob(candidateJob);
        return new ResponseEntity<>(candidateJobResponse, HttpStatus.OK);
    }

    // @author Sumit Savaliya
    @PostMapping("/jobs/new-job-post")
    public ResponseEntity<JobResponseDTO> createJob(@RequestBody JobRequestDTO jobRequestDTO) {
        JobResponseDTO jobResponseDTO = new JobResponseDTO();
        try {
            Job job = jobService.createJob(jobRequestDTO);
            jobResponseDTO.setJob(job);
            jobResponseDTO.setMessage(Constants.SUCCESS);
            jobResponseDTO.setSuccess(true);
            return new ResponseEntity<>(jobResponseDTO, HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            jobResponseDTO.setSuccess(false);
            jobResponseDTO.setMessage(e.getMessage());
            return new ResponseEntity<>(jobResponseDTO, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // @author Sumit Savaliya
    @PutMapping("/jobs/update-hiring-status/{jobId}")
    public ResponseEntity<JobResponseDTO> updateHiringStatus(@PathVariable String jobId, @RequestBody JobRequestDTO jobRequestDTO) {
        JobResponseDTO jobResponseDTO = new JobResponseDTO();
        try {
            jobService.updateHiringStatus(jobId, jobRequestDTO.getIsActive());
            jobResponseDTO.setMessage(Constants.SUCCESS);
            jobResponseDTO.setSuccess(true);
            if (jobRequestDTO.getIsActive()) {
                jobResponseDTO.setMessage("Hiring Activated for JobID: " + jobId);
            } else {
                jobResponseDTO.setMessage("Hiring Deactivated for JobID: " + jobId);
            }
            return new ResponseEntity<>(jobResponseDTO, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            jobResponseDTO.setSuccess(false);
            jobResponseDTO.setMessage(e.getMessage());
            return new ResponseEntity<>(jobResponseDTO, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // @author Sumit Savaliya
    @PutMapping("/jobs/update-job/{jobId}")
    public ResponseEntity<JobResponseDTO> updateJobPost(@PathVariable String jobId, @RequestBody JobRequestDTO jobRequestDTO) {
        JobResponseDTO jobResponseDTO = new JobResponseDTO();
        jobResponseDTO.setSuccess(false);
        try {
            Job updatedJob = jobService.updateJob(jobId, jobRequestDTO);
            jobResponseDTO.setMessage(Constants.SUCCESS);
            jobResponseDTO.setSuccess(true);
            jobResponseDTO.setJob(updatedJob);
            return ResponseEntity.ok(jobResponseDTO);
        } catch (IllegalArgumentException e) {
            jobResponseDTO.setMessage(e.getMessage());
            return new ResponseEntity<>(jobResponseDTO, HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            jobResponseDTO.setMessage(e.getMessage());
            return new ResponseEntity<>(jobResponseDTO, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // @author Vivek Sonani
    // api to update github username
    @PutMapping("/updateGithubUsername")
    public ResponseEntity<CandidateJobResponse> updateGithubUsername(@RequestBody UpdateGithubUsernameRequestDTO updateGithubUsernameRequestDTO){
        CandidateJobResponse candidateJobResponse = new CandidateJobResponse();

        CandidateJob candidateJob = candidateService.getCandidateJob(updateGithubUsernameRequestDTO.getCandidateJobId());

        if(candidateJob == null){
            candidateJobResponse.setMessage(ResponseMessage.INVALID_CANDIDATE_JOB_ID);
            candidateJobResponse.setSuccess(false);

            return new ResponseEntity<>(candidateJobResponse, HttpStatus.BAD_REQUEST);
        }

        candidateJob.getCandidateJobStatus().setCandidateGithub(updateGithubUsernameRequestDTO.getUsername());

        candidateService.updateCandidateJob(candidateJob);

        candidateJobResponse.setMessage(Constants.SUCCESS);
        candidateJobResponse.setSuccess(true);
        candidateJobResponse.setCandidateJob(candidateJob);
        return new ResponseEntity<>(candidateJobResponse, HttpStatus.OK);
    }

    // @author Nisarg Chudasama
    //Endpoint to get application status
    @GetMapping("/status/{email}/{jobId}")
    public ResponseEntity<?> getApplicationStatus(@PathVariable String email, @PathVariable String jobId) {
        return candidateService.getApplicationStatus(email, jobId)
                .map(candidateJob -> ResponseEntity.ok(candidateJob))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }


    // @author Vivek Sonani
    // api to quit project evaluation
    @PutMapping("quitProjectEvaluation")
    public ResponseEntity<APIResponse> quitProjectEvaluation(@RequestBody QuitProjectEvaluationRequestDTO quitProjectEvaluationRequestDTO){
        APIResponse apiResponse = new APIResponse();

        CandidateJob candidateJob = candidateService.getCandidateJob(quitProjectEvaluationRequestDTO.getCandidateJobId());
        if(candidateJob == null){
            apiResponse.setMessage(Constants.NOT_FOUND);
            apiResponse.setSuccess(false);
            return new ResponseEntity<>(apiResponse, HttpStatus.BAD_REQUEST);
        }

        candidateJob.getCandidateJobStatus().setProjectCompleted(true);
        candidateService.updateCandidateJob(candidateJob);

        apiResponse.setMessage(Constants.SUCCESS);
        apiResponse.setSuccess(true);
        return new ResponseEntity<>(apiResponse, HttpStatus.OK);
    }
}
