// @author Nisarg Chudasama

package hirex.dto;

// DTO for ApplicationStatus entity
public class ApplicationStatusDTO {

        private boolean codeCompleted;
        private boolean projectCompleted;
        private boolean interviewCompleted;
        private boolean withdrawn;
    
        public ApplicationStatusDTO(boolean codeCompleted, boolean projectCompleted, boolean interviewCompleted, boolean withdrawn) {
            this.codeCompleted = codeCompleted;
            this.projectCompleted = projectCompleted;
            this.interviewCompleted = interviewCompleted;
            this.withdrawn = withdrawn;
        }
    
        public boolean isCodeCompleted() {
            return codeCompleted;
        }

        public void setCodeCompleted(boolean codeCompleted) {
            this.codeCompleted = codeCompleted;
        }

        public boolean isProjectCompleted() {
            return projectCompleted;
        }

        public void setProjectCompleted(boolean projectCompleted) {
            this.projectCompleted = projectCompleted;
        }

        public boolean isInterviewCompleted() {
            return interviewCompleted;
        }

        public void setInterviewCompleted(boolean interviewCompleted) {
            this.interviewCompleted = interviewCompleted;
        }

        public boolean isWithdrawn() {
            return withdrawn;
        }

        public void setWithdrawn(boolean withdrawn) {
            this.withdrawn = withdrawn;
        }

    }
    

