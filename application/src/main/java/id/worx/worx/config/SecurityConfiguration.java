package id.worx.worx.config;

import id.worx.worx.filter.CustomAuthenticationFilter;
import id.worx.worx.util.JWTokenFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import id.worx.worx.repository.UsersRepository;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.http.HttpServletResponse;

@RequiredArgsConstructor
@EnableWebSecurity
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

    @Autowired
    private UsersRepository usersRepository;

    private final UserDetailsService userDetailsService;

    @Autowired
    JWTokenFilter jwTokenFilter;
//
//    @Bean
//    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
//        http.csrf().disable()
//                .exceptionHandling()
//                .and()
//                .authorizeRequests()
//                .antMatchers("/resources/**",
//                        "/v3/api-docs/**",
//                        "/swagger-ui.html",
//                        "/swagger-ui/**")
//                .permitAll()
//                .antMatchers("/form/**",
//                        "/groups/**")
//                .permitAll()
//                .antMatchers("/mobile/**").permitAll()
//                .anyRequest()
//                .authenticated();
//        return http.build();
//    }

    @Bean
    public WebSecurityCustomizer webSecurityCustomizer() {
        return web -> web.ignoring()
                .antMatchers("/logo.svg");
    }
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable()
            .exceptionHandling()
            .and()
            .authorizeRequests()
            .antMatchers("/resources/**",
                "/v3/api-docs/**",
                "/swagger-ui.html",
                "/swagger-ui/**")
            .permitAll()
            .antMatchers(
                "/groups/**"
                , "/api/users/**"
                ,"/api/form/**"
                )
            .permitAll()
            .antMatchers("/mobile/**").permitAll()
            .anyRequest()
            .authenticated();
        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);

        http.exceptionHandling().authenticationEntryPoint(
            ((request, response, authException) -> {
                response.sendError(HttpServletResponse.SC_UNAUTHORIZED,
                    "this API requeire access token");
            })
        );

        http.addFilterBefore(jwTokenFilter, UsernamePasswordAuthenticationFilter.class);
    }

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception{
        return super.authenticationManagerBean();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(username ->  usersRepository.findByEmail(username)
            .orElseThrow(() -> new UsernameNotFoundException("User "+username+" not found"))

        );
    }


    @Override
    @Bean
    protected AuthenticationManager authenticationManager() throws Exception {
        return super.authenticationManager();
    }
}
