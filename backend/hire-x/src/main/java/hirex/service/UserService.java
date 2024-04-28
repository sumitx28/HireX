package hirex.service;

import hirex.model.Candidate;
import hirex.model.User;

public interface UserService {

    String getFirstName(String userId);
    User getUser(String userId);

}
