package id.worx.worx.service;

import id.worx.worx.entity.users.Users;
import org.springframework.security.core.Authentication;

public interface AuthenticationContext {

    Authentication getAuthentication();
    String getEmail();
    Users getUsers();
}
