// @author Nisarg Chudasama

package hirex.dto;

import lombok.Data;

@Data
public class ApplicantDetailsRequestDTO {
    // Request DTO for ApplicantDetails entity
    private String candidateId;
    private String jobId;
    private String name;
    private String email;
    private String address;
    private String workExperience;
    private String jobTitle;
    private String achievements;
    private String education;
    private String nameOfInstitution;
    private String graduationYear;
    private String relevantSkills;
    private String resumeLink;
    private String coverLetterLink;
    private String references;
    private String workEligibility;

}
