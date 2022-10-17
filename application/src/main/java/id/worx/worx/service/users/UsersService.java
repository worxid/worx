package id.worx.worx.service.users;

import id.worx.worx.common.model.request.auth.*;
import id.worx.worx.common.model.request.users.UserRequest;
import id.worx.worx.common.model.response.auth.JwtResponse;
import id.worx.worx.common.model.response.users.UserResponse;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public interface UsersService {

    UserResponse createUser(UserRequest userRequest, HttpServletRequest httpServletRequest);


    String changePassword(ChangePasswordRequest updatePasswordRequest);

    String resetPassword(String email);

    String createRefreshToken(String email);
    void verifyPasswordResetToken(ChangePasswordToken changePasswordToken);

    void verifyAccount(String code, HttpServletResponse httpServletResponse) throws IOException;

    void logout(TokenRefreshRequest request);

    JwtResponse refreshToken(TokenRefreshRequest tokenRefreshRequest);

}
