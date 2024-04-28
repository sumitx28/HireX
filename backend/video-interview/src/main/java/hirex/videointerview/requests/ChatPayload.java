// @author Raj Patel

package hirex.videointerview.requests;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.io.Serializable;

@AllArgsConstructor
@NoArgsConstructor
@ToString
@Data
public class ChatPayload implements Serializable {
    private String roomId;

    private String senderId;

    private String senderName;

    private String content;

    private String sentAt;

    private String jwtToken;
}
