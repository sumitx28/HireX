// @author Vivek Sonani

package hirex.codeassessment.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import hirex.codeassessment.codeAssessmentDTO.CodeExecutorRequestDTO;
import hirex.codeassessment.exception.CodeExecutionException;
import hirex.codeassessment.exception.CompilationException;
import hirex.codeassessment.exception.RuntimeException;
import hirex.codeassessment.hireXDTO.CodeSubmissionRequestDTO;
import hirex.codeassessment.hireXDTO.UpdateCodeAssessmentScoreRequestDTO;
import hirex.codeassessment.hireXResponse.TestCase;
import hirex.codeassessment.util.*;
import org.apache.tomcat.util.http.fileupload.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;
import java.util.List;
import java.util.UUID;

@Service
public class CodeAssessmentServiceImpl implements CodeAssessmentService {
    @Autowired
    private APIRoutes APIRoutes;

    @Value("${FILE_STORAGE_PATH}")
    private String FILE_STORAGE_PATH;

    // @author Vivek Sonani
    // function to get testcases
    @Override
    public List<TestCase> getTestCases(String codeAssessmentId, String codeProblemId, String jwtToken) throws JsonProcessingException {
        String apiRoute = APIRoutes.getCodeProblemByCodeAssessmentIdAndCodeProblemId(codeAssessmentId, codeProblemId);
        HttpEntity<String> headers = APIRoutes.getHeaderForGet(jwtToken);

        RestTemplate restTemplate = new RestTemplate();
        Object apiOutput = restTemplate.exchange(apiRoute, HttpMethod.GET, headers, Object.class).getBody();

        ObjectMapper objectMapper = new ObjectMapper();
        String apiOutputJson = objectMapper.writeValueAsString(apiOutput);

        return JSONUtil.extractTestCases(apiOutputJson);
    }

    // @author Vivek Sonani
    // function to execute the given code
    @Override
    public int executeCode(CodeExecutorRequestDTO codeExecutorRequestDTO, List<TestCase> testCaseList) throws Exception {
        String fileExtension = "";
        String[] compilationCommand = null;
        String[] executionCommand = null;

        String uniqueFolderName = UUID.randomUUID().toString();
        Path folderPath = Paths.get(FILE_STORAGE_PATH, uniqueFolderName);
        Files.createDirectories(folderPath);

        String fileName = "";
        String codeDirectoryPath = FILE_STORAGE_PATH + uniqueFolderName + "/";

        if(codeExecutorRequestDTO.getLanguage().equalsIgnoreCase(Language.JAVA)){
            fileExtension = FileExtension.JAVA;
            fileName = Constant.ClassName + fileExtension;

            compilationCommand = Command.getJavaCompilationCommand(codeDirectoryPath, fileName);
            executionCommand = Command.getJavaExecutionCommand(codeDirectoryPath, Constant.ClassName);
        }
        else if(codeExecutorRequestDTO.getLanguage().equalsIgnoreCase(Language.PYTHON)){
            fileExtension = FileExtension.PYTHON;
            fileName = Constant.ClassName + fileExtension;

            executionCommand = Command.getPythonExecutionCommand(codeDirectoryPath, fileName);
        }
        else{
            FileUtils.deleteDirectory(folderPath.toFile());
            throw new CodeExecutionException(ResponseMessage.LanguageNotSupported);
        }

        File file = folderPath.resolve(fileName).toFile();
        Files.write(file.toPath(), codeExecutorRequestDTO.getCode().getBytes(), StandardOpenOption.CREATE);

        if(compilationCommand != null){
            StringBuilder compilationOutput = new StringBuilder();
            int compilationExitCode = Command.commandExecutor(compilationOutput, compilationCommand, null);

            if(compilationExitCode == 1){
                FileUtils.deleteDirectory(folderPath.toFile());
                throw new CompilationException(compilationOutput.toString());
            }
        }

        int passedTestCases = 0;

        for (TestCase testCase : testCaseList) {
            StringBuilder executionOutput = new StringBuilder();
            int executionExitCode = Command.commandExecutor(executionOutput, executionCommand, testCase.getInput());

            if (executionExitCode == 1) {
                FileUtils.deleteDirectory(folderPath.toFile());
                throw new RuntimeException(executionOutput.toString());
            }

            testCase.setCodeOutput(String.valueOf(executionOutput));

            boolean testCaseResult = testCase.validateTestCase(String.valueOf(executionOutput));

            if (testCaseResult) {
                passedTestCases++;
            }
        }

        FileUtils.deleteDirectory(folderPath.toFile());

        return passedTestCases;
    }

    // @author Vivek Sonani
    // function to call the api to submit the code
    @Override
    public void submitCode(CodeSubmissionRequestDTO codeSubmissionRequestDTO, String jwtToken) {
        String apiRoute = APIRoutes.submitCode();
        HttpEntity<Object> headers = APIRoutes.getHeaderWithBody(codeSubmissionRequestDTO, jwtToken);

        RestTemplate restTemplate = new RestTemplate();
        restTemplate.exchange(apiRoute, HttpMethod.POST, headers, Object.class);
    }

    // @author Vivek Sonani
    // function to update the code execution score
    @Override
    public void updateScore(UpdateCodeAssessmentScoreRequestDTO updateCodeAssessmentScoreRequestDTO, String jwtToken){
        String apiRoute = APIRoutes.updateScore();
        HttpEntity<Object> headers = APIRoutes.getHeaderWithBody(updateCodeAssessmentScoreRequestDTO, jwtToken);

        RestTemplate restTemplate = new RestTemplate();
        restTemplate.exchange(apiRoute, HttpMethod.PUT, headers, Object.class);
    }
}
