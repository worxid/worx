package id.worx.worx.exception;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@RestControllerAdvice
public class WorxErrorResponseHandler extends ResponseEntityExceptionHandler
        implements AccessDeniedHandler {

    private final ObjectMapper mapper;

    @Override
    @ExceptionHandler(AccessDeniedException.class)
    public void handle(HttpServletRequest request, HttpServletResponse response,
            AccessDeniedException accessDeniedException) throws IOException, ServletException {
        log.info("Processing exception {}", accessDeniedException.getMessage(), accessDeniedException);

        if (!response.isCommitted()) {
            response.setContentType(MediaType.APPLICATION_JSON_VALUE);
            response.setStatus(HttpStatus.FORBIDDEN.value());
            mapper.writeValue(response.getWriter(),
                    WorxErrorResponse.of(WorxErrorCode.PERMISSION_DENIED, request));
        }

    }

    @ExceptionHandler(Exception.class)
    public void handle(HttpServletRequest request, HttpServletResponse response,
            Exception exception) {
        log.trace("Processing exception {}", exception.getMessage(), exception);
        if (!response.isCommitted()) {

            response.setContentType(MediaType.APPLICATION_JSON_VALUE);
            try {
                if (exception instanceof WorxException) {
                    WorxException worxException = (WorxException) exception;
                    handleWorxException(request, response, worxException);
                } else if (exception instanceof AccessDeniedException) {
                    handleAccessDeniedException(request, response);
                } else if (exception instanceof AuthenticationException) {
                    AuthenticationException authException = (AuthenticationException) exception;
                    handleAuthenticationException(authException, request, response);
                } else {
                    response.setStatus(HttpStatus.INTERNAL_SERVER_ERROR.value());
                    mapper.writeValue(response.getWriter(),
                            WorxErrorResponse.of(WorxErrorCode.INTERNAL_SERVER_ERROR, request));
                }
            } catch (IOException e) {
                log.error("Failed to handle Exception", e);
            }
        }

    }

    @Override
    protected ResponseEntity<Object> handleExceptionInternal(Exception ex, Object body,
            HttpHeaders headers, HttpStatus status, WebRequest request) {
        // TODO Auto-generated method stub
        log.info("Processing handleExceptionInternal {}", ex.getMessage(), ex);
        return super.handleExceptionInternal(ex, body, headers, status, request);
    }


    private void handleWorxException(HttpServletRequest request, HttpServletResponse response,
            WorxException ex) throws IOException {
        response.setStatus(ex.getHttpStatusValue());
        mapper.writeValue(response.getWriter(), WorxErrorResponse.of(ex, request));
    }

    private void handleAccessDeniedException(HttpServletRequest request,
            HttpServletResponse response) throws IOException {
        response.setStatus(HttpStatus.FORBIDDEN.value());
        mapper.writeValue(response.getWriter(),
                WorxErrorResponse.of(WorxErrorCode.PERMISSION_DENIED, request));

    }

    private void handleAuthenticationException(AuthenticationException authenticationException,
            HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setStatus(HttpStatus.UNAUTHORIZED.value());
        if (authenticationException instanceof BadCredentialsException
                || authenticationException instanceof UsernameNotFoundException) {
            mapper.writeValue(response.getWriter(),
                    WorxErrorResponse.of(WorxErrorCode.INVALID_USERNAME_PASSWORD, request));
        } else {
            mapper.writeValue(response.getWriter(),
                    WorxErrorResponse.of(WorxErrorCode.AUTHENTICATION_FAILURE, request));
        }
    }

}
