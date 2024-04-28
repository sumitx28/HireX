// @author Vivek Sonani

package hirex.codeassessment.util;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import hirex.codeassessment.hireXResponse.TestCase;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class JSONUtil {
    // @author Vivek Sonani
    public static List<TestCase> extractTestCases(String apiOutput) {
        List<TestCase> testCases = new ArrayList<>();

        try {
            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode jsonNode = objectMapper.readTree(apiOutput);

            if (jsonNode.has("testCases")) {
                JsonNode testCasesNode = jsonNode.get("testCases");

                for (JsonNode testCaseNode : testCasesNode) {
                    String testCaseId = testCaseNode.get("testCaseId").asText();
                    String input = testCaseNode.get("input").asText();
                    String output = testCaseNode.get("output").asText();

                    TestCase testCase = new TestCase(testCaseId, input, output);
                    testCases.add(testCase);
                }
            }
        } catch (IOException e) {
            System.out.println(e.getMessage());
        }

        return testCases;
    }

}
