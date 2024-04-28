//@author Rushikumar Patel

package hirex.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;

@Data
public class UserCode {
    @Id
    private String userCodeId;
    @DBRef
    private User user;

    private String code;

    private Boolean isActive;

}
