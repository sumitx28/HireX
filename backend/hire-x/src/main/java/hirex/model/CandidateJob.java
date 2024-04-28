// @author Roshni Joshi

package hirex.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
@Data
public class CandidateJob {

    @Id
    private String candidateJobId;
    @DBRef
    private User candidate;
    @DBRef
    private Job job;
    private boolean isApproved;
    private Boolean isSelected;
    private CandidateJobStatus candidateJobStatus;

    public boolean isApproved() {
        return isApproved;
    }
    public void setApproved(boolean isApproved) {
        this.isApproved = isApproved;
    }
    public Boolean isSelected() {
        return isSelected;
    }
    public void setSelected(Boolean isSelected) {
        this.isSelected = isSelected;
    }
}
