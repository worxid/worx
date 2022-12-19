package id.worx.worx.exception;

import java.util.Date;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.ServletWebRequest;
import org.springframework.web.context.request.WebRequest;

import id.worx.worx.common.exception.BaseErrorDetail;
import id.worx.worx.common.exception.ErrorDetail;

@RestControllerAdvice
public class ControllerAdvisor {

    @ExceptionHandler(WorxException.class)
    public ResponseEntity<BaseErrorResponse> handleWorxException(WorxException ex, WebRequest request) {
        ErrorMessage errorMessage = ErrorMessage.builder()
                .timestamp(new Date())
                .code(ex.getHttpStatusValue())
                .error(ex.getErrorCode())
                .path(((ServletWebRequest) request).getRequest().getRequestURI())
                .details(ex.getDetails())
                .build();
        BaseErrorResponse response = BaseErrorResponse.builder()
                .success(false)
                .error(errorMessage)
                .build();
        return ResponseEntity
                .status(HttpStatus.valueOf(ex.getHttpStatusValue()))
                .body(response);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Object> handleAll(Exception ex, WebRequest request) {
        ErrorDetail errorDetail = new BaseErrorDetail(WorxErrorCode.INTERNAL_SERVER_ERROR.getReasonPhrase(),
                ex.getLocalizedMessage());
        ErrorMessage errorMessage = ErrorMessage.builder()
                .timestamp(new Date())
                .code(HttpStatus.INTERNAL_SERVER_ERROR.value())
                .error(WorxErrorCode.INTERNAL_SERVER_ERROR)
                .path(((ServletWebRequest) request).getRequest().getRequestURI())
                .details(List.of(errorDetail))
                .build();
        BaseErrorResponse response = BaseErrorResponse.builder()
                .success(false)
                .error(errorMessage)
                .build();
        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(response);
    }
}
