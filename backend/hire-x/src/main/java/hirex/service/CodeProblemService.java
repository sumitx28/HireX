package hirex.service;

import hirex.model.CodeProblem;

import java.util.List;

public interface CodeProblemService {
    CodeProblem filterById(final String codeProblemId, final List<CodeProblem> codeProblemList);
}
