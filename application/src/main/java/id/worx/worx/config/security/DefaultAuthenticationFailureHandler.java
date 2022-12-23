package id.worx.worx.config.security;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.stereotype.Component;
import id.worx.worx.exception.WorxErrorResponseHandler;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Component
public class DefaultAuthenticationFailureHandler implements AuthenticationFailureHandler {

    private final WorxErrorResponseHandler errorResponseHandler;

    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response,
            AuthenticationException exception) throws IOException, ServletException {
        errorResponseHandler.handle(request, response, exception);
    }

}
