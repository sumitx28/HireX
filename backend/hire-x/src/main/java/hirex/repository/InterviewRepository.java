// @author Roshni Joshi

package hirex.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import hirex.model.Interview;

@Repository
public interface InterviewRepository extends MongoRepository<Interview, String> {

	List<Interview> findByCandidate_UserId(final String candidateId);
	
	List<Interview> findByInterviewer_UserId(final String interviewerId);
}
