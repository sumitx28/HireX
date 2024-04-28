// @author Raj Patel

package hirex.service;

import hirex.model.ChatMessage;
import hirex.repository.ChatMessageRepository;
import hirex.util.CommonUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChatMessageServiceImpl implements ChatMessageService {

    @Autowired
    private ChatMessageRepository chatMessageRepository;

    // Persist chat message
    @Override
    public void persistMessage(ChatMessage chatMessage) {
        chatMessageRepository.save(chatMessage);
    }

    // Get all chat messages based on roomId
    @Override
    public List<ChatMessage> getMessages(String roomId) {
        return chatMessageRepository.findAllByRoomIdOrderBySentAtAsc(roomId);
    }
}
