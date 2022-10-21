package id.worx.worx.config;

import java.util.Optional;

import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import id.worx.worx.entity.users.Users;
import id.worx.worx.repository.UsersRepository;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class WorxAuthenticationProvider implements AuthenticationProvider {

    private final UsersRepository usersRepository;

    @Override
    public Authentication authenticate(Authentication authentication)
            throws AuthenticationException {

        String name = authentication.getName();

        Optional<Users> userOptional = usersRepository.findByEmail(name);

        if (userOptional.isEmpty()) {
            throw new UsernameNotFoundException("User " + name + " not found");
        }

        // UserDetails

        return authentication;
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return authentication.equals(UsernamePasswordAuthenticationToken.class);
    }
}
