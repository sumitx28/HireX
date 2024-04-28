// @author Roshni Joshi

package hirex.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import hirex.model.Job;

@Repository
public interface JobRepository extends MongoRepository<Job, String> {

	@Query("{ 'interviewer.userId' : ?0, 'isActive' : true }")
    List<Job> findByInterviewer_UserId(final String userId);

    // @author Sumit Savaliya
    List<Job> findByRecruiter_UserId(final String recruiterId);

}
