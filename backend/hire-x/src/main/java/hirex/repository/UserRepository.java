package hirex.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import hirex.model.User;

@Repository
public interface UserRepository extends MongoRepository<User, String> {
    //@author Rushikumar Patel
    User findByEmail(String email);

    User findByUserId(String userId);

}
