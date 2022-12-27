package id.worx.worx.config.security;

import java.io.IOException;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.commons.lang3.StringUtils;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.AuthenticationServiceException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.util.matcher.RequestMatcher;
import id.worx.worx.util.JwtUtils;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class JwtTokenAuthenticationProcessingFilter extends AbstractAuthenticationProcessingFilter {

    public static final String HEADER_PREFIX = "Bearer ";

    private final AuthenticationFailureHandler failureHandler;

    private final JwtUtils jwtUtils;
    private final WorxUserDetailsService userDetailsService;

    @Override
    protected void successfulAuthentication(HttpServletRequest request,
            HttpServletResponse response, FilterChain chain, Authentication authResult)
            throws IOException, ServletException {
        SecurityContext context = SecurityContextHolder.createEmptyContext();
		context.setAuthentication(authResult);
		SecurityContextHolder.setContext(context);
        chain.doFilter(request, response);
    }

    public JwtTokenAuthenticationProcessingFilter(AuthenticationFailureHandler failureHandler,
            JwtUtils jwtUtils, WorxUserDetailsService userDetailsService, RequestMatcher matcher) {
        super(matcher);
        this.jwtUtils = jwtUtils;
        this.userDetailsService = userDetailsService;
        this.failureHandler = failureHandler;
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request,
            HttpServletResponse response)
            throws AuthenticationException, IOException, ServletException {
        String token = this.extract(request);
        String subject = jwtUtils.getUsername(token);
        UserDetails userDetails = userDetailsService.loadUserByUsername(subject);

        return new UsernamePasswordAuthenticationToken(userDetails, null,
                null);
    }

    public String extract(HttpServletRequest request) {
        String header = request.getHeader(HttpHeaders.AUTHORIZATION);
        if (StringUtils.isBlank(header)) {
            throw new AuthenticationServiceException("Authorization header cannot be blank");
        }

        if (header.length() < HEADER_PREFIX.length()) {
            throw new AuthenticationServiceException("Invalid authorization header size");
        }

        return header.substring(HEADER_PREFIX.length(), header.length());
    }

    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request,
            HttpServletResponse response,
            AuthenticationException failed) throws IOException, ServletException {
        SecurityContextHolder.clearContext();
        failureHandler.onAuthenticationFailure(request, response, failed);
    }
}
