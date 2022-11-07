package id.worx.worx.web.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

import id.worx.worx.common.model.response.BaseResponse;
import id.worx.worx.common.model.request.EmailRequestDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import id.worx.worx.common.exception.TokenException;
import id.worx.worx.common.model.request.auth.ChangePasswordRequest;
import id.worx.worx.common.model.request.auth.ChangePasswordToken;
import id.worx.worx.common.model.request.auth.LoginRequest;
import id.worx.worx.common.model.request.auth.ResetPasswordRequest;
import id.worx.worx.common.model.request.auth.TokenRefreshRequest;
import id.worx.worx.common.model.request.users.UserRequest;
import id.worx.worx.common.model.response.BaseValueResponse;
import id.worx.worx.common.model.response.auth.JwtResponse;
import id.worx.worx.common.model.response.users.UserDetailsResponse;
import id.worx.worx.common.model.response.users.UserResponse;
import id.worx.worx.config.security.WorxUserPrincipal;
import id.worx.worx.entity.users.Users;
import id.worx.worx.service.AuthenticationContext;
import id.worx.worx.service.users.UsersService;
import id.worx.worx.util.JwtUtils;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/users")
@AllArgsConstructor
public class UsersController {

    private final UsersService usersService;

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    JwtUtils jwtUtils;

    @Autowired
    AuthenticationContext authenticationContext;

    @PostMapping("/register")
    public ResponseEntity<BaseValueResponse<UserResponse>> createUser(@RequestBody @Valid UserRequest userRequest, HttpServletRequest httpServletRequest){
        Users users = usersService.createUser(userRequest,httpServletRequest);
        UserResponse dto = usersService.toDTO(users);

        BaseValueResponse<UserResponse> response = BaseValueResponse.<UserResponse>builder()
            .value(dto)
            .build();

        return ResponseEntity.status(HttpStatus.OK)
            .body(response);
    }

    @PostMapping("/login")
    public ResponseEntity<JwtResponse> login(@Valid @RequestBody LoginRequest loginRequest) {

        try{

            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword())
            );

            WorxUserPrincipal principal = (WorxUserPrincipal) authentication.getPrincipal();
            Users users = principal.getUser();

            String accessToken = jwtUtils.generateJwt(users);

            Map<String, Object> data = new HashMap<>();
            data.put("accessToken", accessToken);
            data.put("refreshToken", createRefreshToken(loginRequest.getEmail()));

            JwtResponse response = new JwtResponse();
            response.setData(data);
            response.setStatus(200);

            return ResponseEntity.ok(response);
        }catch (BadCredentialsException ex){

            Map<String, Object> data = new HashMap<>();
            data.put("message", "Unauthorized");

            JwtResponse response = new JwtResponse();
            response.setStatus(401);
            response.setData(data);

            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(response);
        }
    }

    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@Valid @RequestBody ResetPasswordRequest resetPasswordRequest) {
        String message = usersService.resetPassword(resetPasswordRequest.getEmail());
        return ResponseEntity.status(HttpStatus.OK).body(message);
    }
    @PostMapping("/refresh-token")
    public ResponseEntity<JwtResponse> refreshToken(@Valid @RequestBody TokenRefreshRequest tokenRefreshRequest) {

        JwtResponse response = usersService.refreshToken(tokenRefreshRequest);


        return ResponseEntity.ok(response);
    }
    @CrossOrigin
    @PostMapping("/reset-password/verify")
    public ResponseEntity<String> verifyPasswordResetToken(@Valid @RequestBody ChangePasswordToken changePasswordToken) {
        try {
            usersService.verifyPasswordResetToken(changePasswordToken);
        } catch (TokenException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Token Invalid");
        }
        return ResponseEntity.status(HttpStatus.OK).body("Password changed");
    }


    @PostMapping("/change-password")
    public ResponseEntity<String> changePassword(@Valid @RequestBody ChangePasswordRequest updatePasswordRequest) {
        usersService.changePassword(updatePasswordRequest);
        return ResponseEntity.status(HttpStatus.OK).body("Update Password Success");
    }

    @GetMapping("/register/account-confirmation")
    public void verifyAccount(@RequestParam String code, HttpServletResponse httpServletResponse) throws IOException {

        usersService.verifyAccount(code,httpServletResponse);
    }


    public String createRefreshToken(String email){
        return usersService.createRefreshToken(email);
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(@Valid @RequestBody TokenRefreshRequest request) {
        usersService.logout(request);
        return ResponseEntity.status(HttpStatus.OK).body("Successfully Deleted Refresh Token");
    }
    @PostMapping("/email-verify")
    public ResponseEntity<BaseResponse> sendMailConfirmation(@Valid @RequestBody EmailRequestDTO email) {

        usersService.sendMailConfirmation(email);

        return ResponseEntity.status(HttpStatus.OK)
            .body(BaseResponse.builder().build());
    }
    @GetMapping("/user-details")
    public ResponseEntity<BaseValueResponse<UserDetailsResponse>> getInfoDevice() {

        String email = authenticationContext.getEmail();

        UserDetailsResponse users = usersService.getByEmail(email);

        BaseValueResponse<UserDetailsResponse> response = BaseValueResponse.<UserDetailsResponse>builder()
            .value(users)
            .build();

        return ResponseEntity.status(HttpStatus.OK)
            .body(response);
    }
}
