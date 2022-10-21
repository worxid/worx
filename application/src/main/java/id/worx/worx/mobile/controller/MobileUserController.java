package id.worx.worx.mobile.controller;

import id.worx.worx.common.model.request.users.UserRequest;
import id.worx.worx.common.model.response.BaseValueResponse;
import id.worx.worx.common.model.response.users.UserResponse;
import id.worx.worx.entity.users.Users;
import id.worx.worx.service.users.UsersService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

@RestController
@RequestMapping("mobile/users")
@AllArgsConstructor
public class MobileUserController {

    private final UsersService usersService;


    @PostMapping("/create-new-team")
    public ResponseEntity<BaseValueResponse<UserResponse>> createNewTeam(@RequestHeader("device_code") String deviceCode,
                                                                         @RequestBody @Valid UserRequest userRequest, HttpServletRequest httpServletRequest){
        Users users = usersService.createUser(userRequest,httpServletRequest);
        UserResponse dto = usersService.toDTO(users);

        BaseValueResponse<UserResponse> response = BaseValueResponse.<UserResponse>builder()
            .value(dto)
            .build();

        return ResponseEntity.status(HttpStatus.OK)
            .body(response);
    }
}
