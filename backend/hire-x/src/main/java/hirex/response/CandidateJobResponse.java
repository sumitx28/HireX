// @author Nisarg Chudasama

package hirex.response;

import hirex.enums.ApplicationStage;
import hirex.model.CandidateJob;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = false)
public class CandidateJobResponse extends APIResponse{
    private CandidateJob candidateJob;
    private boolean isHired;
    private ApplicationStage stage;
    private boolean isSuccess;
    private String message;

    public void setCandidateJob(CandidateJob candidateJob) {
        this.candidateJob = candidateJob;
    }

    public void setHired(boolean hired) {
        isHired = hired;
    }

    public void setStage(ApplicationStage stage) {
        this.stage = stage;
    }

    public void setSuccess(boolean success) {
        isSuccess = success;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public CandidateJob getCandidateJob() {
        return candidateJob;
    }

    public boolean isHired() {
        return isHired;
    }

    public ApplicationStage getStage() {
        return stage;
    }

    public boolean isSuccess() {
        return isSuccess;
    }

    public String getMessage() {
        return message;
    }

    public CandidateJobResponse() {
    }

}
