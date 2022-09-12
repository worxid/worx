package id.worx.worx.controller;

import id.worx.worx.entity.users.Users;
import id.worx.worx.model.request.auth.LoginRequest;
import id.worx.worx.model.request.users.UserRequest;
import id.worx.worx.model.response.auth.JwtResponse;
import id.worx.worx.model.response.users.UserResponse;
import id.worx.worx.service.users.UsersService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
}
