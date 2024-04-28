package hirex.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;

@Document
@Data
public class Job {

    @Id
    private String jobId;
    private String jobName;
    private String jobDescription;
    private boolean isActive = true;
    private String requiredQualifications;
    @DBRef(lazy = false)
    private User recruiter;
    @DBRef(lazy = false)
    private User interviewer;

    private String companyName;
    private String companyLogo;
    private String companyOverview;

    private String jobLocation;
    private String employmentType;

    private String requiredSkills;

    private String certificationsOrLicenses;

    private String languageProficiencyRequirements;

    private String healthInsurance;
    private String retirementPlans;
    private String paidTimeOff;

    private String applicationDeadline;

    private String minSalary;

    private String maxSalary;

    private String companyImage;

    public boolean isActive() {
        return isActive;
    }

    public void setActive(boolean active) {
        isActive = active;
    }
}
