package id.worx.worx.service;

import java.util.Optional;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import id.worx.worx.config.security.WorxUserPrincipal;
import id.worx.worx.entity.users.Users;
import id.worx.worx.exception.WorxErrorCode;
import id.worx.worx.exception.WorxException;
import id.worx.worx.repository.UsersRepository;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class AuthenticationContextImpl implements AuthenticationContext {

    private final UsersRepository usersRepository;

    @Override
    public Authentication getAuthentication() {
        return SecurityContextHolder.getContext().getAuthentication();
    }

    @Override
    public String getEmail() {
        String email = "";
        Authentication authentication = this.getAuthentication();
        if (authentication instanceof UsernamePasswordAuthenticationToken) {
            UsernamePasswordAuthenticationToken authenticationToken =
                    (UsernamePasswordAuthenticationToken) authentication;
            WorxUserPrincipal principal = (WorxUserPrincipal) authenticationToken.getPrincipal();
            email = principal.getUsername();
        }
        return email;
    }

    @Override
    public Users getUsers() {
        String email = this.getEmail();
        Optional<Users> getUser = usersRepository.findByEmail(email);
        if (getUser.isEmpty()) {
            throw new WorxException(WorxErrorCode.EMAIL_NOT_FOUND);
        }
        return getUser.get();
    }
}
