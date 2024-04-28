// @author Roshni Joshi

package hirex.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import hirex.model.CodeProblem;

@Repository
public interface CodeProblemRepository extends MongoRepository<CodeProblem, String> {

}
