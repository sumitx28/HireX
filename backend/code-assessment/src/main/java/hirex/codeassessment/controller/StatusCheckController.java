package hirex.codeassessment.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
@CrossOrigin("${cross.origin.allowed-origins}")
public class StatusCheckController {

	@GetMapping("/status")
	public ResponseEntity<String> checkStatus() {
		return new ResponseEntity<String>("ok", HttpStatus.OK);
	}
}
