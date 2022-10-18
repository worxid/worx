package id.worx.worx.service.authContext;

import id.worx.worx.entity.users.Users;
import org.springframework.security.core.Authentication;

public interface AuthenticationContext {

    Authentication getAuthentication();
    String getEmail();
    Users getUsers();
}
