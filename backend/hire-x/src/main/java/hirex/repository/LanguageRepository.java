// @author Roshni Joshi

package hirex.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import hirex.model.Language;

@Repository
public interface LanguageRepository extends MongoRepository<Language, String> {

}
