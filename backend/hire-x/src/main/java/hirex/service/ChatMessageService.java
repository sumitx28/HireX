// @author Raj Patel

package hirex.service;

import hirex.model.ChatMessage;

import java.util.List;

public interface ChatMessageService {

    void persistMessage(ChatMessage chatMessage);

    List<ChatMessage> getMessages(String roomId);
}
