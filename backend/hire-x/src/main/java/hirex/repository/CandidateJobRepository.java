package hirex.repository;

import hirex.model.CandidateJob;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CandidateJobRepository extends MongoRepository<CandidateJob, String> {
    List<CandidateJob> findByJob_JobId(final String jobId);

    CandidateJob findByCandidate_UserIdAndJob_JobId(final String userId, final String jobId);
}
