package hirex.dto;

import lombok.Data;
// @author Sumit Savaliya
@Data
public class JobRequestDTO {
    private String companyName;
    private String companyLogo;
    private String companyOverview;
    private String companyImage;

    private String jobLocation;
    private String employmentType;
    private String requiredSkills;
    private String certificationsOrLicenses;

    private String requiredQualifications;
    private String languageProficiencyRequirements;

    private String healthInsurance;
    private String retirementPlans;
    private String paidTimeOff;
    private String applicationDeadline;

//    private String salaryRange;
    private String minSalary;
    private String maxSalary;

    private String jobName;
    private String jobDescription;
    private String recruiterId;
    private String interviewerEmail;
    private boolean isActive;

    private String interviewerFirstName;
    private String interviewerLastName;

    public boolean getIsActive() {
        return isActive;
    }
}
