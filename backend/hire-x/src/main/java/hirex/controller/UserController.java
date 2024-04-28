package hirex.controller;

import hirex.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("${cross.origin.allowed-origins}")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/firstname/{id}")
    public ResponseEntity<String> getUserName(@PathVariable String id) {
        String firstName = userService.getFirstName(id);
        return ResponseEntity.ok(firstName);
    }
}
