package id.worx.worx.config.security;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;
import javax.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.security.web.util.matcher.OrRequestMatcher;
import org.springframework.security.web.util.matcher.RequestMatcher;
import org.springframework.web.cors.CorsConfiguration;
import id.worx.worx.exception.WorxErrorResponseHandler;
import id.worx.worx.util.JwtUtils;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@EnableWebSecurity
public class SecurityConfiguration {

    protected static final String[] NON_TOKEN_BASED_AUTH_ENTRY_POINTS =
            new String[] {"/resources/**",
                    "/v3/api-docs/**",
                    "/swagger-ui.html",
                    "/swagger-ui/**",
                    "/guest/**"};
    public static final String TOKEN_BASED = "";

    private final WorxUserDetailsService userDetailsService;
    private final JwtUtils jwtUtils;
    private final JWTokenFilter jwTokenFilter;
    private final WorxErrorResponseHandler errorResponseHandler;

    private final AuthenticationFailureHandler failureHandler;

    @Lazy
    @Autowired
    private AuthenticationManager authenticationManager;


    protected JwtTokenAuthenticationProcessingFilter buildJwtTokenAuthenticationProcessingFilter() {
        List<String> pathsToSkip =
                new ArrayList<>(Arrays.asList(NON_TOKEN_BASED_AUTH_ENTRY_POINTS));
        pathsToSkip.addAll(Arrays.asList("/api/users/register",
                "/api/users/login",
                "/api/users/reset-password",
                "/api/users/refresh-token",
                "/api/users/reset-password/verify",
                "/api/users/register/account-confirmation",
                "/api/users/email-verify",
                "/form/template/read",
                "/form/submit",
                "/media/presigned-url"));

        SkipPathRequestMatcher matchers = new SkipPathRequestMatcher(pathsToSkip);
        JwtTokenAuthenticationProcessingFilter filter = new JwtTokenAuthenticationProcessingFilter(
                failureHandler, jwtUtils, userDetailsService, matchers);
        filter.setAuthenticationManager(this.authenticationManager);
        return filter;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.cors()
                .configurationSource(request -> {
                    // TODO Set Cors Configuration from ENV
                    CorsConfiguration corsConfiguration = new CorsConfiguration();
                    corsConfiguration.setAllowedOrigins(Collections.singletonList("*"));
                    corsConfiguration.setAllowedMethods(Collections.singletonList("*"));
                    corsConfiguration.setAllowedHeaders(Collections.singletonList("*"));
                    corsConfiguration.setExposedHeaders(Collections.singletonList("*"));
                    corsConfiguration.setMaxAge(3600L);
                    return corsConfiguration;
                })
                .and()
                .csrf().disable()
                .exceptionHandling()
                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .authorizeRequests()
                .antMatchers("/resources/**",
                        "/v3/api-docs/**",
                        "/swagger-ui.html",
                        "/swagger-ui/**")
                .permitAll()
                .antMatchers(
                        "/api/users/register",
                        "/api/users/login",
                        "/api/users/reset-password",
                        "/api/users/refresh-token",
                        "/api/users/reset-password/verify",
                        "/api/users/register/account-confirmation",
                        "/api/users/email-verify",
                        "/form/template/read",
                        "/form/submit",
                        "/media/presigned-url")
                .permitAll()
                .antMatchers("/guest/**").permitAll()
                .antMatchers("/mobile/**").permitAll()
                .anyRequest()
                .authenticated()
                .and()
                .exceptionHandling().accessDeniedHandler(errorResponseHandler)
                .and()
                .addFilterBefore(buildJwtTokenAuthenticationProcessingFilter(),
                        UsernamePasswordAuthenticationFilter.class);

        // http.exceptionHandling().authenticationEntryPoint(
        // ((request, response, authException) ->
        // response.sendError(HttpServletResponse.SC_UNAUTHORIZED,
        // "this API requeire access token")));

        // http.addFilterBefore(jwTokenFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }

    @Bean
    public WebSecurityCustomizer webSecurityCustomizer() {
        return web -> web.ignoring()
                .antMatchers(
                        "/logo.svg",
                        "/worx.svg",
                        "/worx.png",
                        "/dot.png",
                        "/fb.png",
                        "/linkedin.png",
                        "/mail.png",
                        "/web.png");
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authManager(HttpSecurity http,
            BCryptPasswordEncoder bCryptPasswordEncoder,
            UserDetailsService userDetailsService)
            throws Exception {
        return http.getSharedObject(AuthenticationManagerBuilder.class)
                .userDetailsService(userDetailsService)
                .passwordEncoder(bCryptPasswordEncoder)
                .and()
                .build();
    }

}
