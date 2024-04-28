package hirex.controller;

import hirex.util.Constants;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("${cross.origin.allowed-origins}")
public class StatusCheckController {
	@GetMapping("/status")
	public ResponseEntity<String> checkStatus() {
		return new ResponseEntity<String>("ok", HttpStatus.OK);
	}
}