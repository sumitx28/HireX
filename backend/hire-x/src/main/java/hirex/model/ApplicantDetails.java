// @author Nisarg Chudasama

package hirex.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

// Model for ApplicantDetails entity
@Document(collection = "ApplicantDetails")
public class ApplicantDetails {

    @Id
    private String id;

    @DBRef
    private CandidateJob candidateJob;

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
    private String references;
    private String resumeLink;
    private String coverLetterLink;
    private String workEligibility;

    

    public ApplicantDetails() {
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public CandidateJob getCandidateJob() {
        return candidateJob;
    }

    public void setCandidateJob(CandidateJob candidateJob) {
        this.candidateJob = candidateJob;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getWorkExperience() {
        return workExperience;
    }

    public void setWorkExperience(String workExperience) {
        this.workExperience = workExperience;
    }

    public String getJobTitle() {
        return jobTitle;
    }

    public void setJobTitle(String jobTitle) {
        this.jobTitle = jobTitle;
    }

    public String getAchievements() {
        return achievements;
    }

    public void setAchievements(String achievements) {
        this.achievements = achievements;
    }

    public String getEducation() {
        return education;
    }

    public void setEducation(String education) {
        this.education = education;
    }

    public String getNameOfInstitution() {
        return nameOfInstitution;
    }

    public void setNameOfInstitution(String nameOfInstitution) {
        this.nameOfInstitution = nameOfInstitution;
    }

    public String getGraduationYear() {
        return graduationYear;
    }

    public void setGraduationYear(String graduationYear) {
        this.graduationYear = graduationYear;
    }

    public String getRelevantSkills() {
        return relevantSkills;
    }

    public void setRelevantSkills(String relevantSkills) {
        this.relevantSkills = relevantSkills;
    }

    public String getResumeLink() {
        return resumeLink;
    }

    public void setResumeLink(String resumeLink) {
        this.resumeLink = resumeLink;
    }

    public String getCoverLetterLink() {
        return coverLetterLink;
    }

    public void setCoverLetterLink(String coverLetterLink) {
        this.coverLetterLink = coverLetterLink;
    }

    public String getReferences() {
        return references;
    }

    public void setReferences(String references) {
        this.references = references;
    }

    public String getWorkEligibility() {
        return workEligibility;
    }

    public void setWorkEligibility(String workEligibility) {
        this.workEligibility = workEligibility;
    }


    @Override
    public String toString() {
        return "ApplicantDetails{" +
                "id='" + id + '\'' +
                ", name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", address='" + address + '\'' +
                ", workExperience='" + workExperience + '\'' +
                ", jobTitle='" + jobTitle + '\'' +
                ", achievements='" + achievements + '\'' +
                ", education='" + education + '\'' +
                ", nameOfInstitution='" + nameOfInstitution + '\'' +
                ", graduationYear='" + graduationYear + '\'' +
                ", relevantSkills='" + relevantSkills + '\'' +
                ", resumeLink='" + resumeLink + '\'' +
                ", coverLetterLink='" + coverLetterLink + '\'' +
                ", references='" + references + '\'' +
                ", workEligibility='" + workEligibility + '\'' +
                "}";
    }
}
