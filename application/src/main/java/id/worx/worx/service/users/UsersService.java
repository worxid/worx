package id.worx.worx.service.users;

import id.worx.worx.common.model.dto.DeviceDTO;
import id.worx.worx.common.model.request.auth.*;
import id.worx.worx.common.model.request.users.UserRequest;
import id.worx.worx.common.model.response.auth.JwtResponse;
import id.worx.worx.common.model.response.auth.TokenRefreshResponse;
import id.worx.worx.common.model.response.users.UserResponse;
import id.worx.worx.entity.devices.Device;
import id.worx.worx.entity.users.Users;
import id.worx.worx.service.BaseService;
import org.springframework.security.core.userdetails.User;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public interface UsersService {

    Users createUser(UserRequest userRequest, HttpServletRequest httpServletRequest);


    String changePassword(ChangePasswordRequest updatePasswordRequest);

    String resetPassword(String email);

    void verifyPasswordResetToken(ChangePasswordToken changePasswordToken);

    void verifyAccount(String code, HttpServletResponse httpServletResponse) throws IOException;

    UserResponse toDTO(Users users);
}
