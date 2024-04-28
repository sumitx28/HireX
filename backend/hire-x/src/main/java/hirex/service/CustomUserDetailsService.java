//@author Rushikumar Patel

package hirex.service;

import hirex.dto.RegistrationRequestDTO;
import hirex.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import hirex.model.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * Service class responsible for handling user-related operations, such as user authentication and registration.
 */
@Service
public class CustomUserDetailsService implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;

    /**
     * Retrieves user details from the database based on the provided email address.
     * @param email The email address of the user.
     * @return UserDetails object containing user details.
     */
    @Override
    public UserDetails loadUserByUsername(String email) {
        User user = userRepository.findByEmail(email);
        List<String> roles = new ArrayList<>();
        roles.add(user.getUserRole());
        UserDetails userDetails =
                org.springframework.security.core.userdetails.User.builder()
                        .username(user.getEmail())
                        .password(user.getPassword())
                        .roles(roles.toArray(new String[0]))
                        .build();
        return userDetails;
    }

    /**
     * Retrieves a user from the database based on the provided email address.
     * @param email The email address of the user.
     * @return User object representing the user.
     */
    public User getUser(String email){
        return userRepository.findByEmail(email);
    }

    /**
     * Adds a new user to the database based on the provided registration request DTO.
     * @param registrationRequestDTO The DTO containing registration details.
     * @return User object representing the newly registered user.
     */
    public User addUser(RegistrationRequestDTO registrationRequestDTO){
        User user = new User();
        user.setEmail(registrationRequestDTO.getEmail());
        user.setPassword(registrationRequestDTO.getPassword());
        user.setFirstname(registrationRequestDTO.getFirstname());
        user.setLastname(registrationRequestDTO.getLastname());
        user.setUserRole(registrationRequestDTO.getRole());

        return userRepository.save(user);
    }

    /**
     * Updates the password of a user in the database.
     * @param user The user whose password is to be updated.
     * @param password The new password.
     */
    public void updateUserPassword(User user, String password){
        user.setPassword(password);
        userRepository.save(user);

        List<String> roles = new ArrayList<>();
        roles.add(user.getUserRole());
        UserDetails userDetails =
                org.springframework.security.core.userdetails.User.builder()
                        .username(user.getEmail())
                        .password(user.getPassword())
                        .roles(roles.toArray(new String[0]))
                        .build();
    }

}
