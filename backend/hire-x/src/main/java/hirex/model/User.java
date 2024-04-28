package hirex.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

/*
 * Creating this class just for the reference within Interview class, as it is the dependency.
 * This will be further modified by other team member.
 */
@Document
@Data
public class User {
    @Id
    private String userId;
    private String firstname;
    private String lastname;
    private String email;
    private String password;
    private String userRole;//.
}
