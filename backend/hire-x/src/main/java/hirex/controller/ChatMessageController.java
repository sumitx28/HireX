// @author Raj Patel

package hirex.controller;

import hirex.model.ChatMessage;
import hirex.service.ChatMessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("${cross.origin.allowed-origins}")
public class ChatMessageController {

    @Autowired
    private ChatMessageService chatMessageService;

    // Controller to save chat messages
    @PostMapping("/save-message/")
    public ResponseEntity<Boolean> validatePasscode(@RequestBody ChatMessage chatMessage) {
        chatMessageService.persistMessage(chatMessage);
        return ResponseEntity.ok(true);
    }

    // Get all chat saved messages
    @GetMapping("/messages/{roomId}")
    public ResponseEntity<List<ChatMessage>> getMessages(@PathVariable String roomId) {
        List<ChatMessage> messages = chatMessageService.getMessages(roomId);
        return ResponseEntity.ok(messages);
    }
}
