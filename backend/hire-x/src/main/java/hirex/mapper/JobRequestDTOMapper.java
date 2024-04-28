package hirex.mapper;

import hirex.dto.JobRequestDTO;
import hirex.model.Job;
import hirex.model.User;

// @author Sumit Savaliya
public class JobRequestDTOMapper {

    // @author Sumit Savaliya
    public static Job mapJobRequest(JobRequestDTO jobRequestDTO, Job existingJob) {
        if (jobRequestDTO.getJobName() != null) {
            existingJob.setJobName(jobRequestDTO.getJobName());
        }
        if (jobRequestDTO.getJobDescription() != null) {
            existingJob.setJobDescription(jobRequestDTO.getJobDescription());
        }
        if(jobRequestDTO.getRequiredQualifications() != null ){
            existingJob.setRequiredQualifications(jobRequestDTO.getRequiredQualifications());
        }
        if (jobRequestDTO.getCompanyName() != null) {
            existingJob.setCompanyName(jobRequestDTO.getCompanyName());
        }
        if (jobRequestDTO.getCompanyLogo() != null) {
            existingJob.setCompanyLogo(jobRequestDTO.getCompanyLogo());
        }
        if (jobRequestDTO.getCompanyOverview() != null) {
            existingJob.setCompanyOverview(jobRequestDTO.getCompanyOverview());
        }

        if (jobRequestDTO.getJobLocation() != null) {
            existingJob.setJobLocation(jobRequestDTO.getJobLocation());
        }
        if (jobRequestDTO.getEmploymentType() != null) {
            existingJob.setEmploymentType(jobRequestDTO.getEmploymentType());
        }

        if (jobRequestDTO.getRequiredSkills() != null) {
            existingJob.setRequiredSkills(jobRequestDTO.getRequiredSkills());
        }

        if (jobRequestDTO.getCertificationsOrLicenses() != null) {
            existingJob.setCertificationsOrLicenses(jobRequestDTO.getCertificationsOrLicenses());
        }

        if (jobRequestDTO.getLanguageProficiencyRequirements() != null) {
            existingJob.setLanguageProficiencyRequirements(jobRequestDTO.getLanguageProficiencyRequirements());
        }
        if (jobRequestDTO.getHealthInsurance() != null) {
            existingJob.setHealthInsurance(jobRequestDTO.getHealthInsurance());
        }
        if (jobRequestDTO.getRetirementPlans() != null) {
            existingJob.setRetirementPlans(jobRequestDTO.getRetirementPlans());
        }
        if (jobRequestDTO.getPaidTimeOff() != null) {
            existingJob.setPaidTimeOff(jobRequestDTO.getPaidTimeOff());
        }

        if (jobRequestDTO.getApplicationDeadline() != null) {
            existingJob.setApplicationDeadline(jobRequestDTO.getApplicationDeadline());
        }

        if(jobRequestDTO.getMinSalary() != null) {
            existingJob.setMinSalary(jobRequestDTO.getMinSalary());
        }

        if(jobRequestDTO.getMaxSalary() != null) {
            existingJob.setMaxSalary(jobRequestDTO.getMaxSalary());
        }

        if(jobRequestDTO.getInterviewerFirstName() != null) {
            User interviewer = existingJob.getInterviewer();
            if(interviewer != null) interviewer.setFirstname(jobRequestDTO.getInterviewerFirstName());
        }

        if(jobRequestDTO.getInterviewerLastName() != null) {
            User interviewer = existingJob.getInterviewer();
            if(interviewer != null) interviewer.setLastname(jobRequestDTO.getInterviewerLastName());
        }

        if(jobRequestDTO.getInterviewerEmail() != null) {
            User interviewer = existingJob.getInterviewer();
            if(interviewer != null) interviewer.setEmail(jobRequestDTO.getInterviewerEmail());
        }

        if(jobRequestDTO.getCompanyImage() != null) {
            existingJob.setCompanyImage(jobRequestDTO.getCompanyImage());
        }

        return existingJob;
    }

}
