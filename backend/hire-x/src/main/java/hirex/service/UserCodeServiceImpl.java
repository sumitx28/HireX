/**
 * Implementation of the UserCodeService interface.
 * Provides methods for adding, retrieving, and updating user codes in the database.
 * Generates a unique code for each user code entry.
 *
 * @author Rushikumar Patel
 */

package hirex.service;

import hirex.model.User;
import hirex.model.UserCode;
import hirex.repository.UserCodeRepository;
import hirex.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class UserCodeServiceImpl implements UserCodeService{
    @Autowired
    private UserCodeRepository userCodeRepository;

    /**
     * Adds a new user code entry to the database.
     */
    @Override
    public UserCode add(User user) {
        UserCode userCode = new UserCode();
        userCode.setUser(user);
        userCode.setCode(UUID.randomUUID().toString());
        userCode.setIsActive(true);

        userCodeRepository.save(userCode);

        return userCode;
    }
    /**
     * Retrieves a user code entry from the database based on the provided code.
     */
    @Override
    public UserCode getUserCodeByCode(String code) {
        return userCodeRepository.findByCode(code);
    }
    /**
     * Updates the isActive flag of a user code entry to false.
     */
    @Override
    public void updateIsActive(UserCode userCode) {
        userCode.setIsActive(false);
        userCodeRepository.save(userCode);
    }

}
