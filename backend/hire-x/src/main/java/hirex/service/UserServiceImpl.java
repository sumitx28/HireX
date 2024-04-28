package hirex.service;

import hirex.model.Candidate;
import hirex.model.User;
import hirex.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public String getFirstName(String userId) {
        User user = userRepository.findByUserId(userId);
        if (user == null) {
            throw new IllegalArgumentException("User not found");
        }
        return user.getFirstname();
    }
    
    @Override
    public User getUser(String userId) {
        Optional<User> user = userRepository.findById(userId);
        if (!user.isPresent()) {
            throw new IllegalArgumentException("User not found");
        }
//        Candidate candidate = new Candidate();
//        candidate.setUserId(user.get().getUserId());
//        candidate.setFirstname(user.get().getFirstname());
//        candidate.setLastname(user.get().getLastname());
//        candidate.setEmail(user.get().getEmail());
//        candidate.setPassword(user.get().getPassword());
//        candidate.setUserRole(user.get().getUserRole());
        return user.get();
    }

    
}
