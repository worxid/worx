package id.worx.worx.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.ServletWebRequest;
import org.springframework.web.context.request.WebRequest;

import java.util.Date;

@RestControllerAdvice
public class ControllerAdvisor {

    @ExceptionHandler(WorxException.class)
    public ResponseEntity<ErrorMessage> handleWorxException(WorxException ex, WebRequest request) {
        ErrorMessage errorMessage = ErrorMessage.builder()
                .timestamp(new Date())
                .status(ex.getStatusCode())
                .error(HttpStatus.valueOf(ex.getStatusCode()).getReasonPhrase())
                .message(ex.getMessage())
                .path(((ServletWebRequest) request).getRequest().getRequestURI())
                .build();
        return ResponseEntity
                .status(HttpStatus.valueOf(ex.getStatusCode()))
                .body(errorMessage);
    }
}
