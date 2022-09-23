package id.worx.worx.service.users;

import id.worx.worx.entity.users.Users;
import id.worx.worx.model.request.auth.LoginRequest;
import id.worx.worx.model.request.auth.TokenRefreshRequest;
import id.worx.worx.model.request.users.UserRequest;
import id.worx.worx.model.response.auth.JwtResponse;
import id.worx.worx.model.response.auth.TokenRefreshResponse;
import id.worx.worx.model.response.users.UserResponse;
import id.worx.worx.service.BaseService;

public interface UsersService {

    UserResponse createUser(UserRequest userRequest);
    JwtResponse login(LoginRequest loginRequest);

    TokenRefreshResponse refreshAccessToken(TokenRefreshRequest tokenRefreshRequest);

    void logout(TokenRefreshRequest tokenRefreshRequest);
}
