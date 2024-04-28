// @author Roshni Joshi

package hirex.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
public class ExceptionHandler extends ResponseEntityExceptionHandler {

	@org.springframework.web.bind.annotation.ExceptionHandler(Exception.class)
	public ResponseEntity<Object> handleExceptions(Exception exception) {
		return new ResponseEntity<Object>("Error occured : " + exception.getMessage(),
				HttpStatus.INTERNAL_SERVER_ERROR);
	}
}
