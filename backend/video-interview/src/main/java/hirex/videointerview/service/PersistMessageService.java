// @author Raj Patel

package hirex.videointerview.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import hirex.videointerview.exceptions.ChatServerDownException;
import hirex.videointerview.requests.ChatPayload;
import hirex.videointerview.utils.Constants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class PersistMessageService {

    @Value("${HireX.url}")
    private String hirexUrl;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private RestTemplate restTemplate;

    public void persistMessage(String payload) throws JsonProcessingException {
        if (!payload.contains(Constants.SENT_AT)) {
            return;
        }

        String jwtToken = getJwtToken(payload);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Authorization", "Bearer " + jwtToken);
        HttpEntity<String> requestEntity = new HttpEntity<>(payload, headers);

        try {
            ResponseEntity<Boolean> response = restTemplate.exchange(hirexUrl + Constants.SAVE_MESSAGE_URI, HttpMethod.POST, requestEntity, Boolean.class);
            if (!response.getStatusCode().is2xxSuccessful()) {
                throw new ChatServerDownException(Constants.CHAT_SERVER_DOWN_ERROR);
            }
        } catch (Exception e) {
            throw new ChatServerDownException(Constants.CHAT_SERVER_DOWN_ERROR);
        }
    }

    private String getJwtToken(String jsonPayload) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        ChatPayload chatPayload = mapper.readValue(jsonPayload, ChatPayload.class);
        return chatPayload.getJwtToken();
    }
}
