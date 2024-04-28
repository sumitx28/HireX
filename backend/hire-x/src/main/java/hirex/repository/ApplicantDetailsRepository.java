// @author Nisarg Chudasama

package hirex.repository;

import java.util.List;

import hirex.model.CandidateJob;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import hirex.model.ApplicantDetails;

// Repository for ApplicantDetails entity
@Repository
public interface ApplicantDetailsRepository extends MongoRepository<ApplicantDetails, String> {
     List<ApplicantDetails> findByEmail(String email);

     // @author Sumit Savaliya
     ApplicantDetails findByCandidateJob(CandidateJob candidateJob);
}
