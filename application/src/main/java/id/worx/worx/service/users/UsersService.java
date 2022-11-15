package id.worx.worx.service.users;

import java.io.IOException;
import java.util.Optional;

import javax.servlet.http.HttpServletResponse;

import id.worx.worx.common.model.request.EmailRequestDTO;
import id.worx.worx.common.model.request.auth.ChangePasswordRequest;
import id.worx.worx.common.model.request.auth.ChangePasswordToken;
import id.worx.worx.common.model.request.auth.TokenRefreshRequest;
import id.worx.worx.common.model.request.users.UserRequest;
import id.worx.worx.common.model.response.auth.JwtResponse;
import id.worx.worx.common.model.response.users.UserDetailsResponse;
import id.worx.worx.common.model.response.users.UserResponse;
import id.worx.worx.entity.users.Users;

public interface UsersService {

    Users createUser(UserRequest userRequest);

    void sendMailConfirmation(EmailRequestDTO emailRequestDTO);

    String changePassword(ChangePasswordRequest updatePasswordRequest);

    String resetPassword(String email);

    String createRefreshToken(String email);
    void verifyPasswordResetToken(ChangePasswordToken changePasswordToken);

    void verifyAccount(String code, HttpServletResponse httpServletResponse) throws IOException;

    void logout(TokenRefreshRequest request);

    JwtResponse refreshToken(TokenRefreshRequest tokenRefreshRequest);

    UserResponse toDTO(Users users);
    UserDetailsResponse getByEmail(String email);

    Users findByEmail(String email);

    Optional<Users> findByOrganizationCode(String organizationCode);

    void deleteEmailToken();
    void deleteRefreshToken();

}
