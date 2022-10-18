package id.worx.worx.service.authContext;

import id.worx.worx.entity.users.Users;
import id.worx.worx.service.users.UsersService;
import id.worx.worx.util.JWTValue;
import id.worx.worx.util.JWTokenFilter;
import id.worx.worx.util.JwtUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;

@Component
@RequiredArgsConstructor
public class AuthenticationContextImpl implements AuthenticationContext {

    @Override
    public Authentication getAuthentication() {
        return SecurityContextHolder.getContext().getAuthentication();
    }

    @Autowired
    private UsersService usersService;

    @Autowired
    private JWTokenFilter jwTokenFilter;

    @Autowired
    private JwtUtils jwtUtils;

    @Override
    public String getEmail() {
        String email = "";
        RequestAttributes attributes = RequestContextHolder.getRequestAttributes();
        if(attributes!=null){
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
        return usersService.findByEmail(email);
    }
}
