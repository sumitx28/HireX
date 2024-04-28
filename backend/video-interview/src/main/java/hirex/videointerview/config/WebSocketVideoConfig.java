// @author Raj Patel

package hirex.videointerview.config;

import hirex.videointerview.service.VideoChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

import static hirex.videointerview.utils.Constants.ENDPOINT;

@Configuration
@EnableWebSocket
public class WebSocketVideoConfig implements WebSocketConfigurer {

    @Autowired
    private VideoChatService videoChatService;

    // Register /video-room/:roomId as websocket handler
    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(videoChatService, ENDPOINT).setAllowedOrigins("*");
    }
}
