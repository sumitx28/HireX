// @author Roshni Joshi

package hirex.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import hirex.model.TestCase;

@Repository
public interface TestCaseRepository extends MongoRepository<TestCase, String> {

}
