package hirex.service;

import hirex.model.TestCase;
import hirex.repository.TestCaseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class TestCaseServiceImpl implements TestCaseService{
    @Autowired
    private TestCaseRepository testCaseRepository;

    // @author Vivek Sonani
    // function to get test case
    @Override
    public TestCase getById(String testCaseId) {
        Optional<TestCase> testCase = testCaseRepository.findById(testCaseId);

        return testCase.orElse(null);
    }
}
