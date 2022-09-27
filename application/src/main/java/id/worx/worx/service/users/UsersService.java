package id.worx.worx.service.users;

import id.worx.worx.entity.users.Users;
import id.worx.worx.model.request.auth.*;
import id.worx.worx.model.request.users.UserRequest;
import id.worx.worx.model.response.auth.JwtResponse;
import id.worx.worx.model.response.auth.TokenRefreshResponse;
import id.worx.worx.model.response.users.UserResponse;
import id.worx.worx.service.BaseService;

public interface UsersService {

    UserResponse createUser(UserRequest userRequest);


    String changePassword(ChangePasswordRequest updatePasswordRequest);

    String resetPassword(String email);

    void verifyPasswordResetToken(ChangePasswordToken changePasswordToken);
}
