package hirex.service;

import hirex.model.CodeProblem;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CodeProblemServiceImpl implements CodeProblemService{
    // @author Vivek Sonani
    // function to get code problem
    @Override
    public CodeProblem filterById(String codeProblemId, List<CodeProblem> codeProblemList) {
        Optional<CodeProblem> selectedCodeProblem = codeProblemList.stream()
                .filter(codeProblem -> codeProblem.getCodeProblemId().equals(codeProblemId))
                .findFirst();

        return selectedCodeProblem.orElse(null);
    }
}
