//@author Rushikumar Patel
//Interface for user code service

package hirex.service;

import hirex.model.User;
import hirex.model.UserCode;

public interface UserCodeService {
    UserCode add(final User user);

    UserCode getUserCodeByCode(final String code);

    void updateIsActive(UserCode userCode);

}
