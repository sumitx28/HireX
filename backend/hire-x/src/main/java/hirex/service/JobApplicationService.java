// @author Nisarg Chudasama

package hirex.service;

import hirex.model.ApplicantDetails;

public interface JobApplicationService {
    ApplicantDetails submitApplication(ApplicantDetails applicantDetails);
    ApplicantDetails linkCandidateJobToApplication(String applicantDetailsId, String candidateJobId);
}