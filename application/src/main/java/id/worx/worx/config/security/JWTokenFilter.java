package id.worx.worx.config.security;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.ObjectUtils;
import org.springframework.web.filter.OncePerRequestFilter;
import id.worx.worx.exception.WorxErrorResponseHandler;
import id.worx.worx.util.JwtUtils;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class JWTokenFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtils jwtUtils;

    private final WorxUserDetailsService userDetailsService;
    private final WorxErrorResponseHandler errorResponseHandler;


    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
            FilterChain filterChain)
            throws ServletException, IOException {

        if (!hasAuthorizationHeader(request)) {
            filterChain.doFilter(request, response);
            return;
        }

        String accessToken = getAccessToken(request);

        if (!jwtUtils.validateAccessToken(accessToken)) {
            filterChain.doFilter(request, response);
            return;
        }

        setAuthenticationContext(accessToken, request);

        filterChain.doFilter(request, response);

    }

    private void setAuthenticationContext(String accessToken, HttpServletRequest request) {
        UserDetails userDetails = getUserDetails(accessToken);

        UsernamePasswordAuthenticationToken authentication =
                new UsernamePasswordAuthenticationToken(userDetails, null,
                        null);

        authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

        SecurityContextHolder.getContext().setAuthentication(authentication);
    }

    private UserDetails getUserDetails(String accessToken) {
        String subject = jwtUtils.getUsername(accessToken);
        return userDetailsService.loadUserByUsername(subject);
    }

    private boolean hasAuthorizationHeader(HttpServletRequest request) {
        String header = request.getHeader(HttpHeaders.AUTHORIZATION);
        return !(ObjectUtils.isEmpty(header) || !header.startsWith("Bearer"));
    }

    private String getAccessToken(HttpServletRequest request) {
        String header = request.getHeader(HttpHeaders.AUTHORIZATION);
        return header.split(" ")[1].trim();
    }
}
