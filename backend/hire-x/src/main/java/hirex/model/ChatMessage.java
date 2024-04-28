// @author Raj Patel

package hirex.model;

import lombok.Data;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

@Document
@Data
@ToString
public class ChatMessage {

    @Id
    private String id;

    private String roomId;

    private String senderId;

    private String senderName;

    private String content;

    private Instant sentAt;
}
