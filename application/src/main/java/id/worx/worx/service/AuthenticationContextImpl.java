package id.worx.worx.service;

import java.util.Optional;

import javax.servlet.http.HttpServletRequest;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import id.worx.worx.entity.users.Users;
import id.worx.worx.exception.WorxErrorCode;
import id.worx.worx.exception.WorxException;
import id.worx.worx.repository.UsersRepository;
import id.worx.worx.util.JWTValue;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class AuthenticationContextImpl implements AuthenticationContext {

    private UsersRepository usersRepository;

    @Override
    public Authentication getAuthentication() {
        return SecurityContextHolder.getContext().getAuthentication();
    }

    @Override
    public String getEmail() {
        String email = "";
        RequestAttributes attributes = RequestContextHolder.getRequestAttributes();
        if (attributes != null) {
            HttpServletRequest httpServletRequest = ((ServletRequestAttributes) attributes).getRequest();
            String token = httpServletRequest.getHeader("Authorization");
            JWTValue jwtValue = JWTValue.getDecoded(token);
            String[] data = jwtValue.getSub().split(", ");
            return data[1];
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
