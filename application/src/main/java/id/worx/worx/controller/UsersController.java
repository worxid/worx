package id.worx.worx.controller;

import id.worx.worx.entity.users.Users;
import id.worx.worx.exception.TokenException;
import id.worx.worx.model.request.auth.ChangePasswordRequest;
import id.worx.worx.model.request.auth.LoginRequest;
import id.worx.worx.model.request.auth.ResetPasswordRequest;
import id.worx.worx.model.request.auth.TokenRefreshRequest;
import id.worx.worx.model.request.users.UserRequest;
import id.worx.worx.model.response.auth.JwtResponse;
import id.worx.worx.model.response.auth.TokenRefreshResponse;
import id.worx.worx.model.response.users.UserResponse;
import id.worx.worx.service.users.UsersService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/web/users")
@AllArgsConstructor
public class UsersController {

    private final UsersService usersService;

    @CrossOrigin
    @PostMapping("/register")
    public ResponseEntity<UserResponse> createUser(UserRequest userRequest){
        return ResponseEntity.status(HttpStatus.CREATED).body(usersService.createUser(userRequest));
    }
    @CrossOrigin
    @PostMapping("/login")
    public JwtResponse login(@RequestBody LoginRequest loginRequest) {
        return usersService.login(loginRequest);
    }

    @PostMapping("/refresh-token")
    public ResponseEntity<TokenRefreshResponse> refreshtoken(@Valid @RequestBody TokenRefreshRequest request) {
        return ResponseEntity.ok(usersService.refreshAccessToken(request));
    }
//    @CrossOrigin
//    @PostMapping("/reset-password")
//    public ResponseEntity<?> resetPassword(@Valid @RequestBody ResetPasswordRequest resetPasswordRequest)
//        throws Exception {
//        usersService.resetPassword(resetPasswordRequest.getEmail());
//        return ResponseEntity.status(HttpStatus.OK).body("Reset Password Request Success");
//    }
//    @CrossOrigin
//    @GetMapping("/reset-password/verify/{token}")
//    public ResponseEntity<String> verifyPasswordResetToken(@PathVariable String token) throws Exception {
//        try {
//            usersService.verifyPasswordResetToken(token);
//        } catch (TokenException e) {
//            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Token Invalid");
//        }
//        return ResponseEntity.status(HttpStatus.OK).body("Token Valid");
//    }
//
//    @CrossOrigin
//    @PostMapping("/reset-password/update")
//    public ResponseEntity<String> changePassword(@Valid @RequestBody ChangePasswordRequest updatePasswordRequest) {
//        usersService.updatePassword(updatePasswordRequest);
//        return ResponseEntity.status(HttpStatus.OK).body("Update Password Success");
//    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(@Valid @RequestBody TokenRefreshRequest request) {
        usersService.logout(request);
        return ResponseEntity.status(HttpStatus.OK).body("Successfully Deleted Refresh Token");
    }


}
