// @author Vivek Sonani

package hirex.codeassessment.util;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Component;

@Component
public class APIRoutes {
    @Value("${REST_API_URL}")
    private String REST_API_URL;

    // @author Vivek Sonani
    public String getCodeProblemByCodeAssessmentIdAndCodeProblemId(String codeAssessmentId, String codeProblemId){
        return REST_API_URL + "/getCodeProblem/" + codeAssessmentId + "/" + codeProblemId;
    }

    // @author Vivek Sonani
    public String submitCode(){
        return REST_API_URL + "/submitCode";
    }

    // @author Vivek Sonani
    public String updateScore(){
        return REST_API_URL + "/updateScore";
    }

    // @author Vivek Sonani
    public HttpEntity<String> getHeaderForGet(String jwtToken){
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + jwtToken);

        return new HttpEntity<>(headers);
    }

    // @author Vivek Sonani
    public HttpEntity<Object> getHeaderWithBody(Object body, String jwtToken){
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + jwtToken);

        return new HttpEntity<>(body, headers);
    }
}
