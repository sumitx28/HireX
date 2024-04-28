// @author Raj Patel

package hirex.videointerview.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import hirex.videointerview.exceptions.ChatServerDownException;
import hirex.videointerview.requests.CloseRequest;
import hirex.videointerview.utils.Constants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CopyOnWriteArrayList;

import static hirex.videointerview.utils.Constants.CLOSE_REQUEST;

@Service
public class VideoChatService extends TextWebSocketHandler {

    @Autowired
    private PersistMessageService persistMessageService;

    Map<String, CopyOnWriteArrayList<WebSocketSession>> meetingRooms = new HashMap<>();

    // Callback to add interview room in a list of rooms.
    @Override
    public void afterConnectionEstablished(WebSocketSession session) {
        String meetingId = session.getUri().getPath();
        if (!meetingRooms.containsKey(meetingId)) {
            meetingRooms.put(meetingId, new CopyOnWriteArrayList<>());
        }
        meetingRooms.get(meetingId).add(session);
    }

    // Send participant left message and close socket connection.
    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws IOException {
        String meetingId = session.getUri().getPath();
        List<WebSocketSession> sessions = meetingRooms.get(meetingId) == null ? new CopyOnWriteArrayList<>() : meetingRooms.get(meetingId);
        for (WebSocketSession webSocketSession : sessions) {
            if (!session.equals(webSocketSession) && webSocketSession.isOpen()) {
                TextMessage message = new TextMessage(new ObjectMapper().writeValueAsString(new CloseRequest(CLOSE_REQUEST, true)));
                webSocketSession.sendMessage(message);
            }
        }
        if (meetingRooms.containsKey(meetingId)) {
            meetingRooms.get(meetingId).remove(session);
        }
    }

    // Handle websocket SDP and ICE candidate exchange and chat messages.
    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage message) throws IOException {
        Boolean isChatMessage = message.getPayload().contains(Constants.SENT_AT);

        if (isChatMessage) {
            handleChatMessage(session, message);
            return;
        }

        String meetingId = session.getUri().getPath();
        List<WebSocketSession> sessions = meetingRooms.get(meetingId) == null ? new CopyOnWriteArrayList<>() : meetingRooms.get(meetingId);
        for (WebSocketSession webSocketSession : sessions) {
            if (!session.equals(webSocketSession) && session.isOpen()) {
                try {
                    webSocketSession.sendMessage(message);
                } catch (IOException e) {
                    meetingRooms = new HashMap<>();
                    throw new RuntimeException(e);
                }
            }
        }
    }

    // Store chat message in HireX
    private void handleChatMessage(WebSocketSession session, TextMessage message) throws IOException {
        try {
            persistMessageService.persistMessage(message.getPayload());
        } catch (ChatServerDownException e) {
            session.sendMessage(new TextMessage(e.getMessage()));
            return;
        }

        String meetingId = session.getUri().getPath();
        List<WebSocketSession> sessions = meetingRooms.get(meetingId) == null ? new CopyOnWriteArrayList<>() : meetingRooms.get(meetingId);
        for (WebSocketSession webSocketSession : sessions) {
            webSocketSession.sendMessage(message);
        }
    }
}